import { Box, Grid2, Paper, Typography } from "@mui/material";
import React from "react";
import Counts from "../Components/Counts";
import { useContext } from "react";
import { CollegeContext } from "../Context";
import { useEffect } from "react";
import ReportTable from "../Components/ReportTable";
// import CollegesTable from "../Components/CollegesTable";
// import StudentsTable from "../Components/StudentsTable";

export default function Dashboard() {
  const { getReport, report } = useContext(CollegeContext);
  useEffect(() => {
    getReport();
  }, []);
  return (
    <Box sx={{}}>
      <Box>
        <Counts report={report} />
      </Box>
      <Box sx={{ flexGrow: 1, pt: 3 }}>
        <Grid2 container spacing={2}>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontFamily: "Segoe UI",
                  color: "#a3aed0",
                }}
                variant="caption"
              >
                Recently posted events
              </Typography>
            </Box>
            <Paper sx={{ p: 2, borderRadius: "20px" }} elevation={0}>
              <ReportTable recentEvents={report?.recentEvents} />
            </Paper>
          </Grid2>
          <Grid2 size={{ xs: 12, sm: 6 }}>
            <Box
              sx={{
                p: 1,
              }}
            >
              <Typography
                sx={{
                  fontWeight: "600",
                  fontFamily: "Segoe UI",
                  color: "#a3aed0",
                }}
                variant="caption"
              >
                Recent registrations
              </Typography>
            </Box>
            <Paper sx={{ p: 2, borderRadius: "20px" }} elevation={0}>
              <ReportTable recentRegistrations={report?.recentRegistrations} />
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
