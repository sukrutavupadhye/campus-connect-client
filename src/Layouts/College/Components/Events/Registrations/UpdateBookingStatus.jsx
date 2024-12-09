import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { CollegeContext } from "../../../Context";

export default function UpdateBookingStatus({
  details,
  buttonLabel,
  handleCloseMainModal,
}) {
  const { updateRegistration } = useContext(CollegeContext);
  const updateRegistrationStatus = (bookingStatus) => {
    updateRegistration(details?._id, { bookingStatus });
    handleCloseMainModal();
  };
  return (
    <React.Fragment>
      {buttonLabel == "Accept" ? (
        <Button
          size="small"
          variant="text"
          sx={{ color: "#a42b34", fontFamily: "Segoe UI" }}
          onClick={() => updateRegistrationStatus("Accepted")}
        >
          Accept
        </Button>
      ) : (
        <Button
          size="small"
          variant="text"
          sx={{ color: "#a42b34", fontFamily: "Segoe UI" }}
          onClick={() => updateRegistrationStatus("Rejected")}
        >
          Reject
        </Button>
      )}
    </React.Fragment>
  );
}
