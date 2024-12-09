import { Paper, Typography } from "@mui/material";
import React from "react";
import CollegesTable from "../Components/CollegesTable";
import { useContext } from "react";
import { AdminContext } from "../Context";
import { useEffect } from "react";
import StudentsTable from "../Components/StudentsTable";

export default function Students() {
  const { getAllStudents, students } = useContext(AdminContext);
  useEffect(() => {
    getAllStudents();
  }, []);
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
      <StudentsTable students={students?.slice().reverse()} />
    </Paper>
  );
}
