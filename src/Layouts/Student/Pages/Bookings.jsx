import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import BookingsTable from "../Components/BookingsTable";
import { useContext } from "react";
import { StudentContext } from "../Context";
import { useEffect } from "react";

export default function Bookings() {
  const { getStudentRegistrations, registeredEvents } =
    useContext(StudentContext);
  useEffect(() => {
    getStudentRegistrations();
  }, []);

  return (
    <Box>
      <PageBanner title="Bookings" />
      <Box sx={{ p: 5, py: 10 }}>
        <BookingsTable events={registeredEvents} />
      </Box>
    </Box>
  );
}
