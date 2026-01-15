import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import DashboardLayout from "./Shared/DashboardLayout";

const UserDashboard = () => {
    const sidebarLinks = [
        { name: "Overview", path: "/dashboard", icon: "fa-columns", end: true },
        { name: "My Orders", path: "/dashboard/my-orders", icon: "fa-shopping-bag" },
        { name: "My Wishlist", path: "/dashboard/wishlist", icon: "fa-heart" },
        { name: "Invoices", path: "/dashboard/invoices", icon: "fa-file-invoice-dollar" },
        { name: "My Profile", path: "/dashboard/profile", icon: "fa-user-circle" },
        { name: "Main Home", path: "/", icon: "fa-arrow-left", end: false },
    ];

    return (
        <DashboardLayout title="User Dashboard" sidebarLinks={sidebarLinks} />
    );
};

export default UserDashboard;
