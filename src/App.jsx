import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Aboutus from "./Pages/Aboutus/Aboutus.jsx";
import Contactus from "./Pages/Contactus/Contactus.jsx";
import Services from "./Pages/Services/Services.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import NoMatchRoute from "./Pages/NoRoute/NoRoute.jsx";
import Footer from "./Footer/Footer.jsx";
import Career from "./Pages/Career/Career.jsx";
import Login from "./Pages/Login/Login.jsx";
import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import ProtectedRoutes from "./Context/ProtectedRoutes.jsx";
import Resources from "./Pages/Resources/Resources.jsx";
import Appliedusers from "./Pages/Career/Appliedusers/Appliedusers.jsx";
import AccessResources from "./Pages/AccessResources/AccessResources.jsx";
import AccessNotices from "./Pages/AccessNotices/AccessNotices.jsx";
import ScrollToTop from "./Components/ScrollTop.jsx";

const App = () => {
    return (
        <AuthContextProvider>
            <Navbar />
            <ScrollToTop />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Aboutus />} />
                <Route path="/contact" element={<Contactus />} />
                <Route path="/services" element={<Services />} />
                <Route path="/careers" element={<Career />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/login" element={<Login />} />
                <Route path="/access-resources" element={<AccessResources />} />
                <Route path="/access-notices" element={<AccessNotices />} />
                <Route path="*" element={<NoMatchRoute />} />

                <Route element={<ProtectedRoutes />}>
                    <Route path="/applied-users" element={<Appliedusers />} />
                </Route>
            </Routes>
            <Footer />
        </AuthContextProvider>
    );
};

export default App;
