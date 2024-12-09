import { Box } from "@mui/material";
import React from "react";
import bg_2 from "../Assets/Images/bg_2.jpg";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import { Link } from "react-router-dom";

export default function PageBanner({ title }) {
  const breadcrumbs = [
    <Link
      to="/"
      key="1"
      style={{
        textDecoration: "none",
        fontFamily: "Segoe UI",
        fontWeight: "600",
        color: "white",
      }}
    >
      Home
    </Link>,
    <Typography key="2">{title}</Typography>,
  ];
  return (
    <Box
      sx={{
        backgroundImage: `url(${bg_2})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "75vh",
        backgroundAttachment: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
        <Stack spacing={2}>
          <Breadcrumbs
            sx={{ color: "white", display: "flex", justifyContent: "center" }}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            {breadcrumbs}
          </Breadcrumbs>
          <Breadcrumbs
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            separator={<NavigateNextIcon fontSize="small" />}
            aria-label="breadcrumb"
          >
            <Typography
              key="3"
              variant="h4"
              sx={{ color: "white", fontFamily: "Segoe UI", fontWeight: "900" }}
            >
              {title}
            </Typography>
          </Breadcrumbs>
        </Stack>
      </Box>
    </Box>
  );
}
