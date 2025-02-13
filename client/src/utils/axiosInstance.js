import axios from "axios";

const instance = axios.create({
    baseURL: "http://localhost:5000", 
    headers: {
        "Content-Type": "application/json",
    },
});

// Interceptor to add authorization token
instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default instance;
