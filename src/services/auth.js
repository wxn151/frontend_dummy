import apiClient from './apiClient';


// LOGGING
export const loginRequest = async (email, password) => {
    try {
        const response = await apiClient.post("/auth/login", { email, password });
        return response.data.access_token;

    } catch (error) {
        console.error("Login failed:", error.response ? error.response.data : error.message);
        throw error;
    }
};

// RESET PASSWORD (mail / pass)
export const forgotPassword = async (email) => {
    const response = await apiClient({
        url: "/auth/forgot-password",
        method: "POST",
        data: { email },
    });
    return response;
};

export const resetPassword = async (token, newPassword) => {
    const response = await apiClient({
        url: "/auth/reset-password",
        method: "POST",
        data: {
            token,
            new_password: newPassword,
        },
    });
    return response;
};

// ACCOUNT (register / confirm)
export const registerRequest = async (email, username, password) => {
    const response = await apiClient({
        url: "/auth/register",
        method: "POST",
        data: { email, username, password },
    });
    return response;
};

export const confirmRequest = async (token) => {
    const response = await apiClient({
        url: "/auth/confirm-email",
        method: "POST",
        data: { token },
    });
    return response;
};

// FETCH USER
export const userInfo = async () => {
    try {
        const response = await apiClient.get("/user/me", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token") }`,
            },
        });
        return response.data;
    } catch (error) {
        const err = error?.response?.data;
        throw new Error(err?.detail || "Failed to fetch user");
    }
};

// REFRESH TOKEN
export const refreshTokenRequest = async () => {
    try {
        const response = await apiClient.post("/auth/refresh", {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });
        return response.data.accessToken;
    } catch (error) {
        const err = error?.response?.data;
        throw new Error(err?.detail || "Failed to fetch token");
    }

};