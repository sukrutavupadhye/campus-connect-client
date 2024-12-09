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

export default function EventForm({ singleEvent }) {
  const { createEvent, updateEvent } = useContext(CollegeContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    youtubeLink: "",
    poster: null,
    qrCode: null,
    description: "",
    place: "",
    entryFees: "",
    eDate: "",
    lastDate: "",
    status: "",
  });
  const [errors, setErrors] = useState({});

  const tomorrow = new Date();
  const dayAfterTomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 2);
  const minLastDate = tomorrow.toISOString().split("T")[0];
  const eDate = dayAfterTomorrow.toISOString().split("T")[0];

  const handleClickOpen = () => {
    setOpen(true);
    if (singleEvent) {
      setFormData({
        title: singleEvent?.title,
        youtubeLink: singleEvent?.youtubeLink,
        poster: singleEvent?.poster,
        qrCode: singleEvent?.qrCode,
        description: singleEvent?.description,
        place: singleEvent?.place,
        entryFees: singleEvent?.entryFees,
        eDate: singleEvent?.eDate,
        lastDate: singleEvent?.lastDate,
        status: singleEvent?.status,
      });
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      youtubeLink: "",
      poster: null,
      qrCode: null,
      description: "",
      place: "",
      entryFees: "",
      eDate: "",
      lastDate: "",
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
    if (!formData.qrCode) newErrors.qrCode = "QR code is required.";
    if (!formData.poster) newErrors.poster = "Poster is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.place) newErrors.place = "Place is required.";
    if (!formData.entryFees) newErrors.entryFees = "Entry fees are required.";
    if (!formData.lastDate)
      newErrors.lastDate = "Last registration date is required.";
    if (!formData.eDate) newErrors.eDate = "Event date is required.";
    else if (formData.eDate <= formData.lastDate)
      newErrors.eDate = "Event date must be after the last registration date.";
    // Optional YouTube link validation
    if (formData.youtubeLink) {
      const youtubeRegex =
        /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/).+$/;
      if (!youtubeRegex.test(formData.youtubeLink)) {
        newErrors.youtubeLink =
          "Invalid YouTube link. Example: https://www.youtube.com/watch?v=exampleID";
      }
    }
    if (Object.keys(newErrors).length === 0) {
      // Submit the form if there are no errors
      //   console.log("Form data:", formData);
      const Data = new FormData();
      Data.append("title", formData.title);
      Data.append("youtubeLink", formData.youtubeLink);
      Data.append("description", formData.description);
      Data.append("images", formData.qrCode);
      Data.append("images", formData.poster);
      Data.append("place", formData.place);
      Data.append("entryFees", formData.entryFees);
      Data.append("lastDate", formData.lastDate);
      Data.append("eDate", formData.eDate);
      if (singleEvent) {
        Data.append("status", formData.status);
        updateEvent(singleEvent?._id, Data);
      } else {
        createEvent(Data);
      }
      setFormData({
        title: "",
        youtubeLink: "",
        qrCode: null,
        poster: null,
        description: "",
        place: "",
        entryFees: "",
        eDate: "",
        lastDate: "",
        status: "",
      });
      setOpen(false);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      {singleEvent ? (
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
        <DialogTitle>Create new event</DialogTitle>
        <DialogContent>
          <DialogContentText>Fill the event information</DialogContentText>
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
                  name="youtubeLink"
                  label="Enter event video link from youtube"
                  fullWidth
                  variant="standard"
                  value={formData.youtubeLink}
                  onChange={handleChange}
                  error={!!errors.youtubeLink}
                  helperText={errors.youtubeLink}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  margin="dense"
                  name="qrCode"
                  error={!!errors.qrCode}
                  helperText={errors.qrCode}
                  label="Upload QR code"
                  fullWidth
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  onChange={(e) => {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      qrCode: "",
                    }));
                    setFormData((prevData) => ({
                      ...prevData,
                      qrCode: e.target.files[0],
                    }));
                  }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  margin="dense"
                  name="poster"
                  error={!!errors.poster}
                  helperText={errors.poster}
                  label="Upload event poster"
                  fullWidth
                  type="file"
                  InputLabelProps={{ shrink: true }}
                  variant="standard"
                  onChange={(e) => {
                    setErrors((prevErrors) => ({
                      ...prevErrors,
                      poster: "",
                    }));
                    setFormData((prevData) => ({
                      ...prevData,
                      poster: e.target.files[0],
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
                  name="description"
                  label="Description"
                  fullWidth
                  variant="standard"
                  value={formData.description}
                  onChange={handleChange}
                  error={!!errors.description}
                  helperText={errors.description}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  margin="dense"
                  name="place"
                  label="Enter place"
                  fullWidth
                  variant="standard"
                  value={formData.place}
                  onChange={handleChange}
                  error={!!errors.place}
                  helperText={errors.place}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  margin="dense"
                  name="entryFees"
                  label="Enter event fees"
                  fullWidth
                  type="number"
                  variant="standard"
                  value={formData.entryFees}
                  onChange={handleChange}
                  error={!!errors.entryFees}
                  helperText={errors.entryFees}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  margin="dense"
                  name="eDate"
                  label="Select event date"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  type="date"
                  variant="standard"
                  value={formData.eDate}
                  onChange={handleChange}
                  error={!!errors.eDate}
                  helperText={errors.eDate}
                  inputProps={{ min: eDate }}
                />
              </Grid2>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  required
                  margin="dense"
                  name="lastDate"
                  label="Last date for registration"
                  InputLabelProps={{ shrink: true }}
                  fullWidth
                  type="date"
                  variant="standard"
                  value={formData.lastDate}
                  onChange={handleChange}
                  error={!!errors.lastDate}
                  helperText={errors.lastDate}
                  inputProps={{ min: minLastDate }}
                />
              </Grid2>
              {singleEvent && (
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
                      <MenuItem value={"Active"}>Active</MenuItem>
                      <MenuItem value={"Expired"}>Expired</MenuItem>
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
