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
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import GetInvitation from "./GetInvitation";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));
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

export default function BookingDetails({ row }) {
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
        variant="text"
        size="small"
        color="secondary"
        onClick={handleClickOpen}
      >
        View more
      </Button>
      <BootstrapDialog
        fullWidth
        maxWidth="lg"
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          Event Details
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
          {row?.competitionData?.map((data, index) => (
            <TableContainer sx={{ mt: 2 }} key={index}>
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
                  {data?.competition?.title}
                </Typography>
                {data?.competition?.isGrouped ? (
                  <Typography
                    variant="body2"
                    sx={{
                      fontFamily: "Segoe UI",
                      fontWeight: "600",
                    }}
                  >
                    {`Group of ${data?.competition?.groupMembers}`}
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
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <StyledTableCell> Sl No</StyledTableCell>
                    <StyledTableCell> Name</StyledTableCell>
                    <StyledTableCell> Phone</StyledTableCell>
                    <StyledTableCell>Email</StyledTableCell>
                    <StyledTableCell>College</StyledTableCell>
                    <StyledTableCell>Course</StyledTableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.participants?.map((participant, ind) => (
                    <StyledTableRow key={ind}>
                      <StyledTableCell>{ind + 1}</StyledTableCell>
                      <StyledTableCell>{participant?.name}</StyledTableCell>
                      <StyledTableCell>{participant?.phone}</StyledTableCell>
                      <StyledTableCell>{participant?.email}</StyledTableCell>
                      <StyledTableCell>{participant?.college}</StyledTableCell>
                      <StyledTableCell>{participant?.course}</StyledTableCell>
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
              {row?.bookingStatus &&
                (row.bookingStatus === "Confirmed" ||
                  row.bookingStatus === "Completed") &&
                row.paymentStatus === "Verified" && (
                  <GetInvitation competition={data} completeData={row} />
                )}
            </TableContainer>
          ))}
        </DialogContent>
        {/* <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions> */}
      </BootstrapDialog>
    </React.Fragment>
  );
}
