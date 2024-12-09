import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid2,
  TextField,
  Paper,
  Avatar,
} from "@mui/material";
import { Grid, styled } from "@mui/system";
import hero_bg from "../../Assets/Images/hero_bg.jpg";
import { Link } from "react-router-dom";
import { StudentContext } from "../../Context";
import { useContext } from "react";
import { useState } from "react";
// Custom styling for the background image
const HeroSection = styled(Box)({
  // backgroundImage: `url(${hero_bg})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  height: "100vh",
  position: "relative",
  backgroundAttachment: "fixed",
  width: "100%",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  //   backgroundColor: "rgba(0, 0, 0, 0.5)",
  backgroundImage:
    "linear-gradient(45deg, #d79922 -15%, #ffeaa9 29%, #f13c208a 50%, #c5cbe3 84%)",
  // background:
  // "radial-gradient(ellipse at center, #212a31 30%, #2e3944 55%, #124e66 100%, #748d92 10%, #d3d9d4 10%)",
  // "radial-gradient(ellipse at center, #d79922 30%, #efe2ba 55%, #f13c20 100%, #c5cbe3 10%, #d3d9d4 10%)"
});

const HeroContent = styled(Box)({
  position: "relative",
  height: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-start",
  width: "100%",
});

const Hero = ({ student, host }) => {
  const { studentLogin } = useContext(StudentContext);
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
      studentLogin(formInfo);
    }
  };
  return (
    <HeroSection>
      <Overlay />
      <Container>
        <HeroContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
              <Grid2
                size={{
                  sm: 7,
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    height: "50vh",
                    textAlign: "left",
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    gutterBottom
                    sx={{
                      textAlign: "left",
                      width: "100%",
                      color: "white",
                      fontWeight: "900",
                      fontFamily: "Segoe UI",
                    }}
                  >
                    Welcome to CampusConnect
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{
                      textAlign: "left",
                      width: "100%",
                      color: "#000000ba",
                      fontWeight: "600",
                      fontFamily: "Lexend, sans-serif",
                    }}
                    gutterBottom
                  >
                    the ultimate platform for linking students and colleges
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontWeight: "900",
                      color: "white",
                    }}
                    gutterBottom
                  >
                    through exciting events and opportunities! Join us today and
                    discover a world of opportunities where you can engage with
                    peers, participate in workshops, and enhance your skills.
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontWeight: "400",
                      color: "white",
                      maxWidth: "600px",
                      marginTop: "20px",
                    }}
                    gutterBottom
                  ></Typography>
                  <Box
                    sx={{
                      mt: 3,
                      display: "flex",
                      justifyContent: "flex-start",
                      width: "100%",
                    }}
                  >
                    <Button
                      component={Link}
                      to={"/events"}
                      variant="contained"
                      color="primary"
                      sx={{ mr: 2 }}
                    >
                      Events
                    </Button>
                    <Button
                      component={Link}
                      to={"/about"}
                      variant="outlined"
                      color="secondary"
                    >
                      About Us
                    </Button>
                  </Box>
                </Box>
              </Grid2>
              <Grid2
                size={{
                  sm: 5,
                }}
              >
                {student ? (
                  <Paper
                    sx={{ px: 5, py: 5, width: "100%", borderRadius: "50px" }}
                  >
                    <Box sx={{ py: 2 }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "900",
                          textAlign: "center",
                        }}
                      >
                        Hello! {student?.username}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                      }}
                    >
                      <Box>
                        <Avatar
                          src={`${host}/studentUploads/student/${student?.profile}`}
                          sx={{ width: 100, height: 100 }}
                        />
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                        }}
                      >
                        <Typography
                          variant="subtitle"
                          sx={{
                            textAlign: "center",
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            width: "100%",
                          }}
                          gutterBottom
                        >
                          {student?.username}
                        </Typography>
                        <Typography
                          variant="body1"
                          sx={{
                            textAlign: "center",
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            width: "100%",
                          }}
                          gutterBottom
                        >
                          {student?.email}
                        </Typography>
                      </Box>
                    </Box>
                  </Paper>
                ) : (
                  <Paper
                    sx={{ px: 5, py: 8, width: "100%", borderRadius: "50px" }}
                  >
                    <Box sx={{ py: 2 }}>
                      <Typography
                        variant="h3"
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "900",
                        }}
                      >
                        Sign In
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
                        <Link
                          style={{ textDecoration: "none" }}
                          to={"/Register"}
                        >
                          Sign Up
                        </Link>
                      </Typography>
                    </Box>
                  </Paper>
                )}
              </Grid2>
            </Grid2>
          </Box>
        </HeroContent>
      </Container>
    </HeroSection>
  );
};

export default Hero;
