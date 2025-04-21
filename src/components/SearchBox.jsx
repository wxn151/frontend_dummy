import { Box, Button, TextField } from "@mui/material";
import { useState } from "react";

const SearchBox = ({ onSearchByDate, onSearchRandom }) => {
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

    return (
        <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}
        >
            <TextField
                type="date"
                label="Search by Date"
                InputLabelProps={{ shrink: true }}
                value={selectedDate}
                onChange={handleDateChange}
                sx={{ minWidth: 200 }}
            />
            <Button type="submit" variant="contained" color="secondary">
                Search
            </Button>
            <Button onClick={onSearchRandom} variant="outlined" color="primary">
                Random Article
            </Button>
        </Box>
    );
};

export default SearchBox;
