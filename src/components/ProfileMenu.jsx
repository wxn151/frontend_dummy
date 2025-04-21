import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
    useTheme,
} from "@mui/material";
import { Edit, Logout } from "@mui/icons-material";
import { useState } from "react";
import { useThemeToggle } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

const ProfileControls = () => {
    const { mode, toggleTheme } = useThemeToggle();
    const theme = useTheme();
    const { user, logout } = useAuth();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleMenuOpen = (event) => setAnchorEl(event.currentTarget);
    const handleMenuClose = () => setAnchorEl(null);

    return (
        <Box
            sx={{
                position: "absolute",
                top: 16,
                right: 16,
                display: "flex",
                alignItems: "center",
                gap: 2,
            }}
        >
            {/* ICON */}
            <Tooltip title={`${user?.username ?? ""} (${user?.email ?? ""})`}>
                <IconButton onClick={handleMenuOpen}>
                    <Avatar src={user?.image || ""} alt={user?.username || "profile"} />
                </IconButton>
            </Tooltip>

            {/* MENU */}
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 180,
                        backgroundColor:
                            mode === theme.palette.grey[900],
                        color: theme.palette.text.primary,
                    },
                }}
            >
                <MenuItem
                    onClick={() => {
                        handleMenuClose();
                        logout();
                    }}
                >
                    <Logout fontSize="small" sx={{ mr: 1 }} /> Sign Out
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default ProfileControls;
