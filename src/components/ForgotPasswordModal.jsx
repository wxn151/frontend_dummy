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

    useEffect(() => {
        if (!open) {
            setLoading(false);
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
            await forgotPassword(email);
            setSent(true);
        } catch (err) {
            increment();
            setError(
                err?.response?.data?.detail || "Error sending reset link. Try again later."
            );
        } finally {
            setLoading(false);
        }
    };

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
                                ✅ An email with a recovery link (if you have a register account) has been sent to: <strong>{email}</strong>
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
                                    onClick={handleSend}
                                    variant="contained"
                                    color="primary"
                                    sx={{ mt: 2 }}
                                    disabled={loading}
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
