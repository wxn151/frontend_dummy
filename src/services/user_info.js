import axios from "axios";

const API = import.meta.env.VITE_RESTFUL;

export const userInfo = async (token) => {
    const res = await axios.get(`${API}/user/me`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return res.data;
};