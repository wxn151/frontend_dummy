import {
    Box,
    TextField,
    Button,
    Typography,
    Paper,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { isValidPassword } from "../utils/validators";
import { useParams } from "react-router-dom";
import { resetPassword } from "../services/auth";

const ResetPassword = () => {
    const { token } = useParams();
    const navigate = useNavigate();
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleReset = async () => {
        setError("");

        if (password !== confirm) {
            setError("Passwords do not match");
            return;
        }

        if (!isValidPassword(password)) {
            setError("Password must be 8+ chars, include uppercase and symbol");
            return;
        }

        try {
            await resetPassword(token, password);
            setSuccess(true);
        } catch (err) {
            setError("Invalid or expired token.");
        }
    };


    // Redirección después de éxito
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate("/");
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#121212",
                color: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 4,
                    bgcolor: "#1e1e1e",
                    color: "#fff",
                    maxWidth: 400,
                    width: "100%",
                    borderRadius: 2,
                }}
            >
                {success ? (
                    <>
                        <Typography variant="h6" align="center" gutterBottom>
                            ✅ Password reset!
                        </Typography>
                        <Typography variant="body2" align="center">
                            Redirecting to login...
                        </Typography>
                    </>
                ) : (
                    <>
                        <Typography variant="h6" mb={2}>
                            Reset your password
                        </Typography>

                        <TextField
                            label="New Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 2 }}
                            variant="filled"
                            InputProps={{ style: { color: "#fff" } }}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                        />

                        <TextField
                            label="Confirm Password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            value={confirm}
                            onChange={(e) => setConfirm(e.target.value)}
                            sx={{ mb: 1 }}
                            variant="filled"
                            InputProps={{ style: { color: "#fff" } }}
                            InputLabelProps={{ style: { color: "#aaa" } }}
                        />

                        <Button
                            onClick={() => setShowPassword((prev) => !prev)}
                            size="small"
                            sx={{ mt: 1 }}
                        >
                            {showPassword ? "Hide" : "Show"} Password
                        </Button>

                        {error && (
                            <Typography color="error" variant="caption" sx={{ display: "block", mb: 2 }}>
                                {error}
                            </Typography>
                        )}

                        <Button variant="contained" fullWidth onClick={handleReset}>
                            Reset Password
                        </Button>
                    </>
                )}
            </Paper>
        </Box>
    );
};

export default ResetPassword;
