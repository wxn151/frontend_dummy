import { Box, Typography, Paper } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import LoginForm from "../components/LoginForm";

const showStars = (count = 60, faded = 400) => {
    return Array.from({ length: count }, (_, i) => ({
        id: i,
        top: Math.random() * faded,
        left: Math.random() * 100,
        size: Math.random() * 4 + 2, 
        duration: Math.random() * 2 + 2,
    }));
};

const yellow_stars = showStars(66, 700, 70);


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
                src="/8bit_night.jpg"
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

            {/* star css */}
            <style>
                {`
                @keyframes twinkle {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(0.6); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
            <LoginForm />

        </Box>
    );
};

export default Login;