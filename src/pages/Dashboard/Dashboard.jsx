import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import LibrarianDashboard from "./LibrarianDashboard";
import DashboardLoading from "../../components/Shared/DashboardLoading";

const Dashboard = () => {
    const { user, loading } = useAuth();
    const axiosPublic = useAxios();

    const { data: userInfo, isLoading: isUserLoading } = useQuery({
        queryKey: ["user", user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/user/email/${user.email}`);
            return res.data;
        },
    });

    if (loading || isUserLoading) {
        return <DashboardLoading fullScreen={true} />;
    }

    const role = userInfo?.role;

    if (role === "admin") return <AdminDashboard />;
    if (role === "librarian") return <LibrarianDashboard />;
    return <UserDashboard />;
};

export default Dashboard;
