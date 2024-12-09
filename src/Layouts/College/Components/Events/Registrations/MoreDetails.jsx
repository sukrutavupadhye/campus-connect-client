import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import UpdateBookingStatus from "./UpdateBookingStatus";
import UpdatePaymentStatus from "./UpdatePaymentStatus";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

export default function MoreDetails({ details }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        size="small"
        variant="text"
        sx={{ color: "#a42b34", fontFamily: "Segoe UI" }}
        onClick={handleClickOpen}
      >
        View more
      </Button>
      <BootstrapDialog
        fullWidth
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Registration Details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <List sx={{ p: 4 }}>
            <ListItem disablePadding>
              <ListItemText
                primary="Booking Status"
                secondary={details?.bookingStatus}
              />
              <ListItemText
                sx={{
                  textAlign: details?.transactionId ? "center" : "right",
                }}
                primary="Payment Status"
                secondary={details?.paymentStatus}
              />
              {details?.transactionId && (
                <ListItemText
                  sx={{
                    textAlign: "right",
                  }}
                  primary="Transaction ID"
                  secondary={details?.transactionId}
                />
              )}
            </ListItem>
            {details?.ratings && (
              <ListItem disablePadding>
                <ListItemText
                  primary="Ratings"
                  secondary={
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Segoe UI",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                        color="text.secondary"
                      >
                        {details?.ratings}{" "}
                        <StarIcon sx={{ fontSize: "15px" }} />
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            )}
            {details?.feedback && (
              <ListItem disablePadding>
                <ListItemText
                  primary="Feedback"
                  secondary={
                    <Box>
                      <Typography
                        sx={{
                          fontFamily: "Segoe UI",
                          display: "flex",
                          justifyContent: "flex-start",
                          alignItems: "center",
                        }}
                        color="text.secondary"
                      >
                        {details?.feedback}{" "}
                      </Typography>
                    </Box>
                  }
                />
              </ListItem>
            )}
          </List>
          {details?.competitionData?.map((competition, index) => (
            <TableContainer key={index} sx={{ mt: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  variant="body2"
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                  }}
                >
                  {competition?.competition?.title}
                </Typography>
                {competition?.competition?.isGrouped ? (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontWeight: "600",
                    }}
                  >
                    {`Group of ${competition?.competition?.groupMembers}`}
                  </Typography>
                ) : (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontWeight: "600",
                    }}
                  >
                    {" "}
                    Individual
                  </Typography>
                )}
              </Box>
              <Table
                sx={{
                  fontFamily: "Segoe UI",
                }}
                aria-label="simple table"
              >
                <TableHead>
                  <TableRow sx={{ backgroundColor: "#d4b2b263" }}>
                    <TableCell sx={{ fontFamily: "Segoe UI" }}>Sl No</TableCell>
                    <TableCell sx={{ fontFamily: "Segoe UI" }}>Name</TableCell>
                    <TableCell sx={{ fontFamily: "Segoe UI" }}>Phone</TableCell>
                    <TableCell sx={{ fontFamily: "Segoe UI" }}>Email</TableCell>
                    <TableCell sx={{ fontFamily: "Segoe UI" }}>
                      College
                    </TableCell>
                    <TableCell sx={{ fontFamily: "Segoe UI" }}>
                      Course
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {competition?.participants?.map((participant, ind) => (
                    <TableRow key={ind}>
                      <TableCell sx={{ fontFamily: "Segoe UI" }}>
                        {ind + 1}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Segoe UI" }}>
                        {participant?.name}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Segoe UI" }}>
                        {participant?.phone}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Segoe UI" }}>
                        {participant?.email}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Segoe UI" }}>
                        {participant?.college}
                      </TableCell>
                      <TableCell sx={{ fontFamily: "Segoe UI" }}>
                        {participant?.course}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ))}
        </DialogContent>
        <DialogActions>
          {details?.bookingStatus == "Booked" && (
            <Box>
              <UpdateBookingStatus
                handleCloseMainModal={handleClose}
                details={details}
                buttonLabel="Accept"
              />
              <UpdateBookingStatus
                handleCloseMainModal={handleClose}
                details={details}
                buttonLabel="Reject"
              />
            </Box>
          )}
          {details?.paymentStatus == "Initiated" && (
            <Box>
              <UpdatePaymentStatus
                handleCloseMainModal={handleClose}
                details={details}
                buttonLabel="Verify"
              />
              <UpdatePaymentStatus
                handleCloseMainModal={handleClose}
                details={details}
                buttonLabel="Deny"
              />
            </Box>
          )}
          {details?.bookingStatus == "Rejected" && (
            <Box>
              <UpdateBookingStatus
                handleCloseMainModal={handleClose}
                details={details}
                buttonLabel="Accept"
              />
            </Box>
          )}
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
