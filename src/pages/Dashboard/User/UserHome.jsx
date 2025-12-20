import React from "react";

const UserHome = () => {
    return (
        <div>
            <header className="mb-8">
                <h1 className="text-3xl font-serif font-bold text-text-main">
                    Welcome back!
                </h1>
                <p className="text-text-muted">Here is an overview of your activity.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">My Orders</h3>
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-box text-accent-gold"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">3</p>
                    <p className="text-sm text-text-muted mt-2">View order history</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">Wishlist</h3>
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-heart text-red-500"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">12</p>
                    <p className="text-sm text-text-muted mt-2">Saved items</p>
                </div>
            </div>
        </div>
    );
};

export default UserHome;
