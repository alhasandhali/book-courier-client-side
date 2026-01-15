import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    const {
        data: orders = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["my-orders", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/orders?userEmail=${user.email}`);
            return res.data.filter(order => order.email === user.email || order.userEmail === user.email);
        },
        enabled: !!user?.email,
    });



    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        try {
            await axiosSecure.patch(`/order/${orderId}`, {
                status: "cancelled",
                shipping_status: "cancelled",
                payment_status: "cancelled"
            });
            toast.success("Order cancelled successfully");
            queryClient.invalidateQueries(["my-orders", user?.email]);
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
                My Orders
            </h2>
            {/* Desktop Table View */}
            <div className="hidden lg:block overflow-x-auto bg-bg-card rounded-xl shadow-md border border-card-border">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-bg-body text-text-muted uppercase text-xs font-semibold">
                        <tr>
                            <th className="py-4">Book Title</th>
                            <th className="py-4">Order Date</th>
                            <th className="py-4">Payment</th>
                            <th className="py-4">Shipping</th>
                            <th className="py-4">Total</th>
                            <th className="py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-b border-card-border last:border-none hover:bg-bg-body transition-colors"
                            >
                                <td className="font-medium text-text-main">
                                    {order.bookTitle}
                                </td>
                                <td className="text-text-muted">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.payment_status === "paid"
                                            ? "bg-green-100 text-green-600 border border-green-200"
                                            : "bg-yellow-100 text-yellow-600 border border-yellow-200"
                                            }`}
                                    >
                                        {order.payment_status || order.status || 'pending'}
                                    </span>
                                </td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.shipping_status === "delivered"
                                            ? "bg-green-100 text-green-600 border border-green-200"
                                            : order.shipping_status === "shipped"
                                                ? "bg-blue-100 text-blue-600 border border-blue-200"
                                                : "bg-gray-100 text-gray-500 border border-gray-200"
                                            }`}
                                    >
                                        {order.shipping_status || 'pending'}
                                    </span>
                                </td>
                                <td className="font-semibold text-text-main">
                                    ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                                </td>
                                <td className="flex gap-2">
                                    {(order.payment_status === "pending" || order.status === "pending") && (
                                        <>
                                            <Link
                                                to={`/dashboard/payment/${order._id}`}
                                                state={{ order }}
                                                className="px-3 py-1.5 bg-green-500 text-white text-xs rounded-md hover:bg-green-600 transition-colors shadow-sm"
                                            >
                                                Pay Now
                                            </Link>
                                            <button
                                                onClick={() => handleCancelOrder(order._id)}
                                                className="px-3 py-1.5 bg-red-50 text-red-500 text-xs rounded-md border border-red-100 hover:bg-red-100 transition-colors"
                                            >
                                                Cancel
                                            </button>
                                        </>
                                    )}
                                    {order.status !== "pending" && (
                                        <span className="text-text-muted text-xs italic">
                                            No actions available
                                        </span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile Card View */}
            <div className="lg:hidden space-y-4">
                {orders.map((order) => (
                    <div key={order._id} className="bg-bg-card p-5 rounded-xl border border-card-border shadow-md space-y-4">
                        <div className="flex justify-between items-start border-b border-card-border pb-3">
                            <h3 className="font-bold text-text-main line-clamp-1 flex-1">{order.bookTitle}</h3>
                        </div>
                        <div className="grid grid-cols-2 gap-2 border-b border-card-border pb-3">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Payment</p>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.payment_status === "paid" ? "bg-green-100 text-green-600 border border-green-200" : "bg-yellow-100 text-yellow-600 border border-yellow-200"}`}>
                                    {order.payment_status || 'pending'}
                                </span>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Shipping</p>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${order.shipping_status === "delivered" ? "bg-green-100 text-green-600 border border-green-200" : order.shipping_status === "shipped" ? "bg-blue-100 text-blue-600 border border-blue-200" : "bg-gray-100 text-gray-500 border border-gray-200"}`}>
                                    {order.shipping_status || 'pending'}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Order Date</p>
                                <p className="text-xs font-semibold text-text-muted">{new Date(order.orderDate).toLocaleDateString()}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Price</p>
                                <p className="text-sm font-bold text-text-main">${order.totalPrice?.toFixed(2) || "0.00"}</p>
                            </div>
                        </div>

                        {(order.payment_status === "pending" || order.status === "pending") && (
                            <div className="flex gap-3 pt-2">
                                <Link
                                    to={`/dashboard/payment/${order._id}`}
                                    state={{ order }}
                                    className="flex-1 bg-green-500 text-white text-center py-2.5 rounded-lg text-xs font-bold hover:bg-green-600 shadow-sm transition-all"
                                >
                                    Pay Now
                                </Link>
                                <button
                                    onClick={() => handleCancelOrder(order._id)}
                                    className="flex-1 bg-white text-red-500 border border-red-100 py-2.5 rounded-lg text-xs font-bold hover:bg-red-50 transition-all"
                                >
                                    Cancel Order
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {orders.length === 0 && (
                <div className="p-12 text-center bg-bg-card rounded-xl border border-card-border mt-4 shadow-sm">
                    <div className="w-16 h-16 bg-bg-body rounded-full flex items-center justify-center mx-auto mb-4 text-text-muted/30">
                        <i className="fa-solid fa-shopping-basket text-2xl"></i>
                    </div>
                    <p className="text-text-muted font-medium">You haven't placed any orders yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyOrders;
