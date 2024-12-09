import React from "react";
import { Box } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import Home from "./Pages/Home";
import About from "./Pages/About";
import Login from "./Pages/Login";
import Context from "./Context";
import Footer from "./Components/Footer/Footer";
import Events from "./Pages/Events";
import Blogs from "./Pages/Blogs";
import Register from "./Pages/Register";
import Competitions from "./Pages/Competitions";
import RegistrationForm from "./Pages/RegistrationForm";
import Bookings from "./Pages/Bookings";
import SingleBlog from "./Pages/SingleBlog";
export default function StudentRoutes() {
  const { pathname } = useLocation();
  return (
    <Context>
      {pathname !== "/login" && pathname !== "/register" && (
        <Box>
          <NavBar />
        </Box>
      )}
      <Box sx={{ minHeight: "100vh" }}>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/events" element={<Events />} />
          <Route exact path="/bookings" element={<Bookings />} />
          <Route
            exact
            path="/view-competitions/:id"
            element={<Competitions />}
          />
          <Route
            exact
            path="/registration-form"
            element={<RegistrationForm />}
          />
          <Route
            exact
            path="/registration-form/:id"
            element={<RegistrationForm />}
          />
          <Route exact path="/blog" element={<Blogs />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/view-blog/:id" element={<SingleBlog />} />
        </Routes>
      </Box>
      {pathname !== "/login" && pathname !== "/register" && (
        <Box>
          <Footer />
        </Box>
      )}
    </Context>
  );
}
