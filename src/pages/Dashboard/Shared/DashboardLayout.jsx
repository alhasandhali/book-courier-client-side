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
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:sticky top-0 left-0 h-screen lg:min-h-screen
                    w-64 bg-[#f3f0ea] z-0 transform transition-transform duration-300 ease-in-out
                    ${isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                    overflow-y-auto
                    lg:pt-24
                    flex flex-col
                `}
            >
                {/* Logo & Title Section */}
                <div className="p-5 border-b border-gray-200 flex justify-between items-center lg:mt-0 mt-24 flex-shrink-0">
                    <div className="flex-1">
                        <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                            <img src={logo} alt="BookCourier Logo" className="w-8 h-8" />
                            <span className="text-lg font-serif font-bold text-text-main">BookCourier</span>
                        </Link>
                        <p className="text-xs text-text-muted mt-1.5 ml-10 font-medium">{title}</p>
                    </div>
                    {/* Close button for mobile */}
                    <button
                        className="lg:hidden text-gray-400 hover:text-red-500 transition-colors p-1"
                        onClick={() => setIsSidebarOpen(false)}
                        aria-label="Close sidebar"
                    >
                        <i className="fas fa-times text-lg"></i>
                    </button>
                </div>

                {/* Navigation Links */}
                <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
                    {sidebarLinks.map((link) => (
                        <NavLink
                            key={link.name}
                            to={link.path}
                            end={link.end}
                            onClick={() => setIsSidebarOpen(false)}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${isActive
                                    ? "bg-accent-gold text-white shadow-md"
                                    : "text-text-muted hover:bg-gray-50 hover:text-text-main hover:shadow-sm"
                                }`
                            }
                        >
                            <i className={`fas ${link.icon} w-5 text-center`}></i>
                            <span className="font-medium text-sm">{link.name}</span>
                        </NavLink>
                    ))}
                </nav>

                {/* Bottom Padding for better scroll experience */}
                <div className="h-4 flex-shrink-0"></div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 p-4 lg:p-8 w-full">
                {/* Mobile Toggle Button */}
                <div className="lg:hidden mb-6 flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm">
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="text-text-main hover:text-accent-gold transition-colors"
                    >
                        <i className="fas fa-bars text-2xl"></i>
                    </button>
                    <span className="font-serif font-bold text-lg text-text-main">
                        {title}
                    </span>
                </div>

                <div className="max-w-7xl mx-auto">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
