import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import AdminHome from "./AdminHome";
import LibrarianHome from "./LibrarianHome";
import UserHome from "./User/UserHome";

// For now, since AdminHome and LibrarianHome are not extracted yet, we might have issues.
// But I will create AdminHome and LibrarianHome in next steps or right now.
// For this step, I'll assume they will exist.
// Wait, I can't import files I haven't created.
// To resolve this circular dependency plan, I'll inline stub them or create them BEFORE this file if I could, 
// but I am in one turn.
// I will create simple placeholders for AdminHome and LibrarianHome inside this file temporarily OR 
// I will create them as separate files in this same turn. I'll choose separate files.

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxios();

    // We can reuse the react-query for user role if needed, or just pass it down if Dashboard.jsx passed it.
    // Dashboard.jsx is the parent. Dashboard.jsx renders the Layout. 
    // The Layout renders <Outlet />.
    // <Outlet /> renders DashboardHome if path is /dashboard.
    // So DashboardHome needs to know the role again.

    // Duplicate simple fetch or hook
    const { data: userInfo, isLoading } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            // Basic fetch just to get role logic.
            // Ideally this data is cached from context or Dashboard.jsx, but safety first.
            const res = await axiosPublic.get(`/user/email/${user.email}`);
            return res.data;
        },
    });

    if (isLoading) return <div className="p-8">Loading stats...</div>;

    const role = userInfo?.role;

    if (role === "admin") return <AdminHome />;
    if (role === "librarian") return <LibrarianHome />;
    return <UserHome />;
};

export default DashboardHome;
