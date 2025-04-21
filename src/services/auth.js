import axios from "axios";

const API = import.meta.env.VITE_RESTFUL;


// LOGGING

export const loginRequest = async (email, password) => {
    try {
        const response = await axios.post(`${API}/auth/login`, {
            email,
            password,
        });
        return response.data.access_token;
    } catch (error) {
        const err = error?.response?.data;
        throw new Error(err?.detail || "Login failed");
    }
};


// RESET PASWORD

export const forgotPassword = async (email) => {
    try {
        const response = await axios.post(`${API}/auth/forgot-password`, {
            email: email,
        });
        return response.data;
    } catch (error) {
        const err = error?.response?.data;
        throw new Error(err?.detail || "Cannot send mail");
    }
};


export const resetPassword = async (token, newPassword) => {
    const res = await axios.post(`${API}/auth/reset-password`, {
        token,
        new_password: newPassword,
    });
    return res.data;
};


export const confirmRequest = async (token) => {
    const res = await axios.post(`${API}/auth/confirm-email`, { token });
    return res.data;
};


// CREATE ACCOUNT

export const registerRequest = async (email, username, password) => {
    try {
        const response = await axios.post(`${API}/auth/register`, {
            email,
            username,
            password,
        });
        return response.data;
    } catch (error) {
        const err = error?.response?.data;
        throw new Error(err?.detail || "The mail wasn't sent or user already exists");
    }
};

