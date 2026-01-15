import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

const ManageAllOrders = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const [searchTerm, setSearchTerm] = useState("");
    const queryClient = useQueryClient();

    const { data: orders = [], refetch, isLoading } = useQuery({
        queryKey: ["all-orders"],
        queryFn: async () => {
            const res = await axiosSecure.get("/orders");
            return res.data || [];
        },
        enabled: !loading && !!user && !isAdminLoading && !!isAdmin,
    });

    const handleShippingStatusChange = async (orderId, newStatus) => {
        try {
            await axiosSecure.patch(`/order/${orderId}`, {
                shipping_status: newStatus,
                status: newStatus // sync legacy
            });
            toast.success(`Shipping status updated to ${newStatus}`);
            queryClient.invalidateQueries(["all-orders"]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to update shipping status");
        }
    };

    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        try {
            await axiosSecure.patch(`/order/${orderId}`, {
                shipping_status: "cancelled",
                payment_status: "cancelled",
                status: "cancelled"
            });
            toast.success("Order cancelled");
            queryClient.invalidateQueries(["all-orders"]);
        } catch (error) {
            console.error(error);
            toast.error("Failed to cancel order");
        }
    };

    const filteredOrders = orders.filter(order => {
        const bookTitle = (order.bookTitle || "").toLowerCase();
        const customerName = (order.customerName || order.userName || "").toLowerCase();
        const search = searchTerm.toLowerCase();
        return bookTitle.includes(search) || customerName.includes(search);
    });

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h2 className="text-3xl font-serif font-bold text-text-main">
                    Manage All Orders
                </h2>
                <div className="relative w-full md:w-72">
                    <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-text-muted text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search book or customer..."
                        className="pl-10 pr-4 py-2 w-full bg-bg-card border border-card-border rounded-lg text-sm focus:ring-2 focus:ring-accent-gold outline-none text-text-main"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="overflow-x-auto bg-bg-card rounded-xl shadow-md border border-card-border">
                <table className="table w-full border-collapse">
                    <thead className="bg-bg-body text-text-muted uppercase text-[10px] font-bold tracking-wider">
                        <tr>
                            <th className="py-4 px-6 text-left">Order Info</th>
                            <th className="py-4 px-4 text-left">Customer</th>
                            <th className="py-4 px-4 text-center">Qty / Total</th>
                            <th className="py-4 px-4 text-center">Payment</th>
                            <th className="py-4 px-4 text-center">Shipping</th>
                            <th className="py-4 px-6 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredOrders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-b border-card-border hover:bg-bg-body/50 transition-colors"
                            >
                                <td className="py-4 px-6">
                                    <div className="font-bold text-text-main text-sm">
                                        {typeof order.bookTitle === 'object' ? JSON.stringify(order.bookTitle) : (order.bookTitle || "Untitled Book")}
                                    </div>
                                    <div className="text-[10px] text-text-muted flex items-center gap-2 mt-1">
                                        <i className="fa-regular fa-calendar text-accent-gold"></i>
                                        {new Date(order.orderDate).toLocaleDateString()}
                                    </div>
                                    <div className="text-[10px] text-text-muted mt-1">
                                        Seller: {order.librarianEmail || "Unknown"}
                                    </div>
                                </td>
                                <td className="py-4 px-4">
                                    <div className="font-semibold text-text-main text-sm">
                                        {typeof (order.customerName || order.userName) === 'object'
                                            ? (order.customerName?.name || order.userName?.name || "Customer Object")
                                            : (order.customerName || order.userName || "Unknown")}
                                    </div>
                                    <div className="text-[10px] text-text-muted mt-0.5">
                                        {typeof order.phone === 'object' ? "Phone Object" : (order.phone || "No phone")}
                                    </div>
                                    <div className="text-[10px] text-text-muted truncate max-w-[150px]">
                                        {typeof order.address === 'object' && order.address !== null
                                            ? [order.address.street, order.address.city, order.address.state].filter(Boolean).join(", ")
                                            : (order.address || "No address")}
                                    </div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <div className="text-sm font-bold text-text-main">x{order.quantity}</div>
                                    <div className="text-xs text-accent-gold font-bold">${order.totalPrice?.toFixed(2)}</div>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.payment_status === 'paid' ? 'bg-green-100 text-green-600 border border-green-200' : 'bg-yellow-100 text-yellow-600 border border-yellow-200'}`}>
                                        {order.payment_status || order.status || 'pending'}
                                    </span>
                                </td>
                                <td className="py-4 px-4 text-center">
                                    <select
                                        value={order.shipping_status || order.status}
                                        onChange={(e) => handleShippingStatusChange(order._id, e.target.value)}
                                        disabled={order.shipping_status === 'cancelled' || order.status === 'cancelled'}
                                        className={`px-2 py-1 border border-card-border rounded-lg text-[10px] font-bold focus:ring-2 focus:ring-accent-gold outline-none transition-all ${(order.shipping_status === 'cancelled' || order.status === 'cancelled') ? 'bg-bg-body opacity-50 cursor-not-allowed' : 'bg-bg-body text-text-main hover:border-accent-gold cursor-pointer'
                                            }`}
                                    >
                                        <option value="pending">PENDING</option>
                                        <option value="shipped">SHIPPED</option>
                                        <option value="delivered">DELIVERED</option>
                                        <option value="cancelled" disabled>CANCELLED</option>
                                    </select>
                                </td>
                                <td className="py-4 px-6 text-right">
                                    <button
                                        onClick={() => handleCancelOrder(order._id)}
                                        disabled={order.shipping_status === 'cancelled' || order.status === 'cancelled' || order.shipping_status === 'delivered' || order.status === 'delivered'}
                                        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100 disabled:opacity-30 disabled:cursor-not-allowed"
                                        title="Cancel Order"
                                    >
                                        <i className="fa-solid fa-trash-can"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {filteredOrders.length === 0 && (
                    <div className="p-12 text-center text-text-muted">
                        <i className="fa-solid fa-box-open text-4xl mb-4 opacity-20"></i>
                        <p className="font-medium">No orders found.</p>
                        <p className="text-xs">Try adjusting your search terms.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ManageAllOrders;
