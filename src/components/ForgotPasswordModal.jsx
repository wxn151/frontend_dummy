import {
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    Button,
    Box,
    Typography,
    IconButton,
    Slide,
} from "@mui/material";
import { useState, useEffect, forwardRef } from "react";
import CloseIcon from "@mui/icons-material/Close";
import useAttemptCounter from "../hooks/useAttemptCounter";
import { forgotPassword } from "../services/auth";
// ...
import Captcha from "./Captcha";
import { useNavigate } from 'react-router-dom';

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ForgotPasswordModal = ({ open, onClose }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [captchaValid, setCaptchaValid] = useState(false);
    const [sent, setSent] = useState(false);
    const { attempts, increment, reset } = useAttemptCounter();
    const [loading, setLoading] = useState(false);
    const [smtp, setSmtp] = useState(false)
    const [cache, setCache] = useState("")

    useEffect(() => {
        if (!open) {
            setLoading(false);
            setSmtp("");
            setEmail("");
            setError("");
            setCaptchaValid(false);
            setSent(false);
            reset();
        }
    }, [open]);
        
    const handleSend = async () => {
        setLoading(true);
        setError("");
        const isValid = /\S+@\S+\.\S+/.test(email);
        if (!isValid) {
            setError("Enter a valid email");
            increment();
            setLoading(false);
            return;
        }

        if (attempts >= 3 && !captchaValid) {
            setError("Please solve the captcha");
            setLoading(false);
            return;
        }

        try {
            const data = await forgotPassword(email);
            setSent(true);
            setCache(data.message);
            setSmtp(data.smtp = "deactivate");
        } catch (err) {
            increment();
            setError(
                err?.response?.data?.detail || "Error sending reset link. Try again later."
            );
        } finally {
            setLoading(false);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        if (sent && smtp) {
            navigate(cache); // REDIRECTION to reset password route
        }
    }, [sent, smtp, navigate, cache]);


    return (
        <Dialog
            open={open}
            onClose={onClose}
            TransitionComponent={Transition}
            fullWidth
            maxWidth="xs"
            PaperProps={{
                sx: {
                    bgcolor: "#121212",
                    color: "#fff",
                    borderRadius: 2,
                    p: 2,
                },
            }}
        >
            <DialogTitle>
                Recover Password
                <IconButton
                    onClick={onClose}
                    sx={{ position: "absolute", right: 8, top: 8, color: "#aaa" }}
                >
                    <CloseIcon />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <Box display="flex" flexDirection="column" gap={2}>
                    {sent ? (
                        <Typography sx={{ mt: 2 }}>
                            ✅ An email with a recovery link (if you have a registered account) has been sent to: <strong>{email}</strong>
                        </Typography>
                    ) : (
                        <>
                            <TextField
                                label="Email"
                                type="email"
                                fullWidth
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                error={!!error}
                                helperText={error}
                                variant="filled"
                                InputProps={{ style: { color: "#fff" } }}
                                InputLabelProps={{ style: { color: "#aaa" } }}
                            />

                            {attempts >= 3 && (
                                <Captcha onValidate={(valid) => setCaptchaValid(valid)} />
                            )}

                                <Button
                                    variant="contained"
                                    onClick={handleSend}
                                    disabled={loading}
                                    sx={{
                                        backgroundColor: "#000000",
                                        color: "#ce93d8", // Text color
                                        "&:hover": {
                                            color: "#FF69B4", // Darker on hover
                                        },
                                    }}
                                >
                                    {loading ? "Sending..." : "Send Recovery Email"}
                                </Button>
                        </>
                    )}
                </Box>
            </DialogContent>

        </Dialog>
    );
};

export default ForgotPasswordModal;
