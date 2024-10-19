import axios from "../utils/api";

const API_URL = "/api/auth";

const login = (credentials) => {
    return axios.post(`${API_URL}/login`, credentials);
};

const logout = () => {
    // Implement logout logic, e.g., removing tokens
    return axios.post(`${API_URL}/logout`);
};

// Add other auth-related API calls if needed

export default {
    login,
    logout,
};
