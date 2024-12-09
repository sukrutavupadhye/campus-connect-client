import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid2,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useContext } from "react";
import { CollegeContext } from "../../Context";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

export default function BlogForm({ singleBlog }) {
  const { postBlog, updateBlog } = useContext(CollegeContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    picture: null,
    firstDescription: "",
    secondDescription: "",
  });
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    if (singleBlog) {
      setFormData({
        title: singleBlog?.title,
        picture: singleBlog?.picture,
        firstDescription: singleBlog?.firstDescription,
        secondDescription: singleBlog?.secondDescription,
        status: singleBlog?.status,
      });
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      picture: null,
      firstDescription: "",
      secondDescription: "",
      status: "",
    });
    setErrors({});
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
  };
  const handleSubmit = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.picture) newErrors.picture = "picture is required.";
    if (!formData.firstDescription)
      newErrors.firstDescription = "first description is required.";
    if (!formData.secondDescription)
      newErrors.secondDescription = "second description is required.";
    if (Object.keys(newErrors).length === 0) {
      // Submit the form if there are no errors
      //   console.log("Form data:", formData);
      const Data = new FormData();
      Data.append("title", formData.title);
      Data.append("firstDescription", formData.firstDescription);
      Data.append("picture", formData.picture);
      Data.append("secondDescription", formData.secondDescription);
      if (singleBlog) {
        Data.append("status", formData.status);
        updateBlog(singleBlog?._id, Data);
      } else {
        postBlog(Data);
      }
      setFormData({
        title: "",
        picture: null,
        firstDescription: "",
        secondDescription: "",
        status: "",
      });
      setOpen(false);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      {singleBlog ? (
        <Button
          onClick={handleClickOpen}
          variant="text"
          sx={{
            p: 1,
            fontFamily: "Segoe UI",
            fontWeight: "600",
            color: "#a42b34",
          }}
        >
          Update
        </Button>
      ) : (
        <Button
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
          variant="text"
          sx={{
            p: 1,
            fontFamily: "Segoe UI",
            fontWeight: "600",
            color: "#a42b34",
          }}
        >
          Add New
        </Button>
      )}
      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Post new blog</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill the blog information</DialogContentText>
          <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="title"
                  label="Enter event title"
                  fullWidth
                  variant="standard"
                  value={formData.title}
                  onChange={handleChange}
                  error={!!errors.title}
                  helperText={errors.title}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  margin="dense"
                  name="picture"
                  error={!!errors.picture}
                  helperText={errors.picture}
                  label="Upload event picture"
                  fullWidth
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  onChange={(e) => {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      picture: "",
                    }));
                    setFormData((prevData) => ({
                      ...prevData,
                      picture: e.target.files[0],
                    }));
                  }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 12 }}>
                <TextField
                  required
                  multiline
                  rows={2}
                  margin="dense"
                  name="firstDescription"
                  label="Enter first description"
                  fullWidth
                  variant="standard"
                  value={formData.firstDescription}
                  onChange={handleChange}
                  error={!!errors.firstDescription}
                  helperText={errors.firstDescription}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 12 }}>
                <TextField
                  required
                  multiline
                  rows={2}
                  margin="dense"
                  name="secondDescription"
                  label="Enter second description"
                  fullWidth
                  variant="standard"
                  value={formData.secondDescription}
                  onChange={handleChange}
                  error={!!errors.secondDescription}
                  helperText={errors.secondDescription}
                />
              </Grid2>
              {singleBlog && (
                <Grid2 size={{ xs: 12, sm: 12 }}>
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      Status
                    </InputLabel>
                    <Select
                      variant="standard"
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={formData?.status}
                      label="Status"
                      name="status"
                      onChange={handleChange}
                    >
                      <MenuItem value={"Public"}>Public</MenuItem>
                      <MenuItem value={"Private"}>Private</MenuItem>
                    </Select>
                  </FormControl>
                </Grid2>
              )}
            </Grid2>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
