import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../components/LoginForm";
import ThemeToggle from "../components/ThemeToggle";        

const generateStars = (count = 60, faded = 400) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * faded,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2, // entre 2 y 6px
        duration: Math.random() * 2 + 2, // entre 1.5s y 3.5s
    }));
};

const yellow_stars = generateStars(66, 700, 70);


const Login = () => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
            }}
        >
            <Box
                component="img"
                src= "/8bit_night.jpg"
                alt="Decorative"
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "2000px",
                    height: "1800px",
                    pointerEvents: "none",
                }}
            />


            {yellow_stars.map((star) => (
                <Box
                    key={star.id}
                    sx={{
                        position: "absolute",
                        top: `${star.top}px`,
                        left: `${star.left}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        borderRadius: "50%",
                        backgroundColor: "#fdd835", 
                        animation: `twinkle ${star.duration}s ease-in-out infinite`,
                    }}
                />
            ))}
            
            <style>
                {`
                @keyframes twinkle {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(0.6); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>

            {/* Box para el login */}
            <Paper
                elevation={6}
                sx={{
                    padding: 4,
                    width: 360,
                    zIndex: 1,
                }}
            >
                <Typography variant="h5" align="center" mb={2}>
                    Login
                </Typography>
                <LoginForm />

                <Typography
                    variant="caption"
                    align="center"
                    display="block"
                    mt={3}
                    sx={{ color: "text.secondary", fontSize: "0.75rem" }}
                >
                    © {new Date().getFullYear()} Behemoth System. All rights reserved.
                </Typography>
            </Paper>
        </Box>
    );
};

export default Login;
