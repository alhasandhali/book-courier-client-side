import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure"; // Using secure axios for dashboard
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const MyBooks = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

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

            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
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
                        <thead className="bg-gray-50 text-text-muted uppercase text-xs font-semibold">
                            <tr>
                                <th className="py-4">Book</th>
                                <th className="py-4">Author</th>
                                <th className="py-4">Status</th>
                                <th className="py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {books.map((book) => (
                                <tr key={book._id} className="border-b border-gray-50 hover:bg-gray-50/50">
                                    <td>
                                        <div className="flex items-center gap-3">
                                            <img src={book.image} alt={book.title} className="w-12 h-16 object-cover rounded shadow-sm" />
                                            <span className="font-bold text-text-main">{book.title}</span>
                                        </div>
                                    </td>
                                    <td className="text-text-muted">{book.author}</td>
                                    <td>
                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${book.status === 'published' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                            {book.status}
                                        </span>
                                    </td>
                                    <td className="text-right">
                                        <Link to={`/dashboard/update-book/${book._id}`} className="px-3 py-1.5 border border-gray-200 rounded text-sm hover:bg-gray-50 mr-2 transition-colors inline-block">
                                            <i className="fas fa-edit text-blue-500"></i> Edit
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default MyBooks;
