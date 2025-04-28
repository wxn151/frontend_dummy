import {
    Box,
    IconButton,
    Menu,
    MenuItem,
    Avatar,
    Tooltip,
} from "@mui/material";
import { Edit, Logout } from "@mui/icons-material";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ProfileControls = () => {
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
            }}
        >
            <Tooltip title={user?.email ?? ""}>
                <IconButton onClick={handleMenuOpen}>
                    <Avatar alt={user?.username || "profile"} />
                </IconButton>
            </Tooltip>

            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                PaperProps={{
                    sx: {
                        mt: 1,
                        minWidth: 160,
                        backgroundColor: "background.paper", // Adjusted color
                        color: "text.primary", // Adjusted text color
                    },
                }}
            >
                <MenuItem onClick={logout}>
                    <Logout fontSize="small" sx={{ mr: 1 }} /> Sign Out
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default ProfileControls;
