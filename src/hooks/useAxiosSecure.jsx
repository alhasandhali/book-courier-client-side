import axios from "axios";
import useAuth from "./useAuth";
import { useMemo } from "react";
import { useNavigate } from "react-router";

const useAxiosSecure = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    const axiosSecure = useMemo(() => {
        const instance = axios.create({
            baseURL: "https://server-side-swart-nine.vercel.app",
        });

        instance.interceptors.request.use(async (config) => {
            if (user) {
                const token = await user.getIdToken();
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        }, (error) => Promise.reject(error));

        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const status = error.response ? error.response.status : null;
                if (status === 401 || status === 403) {
                    //navigate('/login');
                }
                return Promise.reject(error);
            }
        );

        return instance;
    }, [user, navigate]);

    return axiosSecure;
};

export default useAxiosSecure;
