import axios from "axios";
// import useAuth from "./useAuth"; // Auth hook not available yet

const instance = axios.create({
    baseURL: "https://server-side-swart-nine.vercel.app",
});

const useAxiosSecure = () => {
    // const { user } = useAuth();

    instance.interceptors.request.use(async (config) => {
        // if (user) {
        //     // assuming user object has getIdToken method when authenticated
        //     const token = await user.getIdToken();
        //     config.headers.Authorization = `Bearer ${token}`;
        // }
        return config;
    });
    return instance;
};

export default useAxiosSecure;
