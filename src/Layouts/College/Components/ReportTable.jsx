import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function ReportTable({ recentEvents, recentRegistrations }) {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="body1"
          sx={{
            color: "#a42b34",
            fontWeight: "600",
            fontFamily: "Segoe UI",
          }}
        >
          {recentEvents ? "Events" : "Registrations"}
        </Typography>
        <Typography
          component={Link}
          to={recentEvents ? `/college/events` : "/college/registrations"}
          variant="body1"
          sx={{
            color: "#a42b34",
            fontWeight: "600",
            fontFamily: "Segoe UI",
          }}
        >
          View all
        </Typography>
      </Box>
      {recentEvents && (
        <TableContainer>
          <Table
            sx={
              {
                // minWidth: 650
              }
            }
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Event
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Event Date
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentEvents?.map((event, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "grey" }}>{event?.title}</TableCell>
                  <TableCell sx={{ color: "grey" }}>{event?.eDate}</TableCell>
                  <TableCell sx={{ color: "grey" }}>{event?.status}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {recentRegistrations && (
        <TableContainer>
          <Table
            sx={
              {
                // minWidth: 650
              }
            }
            aria-label="simple table"
          >
            <TableHead>
              <TableRow>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Student
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Event
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentRegistrations?.map((registration, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ color: "grey" }}>
                    {registration?.student?.username}
                  </TableCell>
                  <TableCell sx={{ color: "grey" }}>
                    {registration?.event?.title}
                  </TableCell>
                  <TableCell sx={{ color: "grey" }}>
                    {registration?.bookingStatus}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
