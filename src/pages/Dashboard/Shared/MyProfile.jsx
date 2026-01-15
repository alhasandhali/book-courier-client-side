import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MyProfile = () => {
    const { user, updateUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const { register, handleSubmit, watch, reset } = useForm({
        defaultValues: {
            name: user?.displayName || "",
        },
    });

    const photoFile = watch('photo');

    useEffect(() => {
        if (photoFile && photoFile[0]) {
            const reader = new FileReader();
            reader.onload = e => setImagePreview(e.target.result);
            reader.readAsDataURL(photoFile[0]);
        } else {
            setImagePreview(null);
        }
    }, [photoFile]);

    const onSubmit = async (data) => {
        setSubmitting(true);
        try {
            let finalPhotoURL = user?.photoURL || "";

            // 1. Upload Image to ImgBB if a new photo is selected
            if (data.photo && data.photo[0]) {
                const formData = new FormData();
                formData.append('image', data.photo[0]);
                const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_img_hosting}`, formData);
                finalPhotoURL = imgRes.data.data.url;
            }

            // 2. Update Firebase Profile
            await updateUser(user, data.name, finalPhotoURL);

            // 3. Update DB (Keeping user profile in sync on backend)
            try {
                await axiosSecure.patch(`/user/${user.email}`, {
                    name: data.name,
                    image: finalPhotoURL,
                    updatedAt: new Date().toISOString()
                });
            } catch (dbErr) {
                console.warn("DB Sync failed, but Firebase updated:", dbErr);
            }

            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="bg-bg-card p-8 rounded-xl shadow-md border border-card-border max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-text-main">
                    My Profile
                </h2>
                <button
                    onClick={() => {
                        setIsEditing(!isEditing);
                        setImagePreview(null);
                    }}
                    className={`${isEditing ? 'text-red-500 hover:text-red-600' : 'text-accent-gold hover:text-accent-gold/80'} font-medium transition-colors`}
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <div className="flex flex-col items-center mb-8">
                <img
                    src={imagePreview || user?.photoURL || "https://placehold.co/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-accent-gold/20 mb-4 shadow-lg"
                />
                <h3 className="text-xl font-bold text-text-main">
                    {user?.displayName}
                </h3>
                <p className="text-text-muted">{user?.email}</p>
                <div className="mt-2 px-3 py-1 bg-accent-gold/10 text-accent-gold rounded-full text-xs font-semibold uppercase tracking-wider">
                    {/* We could fetch role from DB if needed, but for now just showing 'Member' or dynamic if passed */}
                    Member
                </div>
            </div>

            {isEditing ? (
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Full Name
                        </label>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none bg-bg-body text-text-main"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Profile Picture
                        </label>
                        <div className="relative group">
                            <input
                                type="file"
                                accept="image/*"
                                {...register("photo")}
                                className="w-full px-4 py-2 border border-card-border rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none bg-bg-body text-text-main file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-accent-gold/10 file:text-accent-gold hover:file:bg-accent-gold/20 transition-all"
                            />
                        </div>
                        <p className="text-[10px] text-text-muted mt-1 uppercase tracking-wider font-bold opacity-60">Leave empty to keep current photo</p>
                    </div>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="w-full bg-accent-gold text-white py-3 rounded-lg font-bold hover:bg-accent-gold/90 transition-all shadow-lg shadow-accent-gold/20 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {submitting ? (
                            <>
                                <span className="loading loading-spinner loading-xs"></span>
                                Saving Changes...
                            </>
                        ) : "Save Changes"}
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    {/* Read-only view details if needed, currently header has most info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-bg-body rounded-lg border border-card-border">
                            <p className="text-text-muted mb-1">Account Created</p>
                            <p className="font-medium text-text-main">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-bg-body rounded-lg border border-card-border">
                            <p className="text-text-muted mb-1">Last Login</p>
                            <p className="font-medium text-text-main">{user?.metadata?.lastSignInTime ? new Date(user.metadata.lastSignInTime).toLocaleDateString() : 'N/A'}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyProfile;
