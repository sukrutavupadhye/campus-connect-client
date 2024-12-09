import React from "react";
import Context from "./Context";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { Box, CssBaseline, styled } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import Register from "./Pages/Register";
import Students from "./Pages/Students";
import Events from "./Pages/Events";
import Registrations from "./Pages/Registrations";
import Blogs from "./Pages/Blogs";
import Competitions from "./Pages/Competitions";
// import Colleges from "./Pages/Colleges";
// import Students from "./Pages/Students";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function CollegeRoutes() {
  const [open, setOpen] = React.useState(true);
  const { pathname } = useLocation();
  // Define paths where NavBar should be hidden
  const paths = [
    "/college",
    "/college/",
    "/college/register",
    "/college/register/",
  ];
  const hideNavBar = paths.includes(pathname);
  const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
    ({ theme, open }) => ({
      flexGrow: 1,
      padding: !hideNavBar && theme.spacing(3),
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginLeft: open ? "-50px" : `-300px`,
    })
  );
  return (
    <Context>
      <Box
        sx={{
          display: "flex",
          fontFamily: "Segoe UI",
          backgroundColor: "#f4f7fe",
        }}
      >
        <CssBaseline />
        {!hideNavBar && <NavBar open={open} setOpen={setOpen} />}
        <Main open={open} sx={{ backgroundColor: "#f4f7fe" }}>
          {!hideNavBar && <DrawerHeader />}
          <Box sx={{ backgroundColor: "#f4f7fe", minHeight: "100vh" }}>
            <Routes>
              <Route exact path="/" element={<Login />} />
              <Route exact path="/dashboard" element={<Dashboard />} />
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/students" element={<Students />} />
              <Route exact path="/events" element={<Events />} />
              <Route
                exact
                path="/events/competitions/:id"
                element={<Competitions />}
              />
              <Route exact path="/registrations" element={<Registrations />} />
              <Route exact path="/blogs" element={<Blogs />} />
            </Routes>
          </Box>
        </Main>
      </Box>
    </Context>
  );
}
