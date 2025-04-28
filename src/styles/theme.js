import { createTheme } from '@mui/material/styles';

export const getTheme = () =>
    createTheme({
        palette: {
            mode: 'dark',
            primary: { main: '#ce93d8' }, /*FF69B4*/
            background: { default: '#000000', paper: '#1d1d1d' },
        },
        typography: {
            fontFamily: `'Fredoka', sans-serif`,
        },
    });

