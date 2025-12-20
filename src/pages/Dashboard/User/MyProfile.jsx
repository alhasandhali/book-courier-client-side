import React from "react";
import useAuth from "../../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const MyProfile = () => {
    const { user, updateUser } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        updateUser(user, data.name, data.photoURL)
            .then(() => {
                toast.success("Profile updated successfully");
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to update profile");
            });
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold text-text-main mb-8 text-center">
                My Profile
            </h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                <div className="bg-accent-gold/10 p-8 flex flex-col items-center justify-center border-b border-gray-100">
                    <div className="relative group">
                        <img
                            src={user?.photoURL || "https://placehold.co/150"}
                            alt="Profile"
                            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    </div>
                    <h3 className="mt-4 text-2xl font-bold text-text-main">
                        {user?.displayName}
                    </h3>
                    <p className="text-text-muted">{user?.email}</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">
                                Display Name
                            </label>
                            <input
                                type="text"
                                defaultValue={user?.displayName}
                                {...register("name", { required: true })}
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                            />
                            {errors.name && (
                                <span className="text-red-500 text-xs mt-1">
                                    Name is required
                                </span>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">
                                Profile Image URL
                            </label>
                            <input
                                type="url"
                                defaultValue={user?.photoURL}
                                {...register("photoURL")}
                                placeholder="https://example.com/image.jpg"
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent-gold focus:ring-1 focus:ring-accent-gold outline-none transition-all"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-text-main mb-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={user?.email || ""}
                                readOnly
                                className="w-full px-4 py-3 rounded-lg border border-gray-200 bg-gray-50 text-text-muted cursor-not-allowed"
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn-primary w-full py-3 text-lg font-medium shadow-lg shadow-accent-gold/20"
                        >
                            Update Profile
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
