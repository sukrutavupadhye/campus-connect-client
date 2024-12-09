import {
  Box,
  Button,
  Grid2,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import bg from "../Assets/Images/loginBg.jpg";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CollegeContext } from "../Context";
export default function Register() {
  const { Register } = useContext(CollegeContext);
  const [formInfo, setFormInfo] = useState({
    collegeName: "",
    collegePlace: "",
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  const [formError, setFormError] = useState({
    collegeName: null,
    collegePlace: null,
    username: null,
    email: null,
    phone: null,
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

    // name validation
    if (!formInfo.collegeName.trim()) {
      errors.collegeName = "Name is required";
      valid = false;
    }
    // place validation
    if (!formInfo.collegePlace.trim()) {
      errors.collegePlace = "Place is required";
      valid = false;
    }
    // Username validation
    if (!formInfo.username.trim()) {
      errors.username = "Username is required";
      valid = false;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formInfo.email.trim()) {
      errors.email = "Email is required";
      valid = false;
    } else if (!emailRegex.test(formInfo.email)) {
      errors.email = "Please enter a valid email address";
      valid = false;
    }

    // Phone validation (Assuming a 10-digit number)
    const phoneRegex = /^[0-9]{10}$/;
    if (!formInfo.phone.trim()) {
      errors.phone = "Phone number is required";
      valid = false;
    } else if (!phoneRegex.test(formInfo.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
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
      Register(formInfo);
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
          sx={{
            py: 8,
            width: { xs: "100%", sm: "50%" },
            borderRadius: "50px",
            px: 5,
          }}
        >
          <Box sx={{ py: 2 }}>
            <Typography
              variant="h3"
              sx={{
                fontFamily: "Segoe UI",
                fontWeight: "900",
              }}
            >
              College Sign Up
            </Typography>
          </Box>
          <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2} sx={{ py: 2 }}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Enter college name"
                  name="collegeName"
                  value={formInfo.collegeName}
                  onChange={handleChange}
                  helperText={formError.collegeName}
                  error={Boolean(formError.collegeName)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Enter place"
                  name="collegePlace"
                  value={formInfo.collegePlace}
                  onChange={handleChange}
                  helperText={formError.collegePlace}
                  error={Boolean(formError.collegePlace)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Enter username"
                  name="username"
                  value={formInfo.username}
                  onChange={handleChange}
                  helperText={formError.username}
                  error={Boolean(formError.username)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Enter contact number"
                  name="phone"
                  value={formInfo.phone}
                  onChange={handleChange}
                  helperText={formError.phone}
                  error={Boolean(formError.phone)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  fullWidth
                  label="Enter email id"
                  name="email"
                  value={formInfo.email}
                  onChange={handleChange}
                  helperText={formError.email}
                  error={Boolean(formError.email)}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
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
              </Grid2>
            </Grid2>
          </Box>

          <Box sx={{ py: 1 }}>
            <Button
              onClick={handleSubmit}
              fullWidth
              variant="text"
              color="primary"
              sx={{ p: 1, fontFamily: "Segoe UI", fontWeight: "900" }}
            >
              Sign Up
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
              Already have an account?{" "}
              <Link style={{ textDecoration: "none" }} to={"/college"}>
                Sign In
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
