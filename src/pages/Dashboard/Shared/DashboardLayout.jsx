import React, { useState } from "react";
import { Link, NavLink, Outlet } from "react-router";
import logo from "../../../assets/logo.png"

const DashboardLayout = ({ title, sidebarLinks }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <div className="flex min-h-screen bg-bg-body relative">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60] lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen lg:h-[calc(100vh-80px)] lg:top-20
                    w-72 sm:w-80 lg:w-64 bg-[#f3f0ea] z-[70] transform transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
                    ${isSidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"}
                    overflow-y-auto
                    flex flex-col
                    border-r border-gray-100 lg:border-none
                `}
            >
                {/* Logo & Title Section (only visible in mobile drawer or if needed) */}
                <div className="p-6 border-b border-gray-200/50 flex justify-between items-center lg:hidden">
                    <div className="flex items-center gap-2">
                        <img src={logo} alt="BookCourier Logo" className="w-8 h-8" />
                        <span className="text-xl font-serif font-bold text-text-main">BookCourier</span>
                    </div>
                    <button
                        className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-gray-400 hover:text-red-500 transition-colors shadow-sm"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>

                <div className="p-6 lg:p-4">
                    <p className="text-[10px] uppercase font-bold text-text-muted tracking-[2px] mb-4 opacity-60">
                        {title}
                    </p>
                    {/* Navigation Links */}
                    <nav className="space-y-1.5 font-medium">
                        {sidebarLinks.map((link) => (
                            <NavLink
                                key={link.name}
                                to={link.path}
                                end={link.end}
                                onClick={() => setIsSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-300 ${isActive
                                        ? "bg-black text-white shadow-lg shadow-black/10 scale-[1.02]"
                                        : "text-text-muted hover:bg-white hover:text-text-main hover:shadow-sm"
                                    }`
                                }
                            >
                                <i className={`fas ${link.icon} w-5 text-center text-sm ${link.isActive ? 'text-white' : 'text-accent-gold'}`}></i>
                                <span className="text-sm">{link.name}</span>
                            </NavLink>
                        ))}
                    </nav>
                </div>

                {/* Sidebar Footer or User info could go here for mobile */}
            </aside>

            {/* Main Content */}
            <main className="flex-1 w-full min-w-0">
                {/* Mobile Dash Header */}
                <div className="lg:hidden sticky top-0 z-[40] bg-white/80 backdrop-blur-md border-b border-gray-100 p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-text-main hover:text-accent-gold transition-colors"
                        >
                            <i className="fas fa-bars-staggered"></i>
                        </button>
                        <h2 className="font-serif font-bold text-lg text-text-main">{title}</h2>
                    </div>
                    <Link to="/" className="w-8 h-8">
                        <img src={logo} alt="Logo" className="w-full h-full object-contain" />
                    </Link>
                </div>

                <div className="p-4 sm:p-6 lg:p-10">
                    <div className="max-w-7xl mx-auto">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
