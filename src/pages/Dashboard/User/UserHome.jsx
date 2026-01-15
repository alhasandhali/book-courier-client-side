import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router";

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: orders = [] } = useQuery({
        queryKey: ["my-orders", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/orders?userEmail=${user.email}`);
            return res.data.filter(order => order.email === user.email || order.userEmail === user.email);
        },
        enabled: !!user?.email,
    });

    const { data: wishlist = [] } = useQuery({
        queryKey: ["wishlist", user?.email],
        queryFn: async () => {
            if (!user?.email) return [];
            const res = await axiosSecure.get(`/wishlist?email=${user.email}`);
            return res.data;
        },
        enabled: !!user?.email,
    });

    // Detailed Stats
    const totalOrders = orders.length;
    const pendingPayment = orders.filter(o => o.payment_status === 'pending').length;
    const processing = orders.filter(o => o.payment_status === 'paid' && o.shipping_status !== 'delivered').length;
    const totalSpent = orders.reduce((sum, order) => {
        if (order.payment_status === 'paid') {
            return sum + (order.totalPrice || 0);
        }
        return sum;
    }, 0);

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-main">
                    Welcome back, {user?.displayName?.split(' ')[0]}!
                </h1>
                <p className="text-text-muted">Here is an overview of your bookish journey.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Total Orders</h3>
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-shopping-bag text-accent-gold"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{totalOrders}</p>
                    <p className="text-xs text-text-muted mt-2">Placed so far</p>
                </div>

                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Unpaid</h3>
                        <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-clock text-yellow-600"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{pendingPayment}</p>
                    <p className="text-xs text-text-muted mt-2">Awaiting payment</p>
                </div>

                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Processing</h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-truck text-blue-600"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{processing}</p>
                    <p className="text-xs text-text-muted mt-2">In fulfillment</p>
                </div>

                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-sm font-semibold text-text-muted uppercase tracking-wider">Total Spent</h3>
                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-hand-holding-dollar text-green-600"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">${totalSpent.toFixed(2)}</p>
                    <p className="text-xs text-text-muted mt-2">Confirmed payments</p>
                </div>
            </div>

            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Wishlist Summary */}
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-serif font-bold text-text-main">My Wishlist</h3>
                        <Link to="/dashboard/wishlist" className="text-sm text-accent-gold hover:underline">View All</Link>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center text-red-500">
                                <i className="fas fa-heart"></i>
                            </div>
                            <div>
                                <p className="font-bold text-text-main text-2xl">{wishlist.length}</p>
                                <p className="text-sm text-text-muted">Items saved for later</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Quick Link */}
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border flex flex-col justify-center items-center text-center">
                    <h3 className="text-lg font-serif font-bold text-text-main mb-2">Need Help?</h3>
                    <p className="text-sm text-text-muted mb-4">Check your invoices or contact support for any order issues.</p>
                    <Link to="/dashboard/invoices" className="btn-primary py-2 px-6 rounded-lg text-sm">
                        View Invoices
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
