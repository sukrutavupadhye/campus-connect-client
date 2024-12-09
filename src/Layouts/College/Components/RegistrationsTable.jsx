import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Typography } from "@mui/material";
import moment from "moment";
import { Link } from "react-router-dom";
import MoreDetails from "./Events/Registrations/MoreDetails";
export default function RegistrationsTable({ registrations }) {
  return (
    <TableContainer>
      <Table
        sx={{
          // minWidth: 650
          fontFamily: "Segoe UI",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Registered On</TableCell>
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Registered By</TableCell>

            <TableCell sx={{ fontFamily: "Segoe UI" }}>Event</TableCell>

            <TableCell sx={{ fontFamily: "Segoe UI" }}>Amount (₹)</TableCell>

            <TableCell sx={{ fontFamily: "Segoe UI" }}>Status</TableCell>

            <TableCell sx={{ fontFamily: "Segoe UI" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {registrations?.length > 0 ? (
            registrations
              ?.slice()
              ?.reverse()
              ?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{ fontFamily: "Segoe UI" }}
                    component="th"
                    scope="row"
                  >
                    {moment(row?.createdAt).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell
                    sx={{ fontFamily: "Segoe UI" }}
                    component="th"
                    scope="row"
                  >
                    {row?.student?.username}
                  </TableCell>

                  <TableCell sx={{ fontFamily: "Segoe UI" }}>
                    <Link
                      to={`/college/events/competitions/${row?.event?._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {row?.event?.title}
                    </Link>
                  </TableCell>

                  <TableCell sx={{ fontFamily: "Segoe UI" }}>
                    {row?.amount}
                  </TableCell>

                  <TableCell>
                    <Typography
                      sx={{ fontFamily: "Segoe UI", color: "#b45e6691" }}
                      variant="body2"
                    >
                      Booking Status
                    </Typography>
                    <Typography sx={{ fontFamily: "Segoe UI" }} variant="h6">
                      {row?.bookingStatus}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "Segoe UI", color: "#b45e6691" }}
                      variant="body2"
                    >
                      Payment Status
                    </Typography>
                    <Typography sx={{ fontFamily: "Segoe UI" }} variant="h6">
                      {row?.paymentStatus}
                    </Typography>
                  </TableCell>

                  <TableCell sx={{ fontFamily: "Segoe UI" }}>
                    <Box>
                      <MoreDetails details={row} />
                    </Box>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography
                  sx={{ color: "#a3aed0", fontFamily: "Segoe UI" }}
                  variant="caption"
                >
                  No registrations found!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
