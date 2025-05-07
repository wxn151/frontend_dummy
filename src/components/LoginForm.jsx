import {
    Box,
    Paper,
    TextField,
    Button,
    Link,
    Stack,
    IconButton,
    InputAdornment,
    Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import RegisterModal from "./RegisterModal";
import ForgotPasswordModal from "./ForgotPasswordModal";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const [openRegister, setOpenRegister] = useState(false);
    const [openForgot, setOpenForgot] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({ email: "", password: "" });
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState('');

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/Home");
        }
    }, [isAuthenticated]);

    const handleLogin = async () => {
        const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        const passValid = password.length >= 8;

        const warning = {
            email: emailValid ? "" : "Enter a valid email address",
            password: passValid ? "" : "Password must be 8+ chars",
        };
        setErrors(warning);
        if (!emailValid || !passValid) return;

        try {
            response = await login(email, password);

        } catch (error) {
            setLoginError('Invalid credentials');
        }
    };


    return (
        <Paper
            elevation={6}
            sx={{
                padding: 4,
                zIndex: 1,
                width: 430
            }}
        >
            <Typography variant="h5" align="center" mb={2}>
                Login
            </Typography>
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

                    <Button
                        variant="contained"
                        onClick={handleLogin}
                        sx={{
                            backgroundColor: "#000000",
                            color: "#ce93d8", // Text color
                            "&:hover": {
                                color: "#FF69B4",
                            },
                        }}
                    >
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

                {/* Logging error below the form */}
                {loginError && (
                    <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>
                        {loginError}
                    </Typography>
                )}

                <RegisterModal open={openRegister} onClose={() => setOpenRegister(false)} />
                <ForgotPasswordModal open={openForgot} onClose={() => setOpenForgot(false)} />
            </Box>
            <Typography
                variant="caption"
                align="center"
                display="block"
                mt={3}
                sx={{ color: "text.secondary", fontSize: "0.75rem" }}
            >
                © {new Date().getFullYear()} Made by Kirwan L. Albert.
            </Typography>
        </Paper>
        
    );
};

export default LoginForm;
