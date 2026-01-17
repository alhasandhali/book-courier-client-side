import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import DashboardLoading from "../../components/Shared/DashboardLoading";

const LibrarianHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch Books
    const { data: books = [], isLoading: booksLoading } = useQuery({
        queryKey: ["my-books-stats", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/books`);
            return (res.data || []).filter(book => book.addedBy === user.email);
        },
        enabled: !!user?.email
    });

    // Fetch Orders
    const { data: orders = [], isLoading: ordersLoading } = useQuery({
        queryKey: ["librarian-orders-stats", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/orders?librarianEmail=${user.email}`);
            // Filter on client side as well for safety
            return (res.data || []).filter(order => order.librarianEmail === user.email);
        },
        enabled: !!user?.email
    });

    const totalBooks = books.length;
    const currentlyIssued = orders.filter(o => o.shipping_status === 'shipped' || o.shipping_status === 'delivered').length;
    const pendingOrders = orders.filter(o => o.payment_status === 'pending').length;

    if (booksLoading || ordersLoading) {
        return <DashboardLoading />;
    }

    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-text-main">Librarian Overview</h1>
                    <p className="text-text-muted">Manage library resources efficiently.</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-text-muted hover:text-text-main transition-colors relative">
                        <i className="fas fa-bell text-xl"></i>
                        {pendingOrders > 0 && (
                            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                        )}
                    </button>
                    <div className="w-10 h-10 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green font-bold">
                        {user?.displayName ? user.displayName[0] : 'L'}
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">
                            Total Books
                        </h3>
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-book text-accent-gold"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{totalBooks.toLocaleString()}</p>
                    <p className="text-sm text-green-500 mt-2">
                        <i className="fas fa-check mr-1"></i> Active collection
                    </p>
                </div>
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">
                            Currently Issued
                        </h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-book-reader text-blue-600"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{currentlyIssued.toLocaleString()}</p>
                    <p className="text-sm text-text-muted mt-2">
                        Books with customers
                    </p>
                </div>
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">Pending Orders</h3>
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-clock text-red-500"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{pendingOrders.toLocaleString()}</p>
                    <p className="text-sm text-red-500 mt-2">
                        {pendingOrders > 0 ? "Action required" : "All caught up"}
                    </p>
                </div>
            </div>
            {/* Recent Orders Section */}
            <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-serif font-bold text-text-main">Recent Client Orders</h3>
                    <a href="/dashboard/orders" className="text-sm font-bold text-accent-gold hover:underline">Manage All</a>
                </div>
                <div className="bg-bg-card rounded-xl shadow-md border border-card-border overflow-hidden">
                    <table className="table w-full">
                        <thead className="bg-bg-body text-text-muted text-[10px] uppercase font-bold">
                            <tr>
                                <th className="py-3 px-6">Book</th>
                                <th className="py-3 px-4">Customer</th>
                                <th className="py-3 px-4">Status</th>
                                <th className="py-3 px-6 text-right">Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order._id} className="border-b border-card-border hover:bg-bg-body/30 transition-colors">
                                    <td className="py-3 px-6 font-medium text-text-main text-sm">
                                        {typeof order.bookTitle === 'object' ? "Book Object" : order.bookTitle}
                                    </td>
                                    <td className="py-3 px-4 text-text-muted text-xs">
                                        {typeof (order.customerName || order.userName) === 'object'
                                            ? "Customer Object"
                                            : (order.customerName || order.userName)}
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${order.shipping_status === 'delivered' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}>
                                            {order.shipping_status || order.status}
                                        </span>
                                    </td>
                                    <td className="py-3 px-6 text-right text-text-muted text-xs">
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-text-muted italic">No recent orders.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default LibrarianHome;
