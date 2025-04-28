import apiClient from './apiClient';

export const getArticles = async (token) => {
    if (!token) throw new Error("No token provided");
    try {
        const response = await apiClient.get(`/articles`, {
            headers: { Authorization: `Bearer ${token}` },
        });
        const data = response.data;
        return Array.isArray(data)
            ? { articles: data, total: data.length }
            : { articles: data.articles || [], total: data.total || 0 };
    } catch (err) {
        console.error("Error deleting article:", err);
        throw new Error(err.response?.data?.detail);
    }
};

export const unlikeArticle = async (Id, status, token) => {
    if (!token) throw new Error("No token provided");
    if (!Id) throw new Error("No article ID provided");

    try {
        const response = await apiClient.put(
            `/articles/${Id}`,
            { status: status },
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (err) {
        console.error("Error editing article:", err);
        throw new Error(err.response?.data?.detail);
    }
};

export const createArticle = async (articleData, token) => {
    if (!token) throw new Error("No token provided");
    if (!articleData) throw new Error("No article provided");

    try {
        const response = await apiClient.post(
            `/articles`,
            articleData,
            { headers: { Authorization: `Bearer ${token}` } }
        );
        return response.data;
    } catch (err) {
        console.error("Error creating article:", err);
        throw new Error(err.response?.data?.detail || "Error creating article");
    }
};