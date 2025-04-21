import { createContext, useContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { getTheme } from "../styles/theme";

const ThemeToggleContext = createContext();

export const useThemeToggle = () => useContext(ThemeToggleContext);

export const CustomThemeProvider = ({ children }) => {
    const [mode, setMode] = useState("dark");

    const theme = useMemo(() => getTheme(mode), [mode]);

    const toggleTheme = () =>
        setMode((prev) => (prev === "light" ? "dark" : "light"));

    return (
        <ThemeToggleContext.Provider value={{ toggleTheme, mode }}>
            <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </ThemeToggleContext.Provider>
    );
};
