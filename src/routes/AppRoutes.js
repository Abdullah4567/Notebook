import React from 'react'
import { Routes, Route } from "react-router-dom";
import About from '../components/About';
import Error from '../components/Error';
import Home from '../components/Home';

const AppRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/About" element={<About />} />
                <Route exact path="*" element={<Error />} />
                {/* for route not found use '*' */}
            </Routes>
        </>
    )
}

export default AppRoutes
