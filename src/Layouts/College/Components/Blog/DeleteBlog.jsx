import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useContext } from "react";
import { CollegeContext } from "../../Context";

export default function DeleteBlog({ blog }) {
  const { deleteBlog } = useContext(CollegeContext);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    deleteBlog(blog._id);
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        variant="text"
        sx={{
          p: 1,
          fontFamily: "Segoe UI",
          fontWeight: "600",
          color: "#a42b34",
        }}
        onClick={handleClickOpen}
      >
        Delete
      </Button>
      <Dialog
        fullWidth
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Attempting to delete the blog!
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this blog?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>
            No, Cancel
          </Button>
          <Button color="success" onClick={handleDelete} autoFocus>
            Yes, Delete
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
