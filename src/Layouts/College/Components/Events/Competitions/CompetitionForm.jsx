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
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CollegeContext } from "../../../Context";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
export default function CompetitionForm({ singleCompetition, event }) {
  const { createCompetition, updateCompetition } = useContext(CollegeContext);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    picture: null,
    description: "",
    rules: "",
    isGrouped: false,
    groupMembers: 1,
    status: "",
  });
  const [errors, setErrors] = useState({});

  const handleClickOpen = () => {
    setOpen(true);
    if (singleCompetition) {
      setFormData({
        title: singleCompetition.title || "",
        picture: singleCompetition.picture || null,
        description: singleCompetition.description || "",
        rules: singleCompetition.rules || "",
        isGrouped: singleCompetition.isGrouped || false,
        groupMembers: singleCompetition.groupMembers || 1,
        status: singleCompetition.status || "",
      });
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      picture: null,
      description: "",
      rules: "",
      isGrouped: false,
      groupMembers: 1,
      status: "",
    });
    setErrors({});
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "groupMembers" && formData.isGrouped && value < 2) {
      setErrors({
        ...errors,
        groupMembers: "number of group member should be greater than 1",
      });
    } else {
      if (name == "groupMembers" && !formData.isGrouped) {
        setFormData((prevData) => ({ ...prevData, [name]: 1 }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      } else {
        setFormData((prevData) => ({ ...prevData, [name]: value }));
        setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
      }
    }
  };

  const handleRadioChange = (e) => {
    const value = e.target.value === "true";
    setFormData((prevData) => ({
      ...prevData,
      isGrouped: value,
      groupMembers: value ? 2 : 1, // Default value based on selection
    }));
    setErrors((prevErrors) => ({ ...prevErrors, isGrouped: "" }));
  };

  const handleSubmit = () => {
    let newErrors = {};
    if (!formData.title) newErrors.title = "Title is required.";
    if (!formData.picture) newErrors.picture = "Picture is required.";
    if (!formData.description)
      newErrors.description = "Description is required.";
    if (!formData.rules) newErrors.rules = "Rules must be filled.";
    if (formData.isGrouped && formData.groupMembers < 2) {
      newErrors.groupMembers = "Please enter a valid number of group members.";
    }
    if (singleCompetition && !formData.status) {
      newErrors.status = "Status is required for updates.";
    }

    if (Object.keys(newErrors).length === 0) {
      // Submit form if no errors
      //   console.log(formData);
      const Data = new FormData();
      Data.append("event", event);
      Data.append("title", formData.title);
      Data.append("description", formData.description);
      Data.append("rules", formData.rules);
      Data.append("picture", formData.picture);
      Data.append("isGrouped", formData.isGrouped);
      Data.append("groupMembers", formData.groupMembers);
      if (singleCompetition) {
        Data.append("status", formData.status);
        updateCompetition(singleCompetition._id, Data, event);
      } else {
        createCompetition(Data, event);
      }
      setFormData({
        title: "",
        picture: null,
        description: "",
        rules: "",
        isGrouped: false,
        groupMembers: 1,
        status: "",
      });
      setOpen(false);
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <div>
      {singleCompetition ? (
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
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Create new competition</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Fill the competition information
          </DialogContentText>
          <Box sx={{ flexGrow: 1 }}>
            <Grid2 container spacing={2}>
              <Grid2 size={{ xs: 12, sm: 6 }}>
                <TextField
                  autoFocus
                  required
                  margin="dense"
                  name="title"
                  label="Enter competition title"
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
                  label="Upload competition picture"
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
              <Grid2 xs={12} sm={12}>
                <FormControl component="fieldset">
                  <FormLabel>Competition Type</FormLabel>
                  <RadioGroup
                    row
                    name="isGrouped"
                    value={formData.isGrouped.toString()}
                    onChange={handleRadioChange}
                  >
                    <FormControlLabel
                      value="false"
                      control={<Radio />}
                      label="Individual"
                    />
                    <FormControlLabel
                      value="true"
                      control={<Radio />}
                      label="Group"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid2>
              <Grid2 xs={12} sm={12} sx={{ width: "100%" }}>
                {formData.isGrouped && (
                  <TextField
                    sx={{ width: "100%" }}
                    required
                    margin="dense"
                    name="groupMembers"
                    label="Number of Group Members"
                    fullWidth
                    type="number"
                    variant="standard"
                    value={formData.groupMembers}
                    onChange={handleChange}
                    error={!!errors.groupMembers}
                    helperText={errors.groupMembers}
                  />
                )}
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
              <Grid2 size={{ xs: 12, sm: 12 }}>
                <TextField
                  required
                  multiline
                  rows={2}
                  margin="dense"
                  name="rules"
                  label="Rules and regulations"
                  fullWidth
                  variant="standard"
                  value={formData.rules}
                  onChange={handleChange}
                  error={!!errors.rules}
                  helperText={errors.rules}
                />
              </Grid2>

              {singleCompetition && (
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
