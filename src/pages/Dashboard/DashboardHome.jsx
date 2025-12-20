import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import AdminHome from "./AdminHome";
import LibrarianHome from "./LibrarianHome";
import UserHome from "./User/UserHome";

const DashboardHome = () => {
    const { user } = useAuth();
    const axiosPublic = useAxios();

    const { data: userInfo, isLoading } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
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
