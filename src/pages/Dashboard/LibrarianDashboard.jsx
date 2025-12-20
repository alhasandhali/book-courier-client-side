import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import DashboardLayout from "./Shared/DashboardLayout";

const LibrarianDashboard = () => {
    const sidebarLinks = [
        { name: "Dashboard", path: "/dashboard", icon: "fa-home", end: true },
        { name: "Add Book", path: "/dashboard/add-book", icon: "fa-plus-circle" },
        { name: "My Books", path: "/dashboard/my-books", icon: "fa-book" },
        { name: "My Orders", path: "/dashboard/my-orders", icon: "fa-shopping-cart" },
        { name: "My Profile", path: "/dashboard/profile", icon: "fa-user" },

    ];

    return (
        <DashboardLayout title="Librarian Portal" sidebarLinks={sidebarLinks} />
    );
};

export default LibrarianDashboard;
