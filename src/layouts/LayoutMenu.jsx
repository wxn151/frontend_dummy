import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const LayoutMenu = ({ currentTab, setCurrentTab }) => {
    const menuItems = ["Articles", "Favorites"];

    return (
        <MotionBox
            sx={{
                display: "flex",
                justifyContent: "center",
                gap: 8,
                mb: 2,
            }}
        >
            {menuItems.map((item) => (
                <MotionBox
                    key={item}
                    onClick={() => setCurrentTab(item)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    sx={{
                        cursor: "pointer",
                        position: "relative",
                        padding: "0.5rem 1rem",
                    }}
                >
                    <Typography
                        variant="subtitle1"
                        fontWeight={500}
                        sx={{
                            color: currentTab === item ? "text.primary" : "text.secondary",
                            transition: "color 0.2s ease",
                        }}
                    >
                        {item}
                    </Typography>

                    {/* Animated underline */}
                    <motion.div
                        style={{
                            position: "absolute",
                            left: 0,
                            bottom: -4,
                            height: "2px",
                            width: currentTab === item ? "100%" : "0%",
                            backgroundColor: "#ce93d8",
                        }}
                        animate={{
                            width: currentTab === item ? "100%" : "0%",
                        }}
                        transition={{ stiffness: 300 }}
                    />
                </MotionBox>
            ))}
        </MotionBox>
    );
};

export default LayoutMenu;
