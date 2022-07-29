import React from 'react';
import {BrowserRouter as Router, Route, Routes, Link} from "react-router-dom";
import AttendanceMonth from "./AttendanceMonth";
import RenderHomePage from "./RenderHomePage";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import ButtonAppBar from "./ButtonAppBar";
import StickyFooter from "./StickyFooter";
import AttendanceDay from "./AttendanceDay";

function Home() {
    return (
        <Router>
            <ButtonAppBar/>
            <Routes>
                <Route path="/" element={<RenderHomePage/>}/>
                <Route path="month" element={<AttendanceMonth/>}/>
                <Route path="day" element={<AttendanceDay/>}/>
                <Route path="signin" element={<SignIn/>}/>
                <Route path="signup" element={<SignUp/>}/>
            </Routes>
            <StickyFooter/>
        </Router>
    );
}

export default Home;
