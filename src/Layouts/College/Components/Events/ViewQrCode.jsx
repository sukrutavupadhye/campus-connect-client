import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import QrCodeIcon from "@mui/icons-material/QrCode";
import { Avatar, IconButton } from "@mui/material";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
};

export default function ViewQrCode({ row, host }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {row?.qrCode ? (
        <IconButton onClick={handleOpen}>
          <QrCodeIcon />
        </IconButton>
      ) : (
        <Typography variant="caption" color="warning">
          QR code not available!
        </Typography>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Avatar
            sx={{ width: 200, height: 200 }}
            variant="square"
            src={`${host}/collegeEventUploads/college/${row?.qrCode}`}
          />
        </Box>
      </Modal>
    </div>
  );
}
