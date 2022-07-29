import {useMemo, useState} from "react";

import "@fontsource/roboto"; // Loading Roboto font. MUI was designed with this font in mind.
import {Container, CssBaseline, IconButton,} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";

import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

function ToggleDarkMode() {
    const [mode, setMode] = useState('light');
    const colorMode = useMemo(
        () => ({
            ToggleDarkMode: () => {
                setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
            },
        }),
        [],
    );

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                },
            }),
        [mode],
    );

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <Container>
                <IconButton sx={{ml: 1}} onClick={colorMode.ToggleDarkMode} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon/> : <Brightness4Icon/>}
                </IconButton>
            </Container>
        </ThemeProvider>
    );
}

export default ToggleDarkMode;