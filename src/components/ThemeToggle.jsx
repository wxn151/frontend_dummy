import { IconButton, useTheme } from "@mui/material";
import { LightMode, DarkMode } from "@mui/icons-material";
import { useThemeToggle } from "../context/ThemeContext";

export default function ThemeToggle() {
    const { toggleTheme } = useThemeToggle();
    const theme = useTheme();

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            {theme.palette.mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
    );
}
