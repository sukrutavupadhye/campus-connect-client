import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function LoginOption({ scrollPosition }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* <Button
        id="basic-button"
        >
        Dashboard
      </Button> */}
      <Typography
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
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
        Login
      </Typography>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem component={Link} to={"/college/"} onClick={handleClose}>
          Login as a College
        </MenuItem>
        <MenuItem component={Link} to={"/login"} onClick={handleClose}>
          Login as a Student
        </MenuItem>
      </Menu>
    </div>
  );
}
