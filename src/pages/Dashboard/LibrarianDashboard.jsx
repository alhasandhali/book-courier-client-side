import React from "react";
import { Link, NavLink, Outlet } from "react-router";
import DashboardLayout from "./Shared/DashboardLayout";

const LibrarianDashboard = () => {
    const sidebarLinks = [
        { name: "Overview", path: "/dashboard", icon: "fa-columns", end: true },
        { name: "Add Book", path: "/dashboard/add-book", icon: "fa-plus-circle" },
        { name: "My Books", path: "/dashboard/my-books", icon: "fa-book" },
        { name: "Manage Orders", path: "/dashboard/issued-books", icon: "fa-tasks" },
        { name: "My Profile", path: "/dashboard/profile", icon: "fa-user-circle" },
        { name: "Main Home", path: "/", icon: "fa-arrow-left", end: false },
    ];

    return (
        <DashboardLayout title="Librarian Portal" sidebarLinks={sidebarLinks} />
    );
};

export default LibrarianDashboard;
