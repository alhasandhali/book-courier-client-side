import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";
import toast from "react-hot-toast";

const MyOrders = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const {
        data: orders = [],
        refetch,
        isLoading,
    } = useQuery({
        queryKey: ["my-orders", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/orders?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    const handleCancelOrder = async (orderId) => {
        if (!confirm("Are you sure you want to cancel this order?")) return;

        try {
            await axiosSecure.patch(`/order/${orderId}`, { status: "cancelled" });
            toast.success("Order cancelled successfully");
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
                My Orders
            </h2>
            <div className="overflow-x-auto bg-white rounded-xl shadow-md border border-gray-100">
                <table className="table w-full">
                    {/* head */}
                    <thead className="bg-gray-50 text-text-muted uppercase text-xs font-semibold">
                        <tr>
                            <th className="py-4">Book Title</th>
                            <th className="py-4">Order Date</th>
                            <th className="py-4">Status</th>
                            <th className="py-4">Total</th>
                            <th className="py-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr
                                key={order._id}
                                className="border-b border-gray-50 last:border-none hover:bg-gray-50/50 transition-colors"
                            >
                                <td className="font-medium text-text-main">
                                    {order.bookTitle}
                                </td>
                                <td className="text-text-muted">
                                    {new Date(order.orderDate).toLocaleDateString()}
                                </td>
                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${order.status === "pending"
                                            ? "bg-yellow-100 text-yellow-600"
                                            : order.status === "shipped"
                                                ? "bg-blue-100 text-blue-600"
                                                : order.status === "paid"
                                                    ? "bg-green-100 text-green-600"
                                                    : order.status === "cancelled"
                                                        ? "bg-red-100 text-red-600"
                                                        : "bg-gray-100 text-gray-600"
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                                <td className="font-semibold text-text-main">
                                    ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}
                                </td>
                                <td className="flex gap-2">
                                    {order.status === "pending" && (
                                        <>
                                            <Link
                                                to={`/payment/${order._id}`}
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
                {orders.length === 0 && (
                    <div className="p-8 text-center text-text-muted">
                        You haven't placed any orders yet.
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyOrders;
