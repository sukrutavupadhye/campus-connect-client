import { Box, Grid2, Icon, Paper, Typography } from "@mui/material";
import React from "react";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupIcon from "@mui/icons-material/Group";
export default function Counts({ report }) {
  let count = [
    {
      title: "Total Colleges",
      icon: <ApartmentIcon />,
      count: report?.totalColleges,
    },
    {
      title: "Total Students",
      icon: <GroupIcon />,
      count: report?.totalStudent,
    },
  ];
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={2}>
        {count?.map((count, index) => (
          <Grid2 size={{ xs: 12, sm: 6 }} key={index}>
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
                  backgroundColor: "#f4f7fe",
                  p: 2,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "50%",
                }}
              >
                <Icon sx={{ color: "#4318ff" }}>{count.icon}</Icon>
              </Box>
              <Box>
                <Typography
                  sx={{
                    color: "#4318ff",
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
