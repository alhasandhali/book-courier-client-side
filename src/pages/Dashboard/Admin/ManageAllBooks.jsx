import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Admin page, use secure
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ManageAllBooks = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const {
        data: books = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["all-books"],
        queryFn: async () => {
            const res = await axiosSecure.get("/books");
            return res.data;
        },
        enabled: !loading && !!user && !isAdminLoading && !!isAdmin,
    });

    const handleDeleteBook = async (id) => {
        if (
            !confirm(
                "Are you sure? Deleting this book will also delete all orders associated with it."
            )
        )
            return;

        try {
            await axiosSecure.delete(`/book/${id}`);
            toast.success("Book and associated orders deleted successfully");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to delete book");
        }
    };

    const handleToggleStatus = async (id, currentStatus) => {
        const newStatus = currentStatus === "published" ? "unpublished" : "published";
        try {
            await axiosSecure.patch(`/book/${id}`, { status: newStatus });
            toast.success(`Book ${newStatus} successfully`);
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update book status");
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
                Manage All Books
            </h2>
            <div className="overflow-x-auto bg-bg-card rounded-xl shadow-md border border-card-border">
                <table className="table w-full">
                    <thead className="bg-bg-body text-text-muted uppercase text-xs font-semibold">
                        <tr>
                            <th className="py-4">Book</th>
                            <th className="py-4">Added By</th>
                            <th className="py-4">Stock</th>
                            <th className="py-4">Status</th>
                            <th className="py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr
                                key={book._id}
                                className="border-b border-card-border hover:bg-bg-body"
                            >
                                <td>
                                    <div className="flex items-center gap-3">
                                        <img
                                            src={book.image}
                                            alt={book.title}
                                            className="w-12 h-16 object-cover rounded shadow-sm"
                                        />
                                        <div>
                                            <div className="font-bold text-text-main">
                                                {book.title}
                                            </div>
                                            <div className="text-xs text-text-muted">
                                                {book.author}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td className="text-text-muted text-sm">{book.addedBy}</td>
                                <td>
                                    <span className={`font-bold ${book.stock <= (book.minStockAlert || 5) ? 'text-red-500' : 'text-text-main'}`}>
                                        {book.stock || 0}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${book.status === "published"
                                            ? "bg-green-100 text-green-600"
                                            : "bg-gray-100 text-gray-500"
                                            }`}
                                    >
                                        {book.status}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <button
                                        onClick={() => handleToggleStatus(book._id, book.status)}
                                        className="text-sm font-medium text-accent-gold hover:underline mr-4"
                                    >
                                        {book.status === "published" ? "Unpublish" : "Publish"}
                                    </button>
                                    <button
                                        onClick={() => handleDeleteBook(book._id)}
                                        className="text-sm font-medium text-red-500 hover:text-red-700"
                                    >
                                        <i className="fas fa-trash-alt mr-1"></i> Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {books.length === 0 && (
                    <div className="p-8 text-center text-text-muted">
                        No books found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAllBooks;
