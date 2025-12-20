import React from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useQuery } from "@tanstack/react-query";
import AdminDashboard from "./AdminDashboard";
import UserDashboard from "./UserDashboard";
import LibrarianDashboard from "./LibrarianDashboard";

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
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-accent-gold"></span>
            </div>
        );
    }

    const role = userInfo?.role;

    if (role === "admin") return <AdminDashboard />;
    if (role === "librarian") return <LibrarianDashboard />;
    return <UserDashboard />;
};

export default Dashboard;
