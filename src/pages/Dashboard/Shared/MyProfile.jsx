import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MyProfile = () => {
    const { user, updateUser } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: user?.displayName || "",
            photoURL: user?.photoURL || "",
        },
    });

    const onSubmit = async (data) => {
        try {
            // 1. Update Firebase Profile
            await updateUser(user, data.name, data.photoURL);

            // 2. Update DB (Optional but recommended to keep sync)
            // Assuming endpoint PATCH /user/:email exists or similar
            // For now just updating Firebase is visually sufficient for frontend

            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error) {
            console.error(error);
            toast.error("Failed to update profile.");
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100 max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-serif font-bold text-text-main">
                    My Profile
                </h2>
                <button
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-accent-gold hover:text-accent-gold/80 font-medium transition-colors"
                >
                    {isEditing ? "Cancel" : "Edit Profile"}
                </button>
            </div>

            <div className="flex flex-col items-center mb-8">
                <img
                    src={user?.photoURL || "https://placehold.co/150"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full object-cover border-4 border-accent-gold/20 mb-4"
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
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-main mb-1">
                            Photo URL
                        </label>
                        <input
                            type="url"
                            {...register("photoURL", { required: true })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-gold focus:border-transparent outline-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-accent-gold text-white py-2 rounded-lg font-semibold hover:bg-accent-gold/90 transition-colors"
                    >
                        Save Changes
                    </button>
                </form>
            ) : (
                <div className="space-y-4">
                    {/* Read-only view details if needed, currently header has most info */}
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="p-4 bg-gray-50 rounded-lg">
                            <p className="text-text-muted mb-1">Account Created</p>
                            <p className="font-medium text-text-main">{user?.metadata?.creationTime ? new Date(user.metadata.creationTime).toLocaleDateString() : 'N/A'}</p>
                        </div>
                        <div className="p-4 bg-gray-50 rounded-lg">
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
