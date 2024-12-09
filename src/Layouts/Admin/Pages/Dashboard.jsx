import { Box, Grid2, Paper, Typography } from "@mui/material";
import React from "react";
import Counts from "../Components/Counts";
import CollegesTable from "../Components/CollegesTable";
import StudentsTable from "../Components/StudentsTable";
import { useEffect } from "react";
import { AdminContext } from "../Context";
import { useContext } from "react";

export default function Dashboard() {
  const { getReport, report } = useContext(AdminContext);
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
                Recently registered colleges
              </Typography>
            </Box>
            <Paper sx={{ p: 2, borderRadius: "20px" }} elevation={0}>
              <CollegesTable
                dashboard={true}
                colleges={report?.colleges?.slice().reverse().slice(0, 5)}
              />
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
                Recently registered students
              </Typography>
            </Box>
            <Paper sx={{ p: 2, borderRadius: "20px" }} elevation={0}>
              <StudentsTable
                dashboard={true}
                students={report?.students?.slice().reverse().slice(0, 5)}
              />
            </Paper>
          </Grid2>
        </Grid2>
      </Box>
    </Box>
  );
}
