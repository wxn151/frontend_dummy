import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { getTheme } from '../styles/theme';

const CustomThemeProvider = ({ children }) => {
    const theme = getTheme();

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            {children}
        </ThemeProvider>
    );
};

export default CustomThemeProvider;