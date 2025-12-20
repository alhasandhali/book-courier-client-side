import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import toast from "react-hot-toast";

const Wishlist = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: wishlist = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["wishlist", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleRemoveFromWishlist = async (bookId) => {
        if (!confirm("Remove this book from your wishlist?")) return;

        try {
            await axiosSecure.delete(`/wishlist/${bookId}`);
            toast.success("Removed from wishlist");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to remove from wishlist");
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-3xl font-serif font-bold text-text-main mb-6">
                My Wishlist
            </h2>

            {wishlist.length === 0 ? (
                <div className="text-center py-16 bg-bg-card rounded-xl shadow-sm border border-card-border">
                    <div className="text-6xl mb-4">💝</div>
                    <h3 className="text-xl font-serif font-bold text-text-main mb-2">
                        Your wishlist is empty
                    </h3>
                    <p className="text-text-muted mb-6">
                        Start adding books you love to your wishlist!
                    </p>
                    <Link
                        to="/books"
                        className="inline-block px-6 py-3 bg-accent-gold text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                    >
                        Browse Books
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {wishlist.map((item) => (
                        <div
                            key={item._id}
                            className="bg-bg-card rounded-xl shadow-sm border border-card-border overflow-hidden hover:shadow-md transition-shadow"
                        >
                            <div className="aspect-[3/4] overflow-hidden bg-bg-body">
                                <img
                                    src={item.bookId?.image || item.image || "https://via.placeholder.com/300x400?text=No+Image"}
                                    alt={item.bookId?.title || item.title || "Book"}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="p-4">
                                <h3 className="font-serif font-bold text-text-main mb-1 line-clamp-2">
                                    {item.bookId?.title || item.title || "Untitled"}
                                </h3>
                                <p className="text-sm text-text-muted mb-3">
                                    {item.bookId?.author || item.author || "Unknown Author"}
                                </p>
                                <div className="flex items-center justify-between">
                                    <span className="text-lg font-bold text-accent-gold">
                                        ${item.bookId?.price || item.price || "0.00"}
                                    </span>
                                    <button
                                        onClick={() => handleRemoveFromWishlist(item._id)}
                                        className="text-red-500 hover:text-red-700 transition-colors"
                                        title="Remove from wishlist"
                                    >
                                        <i className="fas fa-trash text-sm"></i>
                                    </button>
                                </div>
                                <Link
                                    to={`/book/${item.bookId?._id || item.bookId}`}
                                    className="block mt-3 w-full text-center px-4 py-2 bg-bg-body text-text-main rounded-lg hover:bg-paper-bg transition-colors text-sm font-medium border border-card-border"
                                >
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Wishlist;
