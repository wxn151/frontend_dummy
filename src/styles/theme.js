// styles/theme.js
import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
    createTheme({
        palette: {
            mode,
            ...(mode === "light"
                ? {
                    primary: { main: "#7b1fa2" },
                    background: { default: "#fff", paper: "#f9f9f9" },
                }
                : {
                    primary: { main: "#ce93d8" },
                    background: { default: "#000000", paper: "#1d1d1d" },
                    //background: { default: "#121212", paper: "#1d1d1d" },
                }),
        },
        typography: {
            fontFamily: `'Fredoka', sans-serif`,
        },
    });
