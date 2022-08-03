import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import AttendanceMonth from "./AttendanceMonth";
import RenderHomePage from "./RenderHomePage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ButtonAppBar from "./ButtonAppBar";
import StickyFooter from "./StickyFooter";
import AttendanceDay from "./AttendanceDay";
import {SnackbarProvider} from "notistack";

function Home() {
    return (
        <Router>
            <SnackbarProvider maxSnack={10}>
                <ButtonAppBar/>
                <Routes>
                    <Route path="/" element={<RenderHomePage/>}/>
                    <Route path="month" element={<AttendanceMonth/>}/>
                    <Route path="day" element={<AttendanceDay/>}/>
                    <Route path="signin" element={<SignIn/>}/>
                    <Route path="signup" element={<SignUp/>}/>
                </Routes>
                <StickyFooter/>
            </SnackbarProvider>
        </Router>
    );
}

export default Home;
