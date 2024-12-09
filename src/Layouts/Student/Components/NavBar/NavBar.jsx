import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { Link } from "react-router-dom";
import { StudentContext } from "../../Context";
import logo from "../../Assets/Images/lg.png";
import LoginOption from "./LoginOption";
// const pages = ["Products", "Pricing", "Blog"];
const pages = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Events", path: "/events" },
  { title: "Blog", path: "/blog" },
];

function NavBar() {
  const { activeNavOption, student, studentLogout, list } =
    React.useContext(StudentContext);
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [scrollPosition, setScrollPosition] = React.useState(0);
  React.useEffect(() => {
    const handleScroll = () => {
      const currentScrollPosition = window.pageYOffset;
      setScrollPosition(currentScrollPosition);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    setAnchorElUser(null);
    studentLogout();
  };
  return (
    <AppBar
      elevation={scrollPosition > 20 ? 0 : 0}
      sx={{
        backgroundColor: scrollPosition > 20 ? "#fff" : "transparent",
        color: scrollPosition > 20 ? "#000" : "#fff",
        transition: "0.9s ease",
        position: "fixed",
        top: 0,
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ display: "flex", gap: 5 }}>
          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              mr: 1,
              alignItems: "center",
              gap: 1,
              p: 2,
            }}
          >
            <img src={logo} style={{ width: "200px" }} />
            {/* <Typography
              variant="h4"
              sx={{
                fontWeight: "600",
                fontFamily: "Segoe UI",
              }}
            >
              CampusConnect
            </Typography> */}
          </Box>

          <Typography
            variant="h4"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontWeight: "600",
              fontFamily: "Segoe UI",
            }}
          >
            CampusConnect
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            {pages.map((page, index) => (
              <Box sx={{ p: 1 }} key={index} onClick={handleCloseNavMenu}>
                <Typography
                  sx={{
                    my: 2,
                    color:
                      activeNavOption == page.path
                        ? "#bd0924"
                        : scrollPosition > 20
                        ? "#000"
                        : "#fff",
                    display: "block",
                    fontWeight: "700",
                    fontSize: "20px",
                    fontFamily: "Segoe UI",
                    ":hover": {
                      color: "#bd0924",
                    },
                    textDecoration: "none",
                    transition: "0.9s ease",
                  }}
                  component={Link}
                  to={page.path}
                >
                  {page?.title}
                </Typography>
              </Box>
            ))}
            {student && list?.length > 0 && (
              <Typography
                sx={{
                  my: 2,
                  color: scrollPosition > 20 ? "#000" : "#fff",
                  display: "block",
                  fontWeight: "600",
                  fontSize: "20px",
                  fontFamily: "Segoe UI",
                  ":hover": {
                    color: "#bd0924",
                  },
                  textDecoration: "none",
                  transition: "0.9s ease",
                }}
                component={Link}
                to={"/registration-form"}
              >
                Registration
              </Typography>
            )}
            <Box sx={{ p: 1 }} onClick={handleCloseNavMenu}>
              {student ? (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 1,
                  }}
                >
                  <Typography
                    sx={{
                      my: 2,
                      color: scrollPosition > 20 ? "#000" : "#fff",
                      display: "block",
                      fontWeight: "700",
                      fontSize: "20px",
                      fontFamily: "Segoe UI",
                      ":hover": {
                        color: "#bd0924",
                      },
                      textDecoration: "none",
                      transition: "0.9s ease",
                      cursor: "pointer",
                    }}
                    component={Link}
                    to={"/bookings"}
                  >
                    Bookings
                  </Typography>
                  <Typography
                    onClick={handleLogout}
                    sx={{
                      my: 2,
                      color: scrollPosition > 20 ? "#000" : "#fff",
                      display: "block",
                      fontWeight: "700",
                      fontSize: "20px",
                      fontFamily: "Segoe UI",
                      ":hover": {
                        color: "#bd0924",
                      },
                      textDecoration: "none",
                      transition: "0.9s ease",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </Typography>
                </Box>
              ) : (
                <LoginOption scrollPosition={scrollPosition} />
                // <Typography
                //   sx={{
                //     my: 2,
                //     color: scrollPosition > 20 ? "#000" : "#fff",
                //     display: "block",
                //     fontWeight: "600",
                //     fontSize: "20px",
                //     fontFamily: "Segoe UI",
                //     ":hover": {
                //       color: "#bd0924",
                //     },
                //     textDecoration: "none",
                //     transition: "0.9s ease",
                //   }}
                //   component={Link}
                //   to={"/login"}
                // >
                //   Login
                // </Typography>
              )}
            </Box>
          </Box>
          <Box
            sx={{
              //   flexGrow: 1,
              display: {
                xs: "flex",
                md: "none",
                display: "flex",
                justifyContent: "end",
              },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default NavBar;
