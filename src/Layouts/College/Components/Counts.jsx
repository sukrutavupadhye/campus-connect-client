import { Box, Grid2, Icon, Paper, Typography } from "@mui/material";
import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupIcon from "@mui/icons-material/Group";
import SeventeenMpIcon from "@mui/icons-material/SeventeenMp";
import CollectionsIcon from "@mui/icons-material/Collections";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
export default function Counts({ report }) {
  // console.log(report);
  let count = [
    {
      title: "Total Events held",
      icon: <SeventeenMpIcon sx={{ fontSize: "25px" }} />,
      count: report?.events,
    },
    {
      title: "Total blogs posted",
      icon: <CollectionsIcon sx={{ fontSize: "25px" }} />,
      count: report?.blogs,
    },
    {
      title: "Total Registrations ",
      icon: <GroupIcon sx={{ fontSize: "25px" }} />,
      count: report?.collegeRegistrations,
    },
    {
      title: "Total Revenue",
      icon: <CurrencyRupeeIcon sx={{ fontSize: "25px" }} />,
      count: report?.totalRevenue ? `₹${report?.totalRevenue}` : "₹0",
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        {count?.map((count, index) => (
          <Grid2 size={{ xs: 12, sm: 6, md: 3 }} key={index}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                borderRadius: "20px",
                gap: 3,
              }}
            >
              <Box
                sx={{
                  backgroundColor: "#d4b2b263",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <Icon sx={{ color: "#a42b34" }}>{count.icon}</Icon>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#a42b34",
                    fontWeight: "900",
                    fontFamily: "Segoe UI",
                  }}
                  variant="h4"
                >
                  {count.count}
                </Typography>
                <Typography
                  sx={{
                    color: "#a3aed0",
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                  }}
                  variant="caption"
                >
                  {count.title}
                </Typography>
              </Box>
            </Paper>
          </Grid2>
        ))}
      </Grid2>
    </Box>
  );
}
