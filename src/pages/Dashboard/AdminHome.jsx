import React from "react";

const AdminHome = () => {
    return (
        <div>
            <header className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-text-main">Dashboard Overview</h1>
                    <p className="text-text-muted">Welcome back, Admin</p>
                </div>
                <div className="flex items-center gap-4">
                    <button className="p-2 text-text-muted hover:text-text-main transition-colors relative">
                        <i className="fas fa-bell text-xl"></i>
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-10 h-10 bg-accent-gold/20 rounded-full flex items-center justify-center text-accent-gold font-bold">
                        A
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
                    <p className="text-3xl font-bold text-text-main">1,234</p>
                    <p className="text-sm text-green-500 mt-2">
                        <i className="fas fa-arrow-up mr-1"></i> +12% this month
                    </p>
                </div>
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">
                            Total Orders
                        </h3>
                        <div className="w-10 h-10 bg-accent-green/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-shopping-cart text-accent-green"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">856</p>
                    <p className="text-sm text-green-500 mt-2">
                        <i className="fas fa-arrow-up mr-1"></i> +5% this week
                    </p>
                </div>
                <div className="bg-bg-card p-6 rounded-xl shadow-md border border-card-border">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">Revenue</h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-dollar-sign text-blue-600"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">$45,200</p>
                    <p className="text-sm text-green-500 mt-2">
                        <i className="fas fa-arrow-up mr-1"></i> +8% this month
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;
