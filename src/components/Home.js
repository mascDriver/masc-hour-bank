import React, {useMemo, useState} from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import AttendanceMonth from "./AttendanceMonth";
import RenderHomePage from "./RenderHomePage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ButtonAppBar from "./ButtonAppBar";
import StickyFooter from "./StickyFooter";
import AttendanceDay from "./AttendanceDay";
import {SnackbarProvider} from "notistack";
import {CssBaseline} from "@mui/material";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import {blueGrey, deepOrange, orange} from '@mui/material/colors';
import useMediaQuery from '@mui/material/useMediaQuery';
import {ConfirmProvider} from "material-ui-confirm";
import {fetchToken} from '../push-notification';


function Home() {
    const [mode, setMode] = useState('light');
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    React.useEffect(() => {
        setMode(prefersDarkMode ? 'dark' : 'light')
        fetchToken()
    }, [])

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
                    background: {
                        default: mode === 'light' ? orange[50] : blueGrey[800],
                    },
                    primary: {
                        main: deepOrange[900],
                        darker: deepOrange['A700'],
                    },
                    secondary: {
                        main: deepOrange['A700'],
                    },
                },
                typography: {
                    button: {
                        textTransform: 'none'
                    }
                },
            }),
        [mode],
    );
    return (
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <SnackbarProvider maxSnack={10}>
                    <ConfirmProvider>
                        <ButtonAppBar colorMode={colorMode} theme={theme}/>
                        <Routes>
                            <Route path="/" element={<RenderHomePage/>}/>
                            <Route path="month" element={<AttendanceMonth/>}/>
                            <Route path="day" element={<AttendanceDay/>}/>
                            <Route path="signin" element={<SignIn/>}/>
                            <Route path="signup" element={<SignUp/>}/>
                        </Routes>
                        <StickyFooter/>
                    </ConfirmProvider>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    );
}

export default Home;
