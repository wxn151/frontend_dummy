import { Box, useTheme } from "@mui/material";

const MainLayout = ({ children }) => {
    const theme = useTheme();

    const stars = Array.from({ length: 60 }, (_, i) => ({
        id: i,
        top: Math.random() * 1200,
        left: Math.random() * 100,
        size: Math.random() * 3 + 2,
        duration: Math.random() * 3 + 2,
    }));

    return (
        <Box
            sx={{
                position: "relative",
                minHeight: "100vh",
                backgroundColor: theme.palette.background.default,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                overflow: "hidden",
                padding: "32px 0",
            }}
        >

            {/* Animation */}
            {stars.map((star) => (
                <Box
                    key={star.id}
                    sx={{
                        position: "absolute",
                        top: `${star.top}px`,
                        left: `${star.left}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        borderRadius: "50%",
                        //backgroundColor: theme.palette.mode === "dark" ? "#fdd835" : "#2196f3",
                        backgroundColor: "#fdd835",
                        animation: `twinkle ${star.duration}s ease-in-out infinite`,
                    }}
                />
            ))}

            <Box
                sx={{
                    width: "100%",
                    px: { xs: 2, sm: 4 }, // padding RESPONSIVE
                    maxWidth: { xs: "100%", sm: "90%", md: "80%", lg: "60%" },
                    mx: "auto",
                    zIndex: 1,
                }}
            >
                {children}
            </Box>


            <style>
                {`
                @keyframes twinkle {
                    0% { transform: scale(1); opacity: 1; }
                    50% { transform: scale(0.6); opacity: 0.4; }
                    100% { transform: scale(1); opacity: 1; }
                }
                `}
            </style>
        </Box>
    );
};

export default MainLayout;
