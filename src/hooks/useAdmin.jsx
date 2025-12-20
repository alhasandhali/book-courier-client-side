import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useAdmin = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isAdmin, isPending: isAdminLoading } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        queryFn: async () => {
            if (!user?.email) return false;
            const res = await axiosSecure.get(`/user/email/${user.email}`);
            return res.data?.role === 'admin';
        },
        enabled: !loading && !!user?.email
    });

    return [isAdmin, isAdminLoading];
};

export default useAdmin;
