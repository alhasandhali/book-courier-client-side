import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import DashboardLayout from "./Shared/DashboardLayout";

const AdminDashboard = () => {
    const sidebarLinks = [
        { name: "Overview", path: "/dashboard", icon: "fa-columns", end: true },
        { name: "Manage Users", path: "/dashboard/users", icon: "fa-users-cog" },
        { name: "Manage Books", path: "/dashboard/all-books", icon: "fa-book-open" },
        { name: "Manage Orders", path: "/dashboard/orders", icon: "fa-shopping-cart" },
        { name: "My Profile", path: "/dashboard/profile", icon: "fa-user-circle" },
        { name: "Main Home", path: "/", icon: "fa-arrow-left", end: false },
    ];
    return (
        <DashboardLayout title="Admin Panel" sidebarLinks={sidebarLinks} />
    );
};

export default AdminDashboard;
