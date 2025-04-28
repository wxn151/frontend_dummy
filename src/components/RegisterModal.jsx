import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    Typography,
    IconButton
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState, useEffect } from "react";
import Captcha from "./Captcha";
import { registerRequest } from "../services/auth";

const RegisterModal = ({ open, onClose }) => {
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setError] = useState({});
    const [error, setHTTPError] = useState({});
    const [captchaValid, setCaptchaValid] = useState(false);
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const [smtp, setSmtp] = useState(false) 

    useEffect(() => {
        if (!open) {
            // Reset form when closing
            setEmail("");
            setSmtp("");
            setSent(false);
            setLoading(false);
            setUsername("");
            setHTTPError("")
            setPassword("");
            setConfirmPassword("");
            setError({});
            setCaptchaValid(false);
        }
    }, [open]);

    const validate = () => {
        const warning = {};

        // Email
        if (!/\S+@\S+\.\S+/.test(email)) {
            warning.email = "Invalid email address";
        }

        // Username
        if (!/^[a-zA-Z0-9._-]{4,30}$/.test(username)) {
            warning.username = "4–30 chars, no special characters (except . - _)";
        }

        // Password
        if (
            password.length < 8 ||
            !/[A-Z]/.test(password) ||
            !/[!@#$%^&*(),.?":{}|<>]/.test(password)
        ) {
            warning.password =
                "At least 8 chars, one uppercase, one special character";
        }

        setError(warning);
        return Object.keys(warning).length === 0;
    };

    const handleRegister = async () => {
        setLoading(true); // waiting the petition finish
        if (validate() && captchaValid) {
            try {
                const data = await registerRequest(email, username, password);
                setSent(true);
                setSmtp(data.smtp != "deactivate");
            } catch (err) {
                setHTTPError(
                    err?.response?.data?.detail || "The email or username already exist... please use another"
                );
            } finally {
                setLoading(false);
            }
        }
        else {
            setLoading(false)
        }
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth PaperProps={{
            sx: {
                bgcolor: "#121212",
                color: "#fff",
                borderRadius: 2,
                width: 500,
                p: 2
            },
        }}>
            <DialogTitle>
                Create Account
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "#aaa",
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    {sent ? (
                        smtp ? (
                            <Typography sx={{ mt: 2 }}>
                                ✅ An email with the activation link (check in your SPAM) has been sent to: <strong>{email}</strong>
                            </Typography>
                        ) : (
                            <Typography sx={{ mt: 2 }}>
                                ✅ Your account was successfully activated!
                            </Typography>
                        )
                    ) : (
                        <>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!errors.email}
                                helperText={errors.email}
                                variant="filled"
                                InputProps={{ style: { color: "#fff" } }}
                                InputLabelProps={{ style: { color: "#aaa" } }}
                            />

                            <Box>
                                <Typography variant="caption" color="textSecondary">
                                    Username (4–30 chars, no special characters except - _ .)
                                </Typography>
                                <TextField
                                    label="Username"
                                    fullWidth
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    error={!!errors.username}
                                    helperText={errors.username}
                                    variant="filled"
                                    InputProps={{ style: { color: "#fff" } }}
                                    InputLabelProps={{ style: { color: "#aaa" } }}
                                />
                            </Box>

                            <Box>
                                <Typography variant="caption" color="textSecondary">
                                    Password (min 8 chars, 1 uppercase, 1 special character)
                                </Typography>
                                <TextField
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    error={!!errors.password}
                                    helperText={errors.password}
                                    variant="filled"
                                    InputProps={{ style: { color: "#fff" } }}
                                    InputLabelProps={{ style: { color: "#aaa" } }}
                                    sx={{ mt: 1 }}
                                />
                                <TextField
                                    label="Confirm Password"
                                    type={showPassword ? "text" : "password"}
                                    fullWidth
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword}
                                    variant="filled"
                                    InputProps={{ style: { color: "#fff" } }}
                                    InputLabelProps={{ style: { color: "#aaa" } }}
                                    sx={{ mt: 2 }}
                                />
                                <Button
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    size="small"
                                    sx={{ mt: 1 }}
                                >
                                    {showPassword ? "Hide" : "Show"} Password
                                </Button>
                            </Box>

                            <Captcha onValidate={(valid) => setCaptchaValid(valid)} />

                            {error && (
                                <Typography color="error" textAlign="center" sx={{ mt: 1 }}>
                                    {typeof error === "string" ? error : JSON.stringify(error)}
                                </Typography>
                            )}

                            <Button
                                variant="contained"
                                onClick={handleRegister}
                                disabled={!captchaValid || loading}
                                sx={{
                                    backgroundColor: "#000000",
                                    color: "#ce93d8", // Text color
                                    "&:hover": {
                                        color: "#FF69B4", // Darker on hover
                                    },
                                }}
                            >
                                {loading ? "Sending..." : "Register"}
                            </Button>
                        </>
                    )}
                </Box>
            </DialogContent>
        </Dialog>
    );
};

export default RegisterModal;
