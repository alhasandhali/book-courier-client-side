import React, { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Using secure axios for dashboard
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyBooks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();
    const [selectedBook, setSelectedBook] = useState(null);
    const [newStock, setNewStock] = useState(0);

    const { data: books = [], isLoading } = useQuery({
        queryKey: ["my-books", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            // Fetch all books and filter by the logged-in librarian's email
            const res = await axiosSecure.get(`/books`);
            const allBooks = res.data || [];
            return allBooks.filter((book) => book.addedBy === user.email);
        },
        enabled: !!user?.email,
    });

    const updateStockMutation = useMutation({
        mutationFn: async ({ id, stock }) => {
            const res = await axiosSecure.patch(`/book/stock/${id}`, { stock });
            return res.data;
        },
        onSuccess: () => {
            toast.success("Stock updated successfully!");
            queryClient.invalidateQueries(["my-books", user?.email]);
            document.getElementById("update_stock_modal").close();
            setSelectedBook(null);
        },
        onError: (error) => {
            toast.error(error.response?.data?.error || "Failed to update stock");
        },
    });

    const handleUpdateStockClick = (book) => {
        setSelectedBook(book);
        setNewStock(book.stock || 0);
        document.getElementById("update_stock_modal").showModal();
    };

    const handleUpdateStockSubmit = (e) => {
        e.preventDefault();
        if (!selectedBook) return;
        updateStockMutation.mutate({ id: selectedBook._id, stock: newStock });
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
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-3xl font-serif font-bold text-text-main">My Books</h2>
                <Link to="/dashboard/add-book" className="px-4 py-2 bg-accent-gold text-white rounded-lg font-medium hover:bg-accent-gold/90 transition-colors">
                    <i className="fas fa-plus mr-2"></i>Add New Book
                </Link>
            </div>

            <div className="overflow-x-auto bg-bg-card rounded-xl shadow-md border border-card-border">
                {books.length === 0 ? (
                    <div className="p-12 text-center">
                        <div className="text-6xl mb-4">📚</div>
                        <h3 className="text-xl font-serif font-bold text-text-main mb-2">
                            No Books Yet
                        </h3>
                        <p className="text-text-muted mb-6">
                            You haven't added any books yet. Click the button above to add your first book!
                        </p>
                        <Link
                            to="/dashboard/add-book"
                            className="inline-block px-6 py-3 bg-accent-gold text-white rounded-lg hover:bg-opacity-90 transition-all font-medium"
                        >
                            <i className="fas fa-plus mr-2"></i>Add Your First Book
                        </Link>
                    </div>
                ) : (
                    <table className="table w-full">
                        <thead className="bg-bg-body text-text-muted uppercase text-xs font-semibold">
                            <tr>
                                <th className="py-4">Book</th>
                                <th className="py-4">Author</th>
                                <th className="py-4">Stock</th>
                                <th className="py-4">Rating</th>
                                <th className="py-4">Status</th>
                                <th className="py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id} className="border-b border-card-border hover:bg-bg-body">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                                            <span className="font-bold text-text-main">{book.title}</span>
                                        </div>
                                    </td>
                                    <td className="text-text-muted">{book.author}</td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <span className={`font-bold ${book.stock <= (book.minStockAlert || 5) ? 'text-red-500' : 'text-text-main'}`}>
                                                {book.stock || 0}
                                            </span>
                                            <button
                                                onClick={() => handleUpdateStockClick(book)}
                                                className="p-1 hover:bg-bg-body rounded text-accent-gold transition-colors"
                                                title="Update Stock"
                                            >
                                                <i className="fas fa-edit text-xs"></i>
                                            </button>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="flex items-center justify-center gap-1.5">
                                            <i className="fa-solid fa-star text-orange-400 text-xs"></i>
                                            <span className="font-bold text-text-main text-sm">
                                                {typeof book.rating === 'object' ? book.rating.average.toFixed(1) : (parseFloat(book.rating) || 0).toFixed(1)}
                                            </span>
                                            {typeof book.rating === 'object' && book.rating.count > 0 && (
                                                <span className="text-[10px] text-text-muted">({book.rating.count})</span>
                                            )}
                                        </div>
                                    </td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${book.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <Link to={`/dashboard/update-book/${book._id}`} className="px-3 py-1.5 border border-card-border rounded text-sm hover:bg-bg-body mr-2 transition-colors inline-block text-text-main">
                                            <i className="fas fa-edit text-blue-500"></i> Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* Update Stock Modal */}
            <dialog id="update_stock_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box bg-bg-card border border-card-border">
                    <h3 className="font-bold text-lg text-text-main mb-4">Update Stock for {selectedBook?.title}</h3>
                    <form onSubmit={handleUpdateStockSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text text-text-muted">New Stock Quantity</span>
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={newStock}
                                onChange={(e) => setNewStock(parseInt(e.target.value))}
                                className="input input-bordered w-full bg-bg-body text-text-main"
                                required
                            />
                        </div>
                        <div className="modal-action">
                            <button
                                type="button"
                                className="btn btn-ghost"
                                onClick={() => document.getElementById("update_stock_modal").close()}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="btn bg-accent-gold text-white hover:bg-accent-gold/90"
                                disabled={updateStockMutation.isPending}
                            >
                                {updateStockMutation.isPending ? "Updating..." : "Update Stock"}
                            </button>
                        </div>
                    </form>
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                </form>
            </dialog>
        </div>
    );
};

export default MyBooks;

