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
import TransitionWrapper from "./Transitionwrapper/TransitionWrapper.jsx";
import Career from "./Pages/Career/Career.jsx";
import Login from "./Pages/Login/Login.jsx"
import AuthContextProvider from "./Context/AuthContextProvider.jsx";
import Logout from "./Pages/Logout/Logout.jsx";
import ProtectedRoutes from "./Context/ProtectedRoutes.jsx";
import Resources from "./Pages/NoRoute/Resources/Resources.jsx";
import Appliedusers from "./Pages/Career/Appliedusers/Appliedusers.jsx";

const App = () => {
  return (
    <AuthContextProvider>
           <Navbar />
      <TransitionWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="/services" element={<Services />} />
          <Route path="/career" element={<Career />}>
          <Route path="applieduser" element={<Appliedusers />} />
          </Route>
          <Route path="/resources" element={< Resources/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NoMatchRoute />} />

          <Route element={<ProtectedRoutes />}>
          <Route path="/logout" element={<Logout />}/>
          </Route>
        </Routes>
      </TransitionWrapper>
      <Footer />
    </AuthContextProvider>
  );
};

export default App;
