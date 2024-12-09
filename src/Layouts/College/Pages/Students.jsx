import { Paper, Typography } from "@mui/material";
import React from "react";
import StudentsTable from "../Components/StudentsTable";

export default function Students() {
  return (
    <Paper sx={{ p: 4, borderRadius: "30px" }} elevation={0}>
      <Typography
        variant="h6"
        sx={{
          color: "#4318ff",
          fontWeight: "600",
          fontFamily: "Segoe UI",
        }}
      >
        Students
      </Typography>
      <StudentsTable />
    </Paper>
  );
}
