import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch Users
    const { data: users = [], isLoading: usersLoading } = useQuery({
        queryKey: ["admin-users-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data || [];
        }
    });

    // Fetch Books
    const { data: books = [], isLoading: booksLoading } = useQuery({
        queryKey: ["admin-books-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/books");
            return res.data || [];
        }
    });

    // Fetch Orders/Revenue (Using orders as a proxy for revenue if direct payments aren't available)
    const { data: orders = [], isLoading: ordersLoading } = useQuery({
        queryKey: ["admin-orders-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders"); // Assuming this exists for admins or fallback to users/books
            return res.data || [];
        }
    });

    const totalRevenue = orders
        .filter(o => o.status === 'paid' || o.status === 'delivered' || o.status === 'shipped')
        .reduce((sum, o) => sum + (o.totalPrice || 0), 0);

    const isLoading = usersLoading || booksLoading || ordersLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-text-main">Dashboard Overview</h1>
                    <p className="text-text-muted">Welcome back, {user?.displayName || 'Admin'}</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-text-muted hover:text-text-main transition-colors relative">
                        <i className="fas fa-bell text-xl"></i>
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center text-accent-gold font-bold overflow-hidden">
                        {user?.photoURL ? (
                            <img src={user.photoURL} alt="Admin" className="w-full h-full object-cover" />
                        ) : (
                            user?.displayName ? user.displayName[0] : 'A'
                        )}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">
                            Total Users
                        </h3>
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-users text-accent-gold"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{users.length.toLocaleString()}</p>
                    <p className="text-sm text-green-500 mt-2">
                        <i className="fas fa-user-check mr-1"></i> Registered members
                    </p>
                </div>
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">
                            Total Books
                        </h3>
                        <div className="w-10 h-10 bg-accent-green/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-book text-accent-green"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{books.length.toLocaleString()}</p>
                    <p className="text-sm text-green-500 mt-2">
                        <i className="fas fa-check mr-1"></i> Library collection
                    </p>
                </div>
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">Total Revenue</h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-dollar-sign text-blue-600"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">${totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                    <p className="text-sm text-text-muted mt-2">
                        From completed shipments
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
