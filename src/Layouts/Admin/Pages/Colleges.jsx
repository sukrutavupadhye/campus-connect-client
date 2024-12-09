import { Paper, Typography } from "@mui/material";
import React from "react";
import CollegesTable from "../Components/CollegesTable";
import { useContext } from "react";
import { AdminContext } from "../Context";
import { useEffect } from "react";

export default function Colleges() {
  const { getAllColleges, colleges } = useContext(AdminContext);
  useEffect(() => {
    getAllColleges();
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
        Colleges
      </Typography>
      <CollegesTable colleges={colleges?.slice().reverse()} />
    </Paper>
  );
}
