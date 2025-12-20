import React from "react";

const LibrarianHome = () => {
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
                        <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
                    </button>
                    <div className="w-10 h-10 bg-accent-green/20 rounded-full flex items-center justify-center text-accent-green font-bold">
                        L
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">
                            Total Books
                        </h3>
                        <div className="w-10 h-10 bg-accent-gold/10 rounded-full flex items-center justify-center">
                            <i className="fas fa-book text-accent-gold"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">10,432</p>
                    <p className="text-sm text-green-500 mt-2">
                        <i className="fas fa-check mr-1"></i> Active collection
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">
                            Currently Issued
                        </h3>
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-book-reader text-blue-600"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">156</p>
                    <p className="text-sm text-text-muted mt-2">
                        Books borrowed
                    </p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-text-muted">Pending Returns</h3>
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                            <i className="fas fa-undo text-red-500"></i>
                        </div>
                    </div>
                    <p className="text-3xl font-bold text-text-main">8</p>
                    <p className="text-sm text-red-500 mt-2">
                        Action required
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LibrarianHome;
