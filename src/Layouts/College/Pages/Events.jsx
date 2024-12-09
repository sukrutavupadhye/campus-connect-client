import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import EventsTable from "../Components/Events/EventsTable";
import EventForm from "../Components/Events/EventForm";
import { useContext } from "react";
import { CollegeContext } from "../Context";
import { useEffect } from "react";

export default function Events() {
  const { getEvents, events, host } = useContext(CollegeContext);
  useEffect(() => {
    getEvents();
  }, []);
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
          Events
        </Typography>
        <EventForm />
      </Box>
      <EventsTable events={events} host={host} />
    </Paper>
  );
}
