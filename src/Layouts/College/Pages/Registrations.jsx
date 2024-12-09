import { Paper, Typography } from "@mui/material";
import React from "react";
import StudentsTable from "../Components/StudentsTable";
import { useContext } from "react";
import { CollegeContext } from "../Context";
import { useEffect } from "react";
import RegistrationsTable from "../Components/RegistrationsTable";

export default function Registrations() {
  const { getRegistrations, registrations } = useContext(CollegeContext);
  useEffect(() => {
    getRegistrations();
  }, []);
  // console.log(registrations);
  return (
    <Paper sx={{ p: 4, borderRadius: "30px" }} elevation={0}>
      <Typography
        variant="h6"
        sx={{
          color: "#a42b34",
          fontWeight: "600",
          fontFamily: "Segoe UI",
        }}
      >
        Registrations
      </Typography>
      <RegistrationsTable registrations={registrations} />
    </Paper>
  );
}
