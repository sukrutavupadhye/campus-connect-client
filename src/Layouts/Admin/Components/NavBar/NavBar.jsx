import React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupIcon from "@mui/icons-material/Group";
import { useContext } from "react";
import { AdminContext } from "../../Context";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/lg.png";
import AccountMenu from "./AccountMenu";
const drawerWidth = 300;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: open ? 0 : ``,
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    // width: `calc(100% - ${drawerWidth}px)`,
    // marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function NavBar({ open, setOpen }) {
  const { pathname } = useContext(AdminContext);
  const theme = useTheme();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  let navbarOptions = [
    {
      title: "Dashboard",
      icon: <SpaceDashboardIcon />,
      path: "/admin/dashboard",
    },
    { title: "Colleges", icon: <ApartmentIcon />, path: "/admin/colleges" },
    { title: "Students", icon: <GroupIcon />, path: "/admin/students" },
  ];
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        open={open}
        elevation={0}
        sx={{
          backgroundColor: "#f4f7fe",
        }}
      >
        <Toolbar
          sx={{
            // backgroundColor: "red",
            display: "flex",
            justifyContent: "flex-end",
          }}
        >
          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          {/* <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton> */}
          <Box
            sx={{
              p: 3,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
              // gap: 2,
            }}
          >
            <img src={logo} style={{ width: "100%" }} />
            {/* <Typography
              variant="h5"
              sx={{
                color: "#4318ff",
                fontWeight: "900",
                fontFamily: "Segoe UI",
              }}
            >
              CampusConnect
            </Typography> */}
          </Box>
        </DrawerHeader>
        <Divider />
        <List sx={{ paddingLeft: 3, py: 3 }}>
          {navbarOptions.map((text, index) => (
            <ListItem
              component={Link}
              to={text.path}
              key={index}
              disablePadding
              sx={{
                borderRight: pathname == text.path && "5px solid #4318ff",
              }}
            >
              <ListItemButton>
                <ListItemIcon
                  sx={{ color: pathname == text.path ? "#4318ff" : "#a3aed0" }}
                  // sx={{ color: pathname == text.path ? "#4318ff" : "#a3aed0" }}
                >
                  {text.icon}
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      sx={{
                        color: pathname == text.path ? "#4318ff" : "#a3aed0",
                        fontWeight: "600",
                        fontFamily: "Segoe UI",
                      }}
                    >
                      {text.title}
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
      </Main>
    </Box>
  );
}
