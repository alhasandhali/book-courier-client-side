import React from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useAdmin from "../../../hooks/useAdmin";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";
import DashboardLoading from "../../../components/Shared/DashboardLoading";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();

    const { data: users = [], refetch, isLoading } = useQuery({
        queryKey: ["users"],
        queryFn: async () => {
            const res = await axiosSecure.get("/users");
            return res.data;
        },
        enabled: !loading && !!user && !isAdminLoading && !!isAdmin,
    });

    const handleRoleChange = async (userId, newRole) => {
        try {
            await axiosSecure.patch(`/user/${userId}`, { role: newRole });
            toast.success(`User role updated to ${newRole} successfully!`);
            refetch();
        } catch (error) {
            console.error(error);
            toast.error("Failed to update user role");
        }
    };

    if (isLoading) {
        return <DashboardLoading />;
    }

    return (
        <div>
            <h2 className="text-3xl font-serif font-bold text-text-main mb-6">Manage Users</h2>
            <div className="overflow-x-auto bg-bg-card rounded-xl shadow-md border border-card-border">
                <table className="table w-full">
                    <thead className="bg-bg-body text-text-muted uppercase text-xs font-semibold">
                        <tr>
                            <th className="py-4">Name</th>
                            <th className="py-4">Email</th>
                            <th className="py-4">Current Role</th>
                            <th className="py-4 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-b border-card-border hover:bg-bg-body">
                                <td className="font-bold text-text-main">{user.name}</td>
                                <td className="text-text-muted">{user.email}</td>
                                <td>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider ${user.role === 'admin' ? 'bg-purple-100 text-purple-600' :
                                        user.role === 'librarian' ? 'bg-blue-100 text-blue-600' :
                                            'bg-bg-body text-text-muted'
                                        }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="text-right">
                                    <select
                                        value={user.role}
                                        onChange={(e) => handleRoleChange(user._id, e.target.value)}
                                        className="px-3 py-2 border border-card-border rounded-lg text-sm focus:ring-2 focus:ring-accent-gold outline-none bg-bg-body text-text-main font-medium"
                                    >
                                        <option value="user">User</option>
                                        <option value="librarian">Librarian</option>
                                        <option value="admin">Admin</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;
