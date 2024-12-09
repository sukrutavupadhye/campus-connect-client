import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import moment from "moment";
import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import BookingDetails from "./Registrations/BookingDetails";
import PayForRegistration from "./Registrations/PayForRegistration";
import GetInvitation from "./Registrations/GetInvitation";
import GiveFeedback from "./Registrations/GiveFeedback";
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#7383d1",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function BookingsTable({ events }) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Registered Date</StyledTableCell>
            <StyledTableCell>Event Date</StyledTableCell>
            <StyledTableCell>Event</StyledTableCell>
            <StyledTableCell>Amount(₹)</StyledTableCell>
            <StyledTableCell>Payment Status</StyledTableCell>
            <StyledTableCell>Booking Status</StyledTableCell>
            <StyledTableCell>Action</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events?.length > 0 ? (
            events
              ?.slice()
              ?.reverse()
              ?.map((row, index) => (
                <StyledTableRow key={index}>
                  <StyledTableCell component="th" scope="row">
                    {moment(row?.createdAt).format("DD-MM-YYYY")}
                  </StyledTableCell>
                  <StyledTableCell component="th" scope="row">
                    {row?.event?.eDate}
                  </StyledTableCell>
                  <StyledTableCell>
                    <Typography
                      component={Link}
                      sx={{
                        textDecoration: "none",
                        fontFamily: "Segoe UI",
                        fontWeight: "600",
                      }}
                      to={`/view-competitions/${row?.event?._id}`}
                      variant="body1"
                    >
                      {row?.event?.title}
                    </Typography>
                    <br />
                    <Typography variant="caption">
                      {row?.event?.place}
                    </Typography>
                  </StyledTableCell>
                  <StyledTableCell>{row?.amount}</StyledTableCell>
                  <StyledTableCell>{row?.paymentStatus}</StyledTableCell>
                  <StyledTableCell>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {row?.bookingStatus}
                      {row?.bookingStatus &&
                        (row.bookingStatus === "Confirmed" ||
                          row.bookingStatus === "Completed") &&
                        row.paymentStatus === "Verified" && (
                          <Typography color="warning" variant="caption">
                            invitation uploaded!
                          </Typography>
                        )}
                    </Box>
                  </StyledTableCell>
                  <StyledTableCell>
                    <BookingDetails row={row} />
                    {(row?.bookingStatus == "Accepted" ||
                      row?.bookingStatus == "Pending") && (
                      <PayForRegistration row={row} />
                    )}
                    {row?.bookingStatus == "Completed" && (
                      <GiveFeedback row={row} />
                    )}
                  </StyledTableCell>
                </StyledTableRow>
              ))
          ) : (
            <StyledTableRow>
              <StyledTableCell colSpan={7} align="center">
                No bookings found!
              </StyledTableCell>
            </StyledTableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
