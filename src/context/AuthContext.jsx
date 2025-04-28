import { createContext, useContext, useState, useEffect } from "react";
import { loginRequest, userInfo } from "../services/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [tokenExpiry, setTokenExpiry] = useState(Number(localStorage.getItem("tokenExpiry")) || 0);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!token;

    useEffect(() => {
        if (!token) {
            setLoading(false);
            return;
        }

        const loadUser = async () => {
            try {
                const data = await userInfo();
                setUser(data);
            } catch (error) {
                console.error("Failed to load user", error);
                logout();
            } finally {
                setLoading(false);
            }
        };

        loadUser();
    }, [token]);

    useEffect(() => {
        const interval = setInterval(() => {
            refreshSession();
        }, 60000); // Check every 1 minute

        return () => clearInterval(interval); // Clean up on unmount
    }, [token, tokenExpiry]);

    const login = async (email, password) => {
        try {
            const accessToken = await loginRequest(email, password);
            setTokenWithExpiry(accessToken, 20);
            setToken(accessToken);
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    const setTokenWithExpiry = (token, expiresInMinutes) => {
        const currentTime = new Date().getTime();
        const expiryTime = currentTime + expiresInMinutes * 60 * 1000;
        localStorage.setItem("token", token);
        localStorage.setItem("tokenExpiry", expiryTime.toString());
        setTokenExpiry(expiryTime);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("tokenExpiry");
        setUser(null);
        setToken("");
        setTokenExpiry(0);
    };

    const refreshSession = async () => {
        if (!tokenExpiry) {
            logout();
            return;
        }

        const now = Date.now();

        if (now > tokenExpiry) {
            console.log("Token expired. Logging out.");
            logout();
        } else if (now > tokenExpiry - 5 * 60 * 1000) {
            // Less than 5 minutes left -> Refresh
            try {
                console.log("Refreshing token...");
                const newAccessToken = await refreshTokenRequest();
                setTokenWithExpiry(newAccessToken, 20);
                setToken(newAccessToken);
            } catch (error) {
                console.error("Failed to refresh token:", error);
                logout();
            }
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, token, login, logout, isAuthenticated, loading }}>
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {
    return useContext(AuthContext);
};
