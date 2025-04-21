import {
    Box,
    TextField,
    Button,
    Link,
    Stack,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { loginRequest } from "../services/auth";

const LoginForm = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const [openForgot, setOpenForgot] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async () => {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passValid = password.length >= 8;

        const newErrors = {
            email: emailValid ? "" : "Enter a valid email address",
            password: passValid ? "" : "Password must be 8+ chars",
        };
        setErrors(newErrors);
        if (!emailValid || !passValid) return;

        try {
            // fetch the data.token
            const token = await loginRequest(email, password);
            login(token);
            navigate("/Home");
        } catch (err) {
            setErrors((prev) => ({
                ...prev,
                password: err.message || "Login failed",
            }));
        }
    };


    return (
        <Box>
            <Stack spacing={2}>
                <TextField
                    fullWidth
                    label="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />

                <TextField
                    fullWidth
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowPassword((show) => !show)}
                                    edge="end"
                                    sx={{ color: "#ce93d8" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Button variant="contained" onClick={handleLogin}>
                    Login
                </Button>

                <Stack direction="row" justifyContent="space-between">
                    <Link component="button" onClick={() => setOpenRegister(true)}>
                        Register
                    </Link>
                    <Link component="button" onClick={() => setOpenForgot(true)}>
                        Forgot Password?
                    </Link>
                </Stack>
            </Stack>

            <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
            <ForgotPasswordModal open={openForgot} onClose={() => setOpenForgot(false)} />
        </Box>
    );
};

export default LoginForm;
