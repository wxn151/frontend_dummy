import React from "react";
import { Box, Typography } from "@mui/material";

const NotFound = () => {
    return (
        <Box
            height="100vh"
            bgcolor="#121212"
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            color="#fff"
            textAlign="center"
            px={2}
        >
            <Typography variant="h3" gutterBottom>
                404 - Page Not Found
            </Typography>

            <Typography variant="body1" gutterBottom>
                Oops! The page you're looking for doesn't exist.
            </Typography>

            <Box
                component="img"
                src="/404.gif"
                alt="Not Found"
                sx={{ mt: 4, width: "300px", maxWidth: "100%" }}
            />
        </Box>
    );
};

export default NotFound;
