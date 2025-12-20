import React from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

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

    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-main">
                    Welcome back!
                </h1>
                <p className="text-text-muted">Here is an overview of your activity.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">My Orders</h3>
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-box text-accent-gold"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{orders.length}</p>
                    <p className="text-sm text-text-muted mt-2">View order history</p>
                </div>
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">Wishlist</h3>
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-heart text-red-500"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">{wishlist.length}</p>
                    <p className="text-sm text-text-muted mt-2">Saved items</p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
