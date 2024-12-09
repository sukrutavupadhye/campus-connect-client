import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import EventForm from "./EventForm";
import { Link } from "react-router-dom";
import YouTubeIcon from "@mui/icons-material/YouTube";
import QrCodeIcon from "@mui/icons-material/QrCode";
import ViewQrCode from "./ViewQrCode";
export default function EventsTable({ events, host }) {
  const isValidYouTubeLink = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const YouTubeLinkDisplay = ({ row }) => {
    return (
      <>
        {row?.youtubeLink && isValidYouTubeLink(row.youtubeLink) ? (
          <IconButton
            component="a"
            href={`${row.youtubeLink}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <YouTubeIcon color="error" />
          </IconButton>
        ) : (
          <Typography variant="caption" color="warning">
            No valid YouTube link available
          </Typography>
        )}
      </>
    );
  };
  return (
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
            <TableCell>Event</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Entry Fees(₹)</TableCell>
            <TableCell>
              Event Date/
              <br />
              Registration before
            </TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {events?.length > 0 ? (
            events
              ?.slice()
              .reverse()
              ?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        gap: 2,
                        flexDirection: "column",
                      }}
                    >
                      <Box>
                        <img
                          src={`${host}/collegeEventUploads/college/${row?.poster}`}
                          style={{ width: "100px" }}
                          alt=""
                          srcset=""
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{ fontFamily: "Segoe UI" }}
                          variant="subtitle2"
                        >
                          {row?.title}
                        </Typography>
                        <Typography
                          sx={{ fontFamily: "Segoe UI" }}
                          variant="caption"
                        >
                          {row?.place}
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexDirection:
                              row?.qrCode && row?.youtubeLink
                                ? "row"
                                : "column", // Use row if both are present, otherwise column
                            alignItems: "center", // Optional: center align items in column mode
                            gap: 1, // Optional: add spacing between items
                          }}
                        >
                          <YouTubeLinkDisplay row={row} />
                          <ViewQrCode row={row} host={host} />
                        </Box>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <TextField
                      fullWidth
                      multiline
                      rows={2}
                      readOnly
                      value={row?.description}
                    />
                  </TableCell>
                  <TableCell align="center">{row?.entryFees}</TableCell>
                  <TableCell>
                    <Typography
                      sx={{ fontFamily: "Segoe UI" }}
                      variant="caption"
                    >
                      {row?.eDate}
                    </Typography>
                    <br />
                    <Typography
                      sx={{ fontFamily: "Segoe UI" }}
                      variant="caption"
                    >
                      {row?.lastDate}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row?.status}
                      color={row?.status == "Active" ? "success" : "error"}
                      size="small"
                      component={Paper}
                    />
                  </TableCell>
                  <TableCell>
                    <EventForm singleEvent={row} />
                    <Button
                      component={Link}
                      to={`/college/events/competitions/${row?._id}`}
                      variant="text"
                      sx={{
                        p: 1,
                        fontFamily: "Segoe UI",
                        fontWeight: "600",
                        color: "#a42b34",
                      }}
                    >
                      Competitions
                    </Button>
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                  variant="caption"
                >
                  No events found!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
