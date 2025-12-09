import axios from "axios";

const instance = axios.create({
    baseURL: "https://server-side-swart-nine.vercel.app",
});

const useAxios = () => {
    return instance;
};

export default useAxios;