import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import bg from "../Assets/Images/loginBg.jpg";
import { Link } from "react-router-dom";
import { CollegeContext } from "../Context";
import { useContext } from "react";
export default function Login() {
  const { Login } = useContext(CollegeContext);

  const [formInfo, setFormInfo] = useState({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    email: null,
    password: null,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormError((prevInfo) => ({
      ...prevInfo,
      [name]: null,
    }));
    setFormInfo((prevInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  const validateForm = () => {
    let valid = true;
    const errors = {};
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formInfo.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formInfo.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    // Password validation (minimum 6 characters)
    if (!formInfo.password.trim()) {
      errors.password = "Password is required";
      valid = false;
    } else if (formInfo.password.length < 6) {
      errors.password = "Password must be at least 6 characters long";
      valid = false;
    }

    setFormError(errors);
    return valid;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Proceed with form submission
      Login(formInfo);
    }
  };
  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        backgroundImage: `url(${bg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <Box
        sx={{
          background: "linear-gradient(87deg, #d7992270 -31%, #f13c208a 64%)",
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Paper
          sx={{ py: 10, width: "40%", borderRadius: "50px", px: 5 }}
          elevation={5}
        >
          <Box sx={{ py: 0 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Segoe UI",
                fontWeight: "900",
              }}
            >
              College Sign In
            </Typography>
          </Box>
          <Box sx={{ py: 1 }}>
            <TextField
              fullWidth
              label="Enter email id"
              name="email"
              value={formInfo.email}
              onChange={handleChange}
              helperText={formError.email}
              error={Boolean(formError.email)}
            />
          </Box>
          <Box sx={{ py: 1 }}>
            <TextField
              fullWidth
              label="Enter password"
              type="password"
              name="password"
              value={formInfo.password}
              onChange={handleChange}
              helperText={formError.password}
              error={Boolean(formError.password)}
            />
          </Box>
          <Box sx={{ py: 1 }}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="text"
              color="primary"
              sx={{ p: 1, fontFamily: "Segoe UI", fontWeight: "900" }}
            >
              Sign In
            </Button>
          </Box>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontFamily: "Segoe UI",
                fontWeight: "600",
              }}
            >
              Don't have an account?{" "}
              <Link style={{ textDecoration: "none" }} to={"/college/register"}>
                Sign Up
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
