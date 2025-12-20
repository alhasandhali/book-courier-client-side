import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import DashboardLayout from "./Shared/DashboardLayout";

const AdminDashboard = () => {
    const sidebarLinks = [
        { name: "Dashboard", path: "/dashboard", icon: "fa-home", end: true },
        { name: "Manage Users", path: "/dashboard/users", icon: "fa-users" },
        { name: "Manage Books", path: "/dashboard/all-books", icon: "fa-book" },
        { name: "Manage Orders", path: "/dashboard/orders", icon: "fa-shopping-cart" },
        { name: "My Profile", path: "/dashboard/profile", icon: "fa-user" },
    ];
    return (
        <DashboardLayout title="Admin Panel" sidebarLinks={sidebarLinks} />
    );
};

export default AdminDashboard;
