import React from 'react'
import { Routes, Route } from "react-router-dom";
import About from '../components/About';
import Home from '../components/Home';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/About" element={<About />} />
            </Routes>
        </>
    )
}

export default AppRoutes
