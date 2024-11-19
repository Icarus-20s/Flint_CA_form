import React from "react";
import "./App.css"
import { BrowserRouter ,Routes, Route } from "react-router-dom";
import Home from "./Pages/Home/Home.jsx";
import Aboutus from "./Pages/Aboutus/Aboutus.jsx";
import Contactus from "./Pages/Contactus/Contactus.jsx";
import Services from "./Pages/Services/Services.jsx";
import Navbar from "./Navbar/Navbar.jsx";
import NoMatchRoute from "./Pages/NoRoute/NoRoute.jsx";
import Footer from "./Footer/Footer.jsx";
import TransitionWrapper from "./Transitionwrapper/TransitionWrapper.jsx";
import Career from "./Pages/Career/Career.jsx";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <TransitionWrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/contact" element={<Contactus />} />
          <Route path="*" element={<NoMatchRoute />} />
          <Route path="/services" element={<Services />} />
          <Route path="/career" element={<Career />} />
        </Routes>
      </TransitionWrapper>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
