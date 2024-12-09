import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { Avatar, Box, Typography } from "@mui/material";
import { useContext } from "react";
import { StudentContext } from "../../Context";

export default function PayForRegistration({ row }) {
  const { host, updateRegistration } = useContext(StudentContext);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({ transactionId: "" });
  const [formError, setFormError] = useState({ transactionId: null });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData({ transactionId: "" }); // Reset form data on close
    setFormError({ transactionId: null }); // Reset error state
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFormError((prev) => ({ ...prev, [name]: null })); // Clear error on input
  };

  const handleSubmit = () => {
    const errors = {};
    if (!formData.transactionId) {
      errors.transactionId = "Transaction ID is required.";
    }

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
    } else {
      updateRegistration(row?._id, {
        transactionId: formData?.transactionId,
        paymentStatus: "Initiated",
      });
      setOpen(false); // Close dialog after successful submission
    }
  };

  return (
    <React.Fragment>
      <Button size="small" color="warning" onClick={handleClickOpen}>
        Pay
      </Button>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Make payment for your registration</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Scan the below QR code to make UPI payment and enter the transaction
            ID
          </DialogContentText>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Avatar
              src={`${host}/eventUploads/student/${row?.event?.qrCode}`}
              variant="square"
              sx={{ width: 200, height: 200 }}
            />
            <Typography
              variant="h4"
              sx={{ fontFamily: "Segoe UI", fontWeight: "600" }}
            >
              Rs.{row?.amount}
            </Typography>
          </Box>
          <TextField
            autoFocus
            required
            name="transactionId"
            label="Enter transaction ID"
            fullWidth
            variant="standard"
            value={formData.transactionId}
            onChange={handleInputChange}
            error={!!formError.transactionId} // Show error if exists
            helperText={formError.transactionId} // Display error message
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="button" onClick={handleSubmit}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
