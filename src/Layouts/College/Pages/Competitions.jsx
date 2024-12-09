import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { CollegeContext } from "../Context";
import CompetitionsTable from "../Components/Events/Competitions/CompetitionsTable";
import CompetitionForm from "../Components/Events/Competitions/CompetitionForm";

export default function Competitions() {
  const { getSingleEvent, singleEvent, getCompetitions, competitions, host } =
    useContext(CollegeContext);
  const { id } = useParams();
  useEffect(() => {
    getSingleEvent(id);
    getCompetitions(id);
  }, [id]);
  //   console.log(competitions);
  return (
    <Paper sx={{ p: 4, borderRadius: "30px" }} elevation={0}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#a42b34",
            fontWeight: "600",
            fontFamily: "Segoe UI",
          }}
        >
          Competitions in {singleEvent?.title}
        </Typography>
        <CompetitionForm event={id} />
      </Box>
      <CompetitionsTable event={id} competitions={competitions} host={host} />
    </Paper>
  );
}
