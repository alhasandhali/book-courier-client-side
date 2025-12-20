import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import DashboardLayout from "./Shared/DashboardLayout";

const UserDashboard = () => {
    const sidebarLinks = [
        { name: "Dashboard", path: "/dashboard", icon: "fa-home", end: true },
        { name: "My Orders", path: "/dashboard/my-orders", icon: "fa-shopping-bag" },
        { name: "My Wishlist", path: "/dashboard/wishlist", icon: "fa-heart" },
        { name: "My Profile", path: "/dashboard/profile", icon: "fa-user" },
        { name: "Invoices", path: "/dashboard/invoices", icon: "fa-file-invoice-dollar" },
    ];

    return (
        <DashboardLayout title="User Dashboard" sidebarLinks={sidebarLinks} />
    );
};

export default UserDashboard;
