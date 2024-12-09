import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { CollegeContext } from "../../../Context";

export default function UpdatePaymentStatus({
  handleCloseMainModal,
  details,
  buttonLabel,
}) {
  const { updateRegistration } = useContext(CollegeContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleUpdatePayment = () => {
    let paymentStatus;
    let bookingStatus;
    paymentStatus = buttonLabel == "Verify" ? "Verified" : "Denied";
    bookingStatus = paymentStatus == "Verified" ? "Confirmed" : "Pending";
    updateRegistration(details?._id, { paymentStatus, bookingStatus });
    handleCloseMainModal(false);
    setOpen(false);
  };

  return (
    <React.Fragment>
      {buttonLabel == "Verify" ? (
        <Button
          size="small"
          variant="text"
          sx={{ color: "#a42b34", fontFamily: "Segoe UI" }}
          onClick={handleClickOpen}
        >
          Verify
        </Button>
      ) : (
        <Button
          size="small"
          variant="text"
          sx={{ color: "#a42b34", fontFamily: "Segoe UI" }}
          onClick={handleClickOpen}
        >
          Deny
        </Button>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Attempting to {buttonLabel == "Verify" ? "verify" : "deny"} the
          transaction!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure, want {buttonLabel == "Verify" ? "verify" : "deny"} the
            transaction of ₹{details?.amount} from {details?.student?.username}{" "}
            with the transaction Id - {details?.transactionId}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdatePayment} autoFocus>
            {buttonLabel == "Verify" ? "Yes, Verify" : "Yes, Deny"}
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
