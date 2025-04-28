import { useState } from "react";
import { Box, Button, TextField, IconButton } from "@mui/material";
import { motion } from "framer-motion";

const MotionButton = motion(Button);

const SearchBox = ({ 
    onSearchByDate, 
    onSearchRandom

}) => {
    const [selectedDate, setSelectedDate] = useState("");

    const handleDateChange = (e) => {
        setSelectedDate(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (selectedDate) {
            onSearchByDate(selectedDate);
        }
    };

    const handleRandomClick = () => {
        onSearchRandom();
    };

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 1.5,
                flexWrap: "wrap",
            }}
        >
            {/* Date Picker */}
            <TextField
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={selectedDate}
                onChange={handleDateChange}
                sx={{
                    minWidth: 150,
                    backgroundColor: "background.paper",
                    "& .MuiInputBase-root": {
                        height: 44,
                    },
                }}
            />

            {/* Search Button */}
            <MotionButton
                type="submit"
                variant="outlined"
                color="primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                    height: 40,
                    textTransform: "none",
                    px: 2,
                }}
            >
                Search
            </MotionButton>

            {/* Random Button */}
            <MotionButton
                onClick={handleRandomClick}
                variant="outlined"
                color="primary"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                sx={{
                    height: 40,
                    textTransform: "none",
                    px: 2,
                }}
            >
                Random
            </MotionButton>


        </Box>
    );
};


export default SearchBox;
