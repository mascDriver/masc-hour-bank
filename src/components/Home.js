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

function Home() {
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
        <Router>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <SnackbarProvider maxSnack={10}>
                    <ButtonAppBar colorMode={colorMode} theme={theme}/>
                    <Routes>
                        <Route path="/" element={<RenderHomePage/>}/>
                        <Route path="month" element={<AttendanceMonth/>}/>
                        <Route path="day" element={<AttendanceDay/>}/>
                        <Route path="signin" element={<SignIn/>}/>
                        <Route path="signup" element={<SignUp/>}/>
                    </Routes>
                    <StickyFooter/>
                </SnackbarProvider>
            </ThemeProvider>
        </Router>
    );
}

export default Home;
