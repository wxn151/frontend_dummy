import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { confirmRequest } from "../services/auth";
import { Box, Typography, CircularProgress } from "@mui/material";
import { useLocation } from "react-router-dom";

const ConfirmEmail = () => {

    const location = useLocation();
    // fetch the TOKEN
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    const navigate = useNavigate();
    const [message, setMessage] = useState("Validating your email...");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const confirm = async () => {
            try {
                const response = await confirmRequest(token);
                setMessage(response.msg || "Your email has been confirmed!");
            } catch (err) {
                setMessage(
                    err?.response?.data?.detail || "Invalid or expired token."
                );
            } finally {
                setLoading(false);
                setTimeout(() => navigate("/"), 4000); // redirect after 4 seconds
            }
        };

        confirm();
    }, [token, navigate]);

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            minHeight="100vh"
            bgcolor="background.default"
            color="text.primary"
        >
            <Box
                sx={{
                    p: 4,
                    borderRadius: 3,
                    backgroundColor: "#1e1e1e",
                    boxShadow: "0 0 10px rgba(255,255,255,0.1)",
                    textAlign: "center",
                    maxWidth: 400,
                }}
            >
                {loading ? (
                    <CircularProgress color="primary" />
                ) : (
                    <Typography variant="h6">{message}</Typography>
                )}
            </Box>
        </Box>
    );
};

export default ConfirmEmail;
