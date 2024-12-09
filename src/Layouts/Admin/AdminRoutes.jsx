import React from "react";
import Context from "./Context";
import { Route, Routes, useLocation } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import { Box, CssBaseline, styled } from "@mui/material";
import NavBar from "./Components/NavBar/NavBar";
import Colleges from "./Pages/Colleges";
import Students from "./Pages/Students";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function AdminRoutes() {
  const { pathname } = useLocation();
  const [open, setOpen] = React.useState(true);
  const paths = ["/admin", "/admin/", "/admin/register", "/admin/register/"];
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
              <Route exact path="/colleges" element={<Colleges />} />
              <Route exact path="/students" element={<Students />} />
            </Routes>
          </Box>
        </Main>
      </Box>
    </Context>
  );
}
