import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

const LibrarianOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();

    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ["librarian-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders");
            return res.data;
        },
        enabled: !loading && !!user
    });

    const handleStatusChange = async (orderId, newStatus) => {
        try {
            await axiosSecure.patch(`/order/${orderId}`, { status: newStatus });
            toast.success(`Order status updated to ${newStatus}`);
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update status");
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        try {
            await axiosSecure.patch(`/order/${orderId}`, { status: "cancelled" });
            toast.success("Order cancelled");
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel order");
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
                Order Management
            </h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                <table className="table w-full">
                    <thead className="bg-gray-50 text-text-muted uppercase text-xs font-semibold">
                        <tr>
                            <th className="py-4">Book Title</th>
                            <th className="py-4">Customer</th>
                            <th className="py-4">Date</th>
                            <th className="py-4">Status</th>
                            <th className="py-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-b border-gray-50 hover:bg-gray-50/50"
                            >
                                <td className="font-medium text-text-main">
                                    {order.bookId?.name || order.bookId?.title || order.book?.name || order.book?.title || order.bookTitle || order.bookName || "Untitled"}
                                </td>
                                <td className="text-text-muted">
                                    {order.userId?.name || order.userId?.email || order.user?.name || order.user?.email || order.userEmail || order.userName || order.email || order.customerName || "Unknown"}
                                </td>
                                <td className="text-text-muted">{new Date(order.orderDate).toLocaleDateString()}</td>
                                <td>
                                    <select
                                        value={order.status}
                                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                        disabled={order.status === 'cancelled'}
                                        className={`px-3 py-1 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-accent-gold outline-none ${order.status === 'cancelled' ? 'bg-gray-100 cursor-not-allowed' : 'bg-gray-50'
                                            }`}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="shipped">Shipped</option>
                                        <option value="delivered">Delivered</option>
                                        <option value="cancelled" disabled>Cancelled</option>
                                    </select>
                                </td>
                                <td>
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        disabled={order.status === 'cancelled' || order.status === 'delivered'}
                                        className="text-red-500 hover:text-red-700 font-medium text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel Order
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {orders.length === 0 && (
                    <div className="p-8 text-center text-text-muted">
                        No orders found.
                    </div>
                )}
            </div>
        </div>
    );
};

export default LibrarianOrders;
