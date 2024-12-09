import {
  Box,
  Button,
  Divider,
  Grid2,
  IconButton,
  Paper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState, useContext } from "react";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import { StudentContext } from "../Context";

export default function FormContainer2({ list }) {
  const { removeFromList, registerForEvent } = useContext(StudentContext);
  const [formData, setFormData] = useState(() => {
    return list.map((item) =>
      Array.from({ length: item?.competition?.groupMembers || 0 }, () => ({
        name: "",
        phone: "",
        email: "",
        college: "",
        course: "",
      }))
    );
  });

  const [errors, setErrors] = useState(() => {
    return Array.from({ length: list.length }, () =>
      Array.from(
        { length: list[0]?.competition?.groupMembers || 0 },
        () => ({})
      )
    );
  });

  const handleInputChange = (
    competitionIndex,
    participantIndex,
    field,
    value
  ) => {
    setFormData((prevFormData) => {
      const updatedFormData = [...prevFormData];
      if (!updatedFormData[competitionIndex]) {
        updatedFormData[competitionIndex] = [];
      }
      if (!updatedFormData[competitionIndex][participantIndex]) {
        updatedFormData[competitionIndex][participantIndex] = {
          name: "",
          phone: "",
          email: "",
          college: "",
          course: "",
        };
      }
      updatedFormData[competitionIndex][participantIndex][field] = value;
      return updatedFormData;
    });

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      if (!updatedErrors[competitionIndex]) {
        updatedErrors[competitionIndex] = [];
      }
      if (!updatedErrors[competitionIndex][participantIndex]) {
        updatedErrors[competitionIndex][participantIndex] = {};
      }
      updatedErrors[competitionIndex][participantIndex][field] = ""; // Clear specific error
      return updatedErrors;
    });
  };

  const handleSubmit = () => {
    let validationErrors = Array.from({ length: list.length }, () =>
      Array.from(
        { length: list[0]?.competition?.groupMembers || 0 },
        () => ({})
      )
    );

    formData.forEach((competition, competitionIndex) => {
      competition.forEach((participant, participantIndex) => {
        if (participant) {
          // Ensure participant is defined
          // Initialize error object for this participant if it doesn't exist
          if (!validationErrors[competitionIndex][participantIndex]) {
            validationErrors[competitionIndex][participantIndex] = {};
          }

          if (!participant.name) {
            validationErrors[competitionIndex][participantIndex].name =
              "Name is required";
          }
          if (!participant.phone) {
            validationErrors[competitionIndex][participantIndex].phone =
              "Phone number is required";
          }
          if (!participant.email) {
            validationErrors[competitionIndex][participantIndex].email =
              "Email is required";
          }
          if (!participant.college) {
            validationErrors[competitionIndex][participantIndex].college =
              "College name is required";
          }
          if (!participant.course) {
            validationErrors[competitionIndex][participantIndex].course =
              "Course is required";
          }
        }
      });
    });

    // Check if there are any validation errors
    if (
      validationErrors.flat().some((error) => Object.keys(error).length > 0)
    ) {
      setErrors(validationErrors);
    } else {
      // Handle successful submission
      const formattedData = list.map((item, competitionIndex) => ({
        event: item.competition.event,
        competition: item.competition._id,
        participants: formData[competitionIndex].map((participant) => ({
          name: participant.name,
          phone: participant.phone,
          email: participant.email,
          college: participant.college,
          course: participant.course,
        })),
      }));

      registerForEvent(formattedData); // Debug or send to server

      setErrors(
        Array.from({ length: list.length }, () =>
          Array.from(
            { length: list[0]?.competition?.groupMembers || 0 },
            () => ({})
          )
        )
      );
      // Submit form logic goes here
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 spacing={2} container>
        {list?.length > 0 &&
          list.map((item, competitionIndex) => (
            <Grid2 size={{ xs: 12 }} key={competitionIndex}>
              <Paper sx={{ p: 4, flexGrow: 1 }} elevation={0}>
                <Tooltip title="Withdraw from the competition" arrow>
                  <IconButton
                    onClick={() => removeFromList(item?.competition?._id)}
                    sx={{ float: "right" }}
                  >
                    <DisabledByDefaultIcon color="error" />
                  </IconButton>
                </Tooltip>
                <Divider sx={{ py: 2, overflow: "auto" }}>
                  <Box>
                    <Typography
                      sx={{ fontFamily: "Segoe UI" }}
                      variant="subtitle2"
                    >
                      Competition - {item?.competition?.title} from{" "}
                      {item?.competition?.event?.title} in{" "}
                      {item?.competition?.event?.place}
                    </Typography>
                    <Typography
                      sx={{ fontFamily: "Segoe UI" }}
                      variant="subtitle2"
                    >
                      Total participants - {item?.competition?.groupMembers}
                    </Typography>
                  </Box>
                </Divider>

                <Grid2 container spacing={2}>
                  {Array.from({
                    length: item?.competition?.groupMembers || 0,
                  }).map((_, participantIndex) => (
                    <Paper sx={{ p: 3, width: "100%" }} key={participantIndex}>
                      <Typography
                        sx={{ fontFamily: "Segoe UI" }}
                        variant="subtitle2"
                        gutterBottom
                      >
                        Participant - {participantIndex + 1}
                      </Typography>
                      <Grid2 container spacing={2}>
                        <Grid2 size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="Enter participant name"
                            value={
                              formData[competitionIndex]?.[participantIndex]
                                ?.name || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                competitionIndex,
                                participantIndex,
                                "name",
                                e.target.value
                              )
                            }
                            error={
                              !!errors[competitionIndex]?.[participantIndex]
                                ?.name
                            }
                            helperText={
                              errors[competitionIndex]?.[participantIndex]?.name
                            }
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="Enter participant contact number"
                            value={
                              formData[competitionIndex]?.[participantIndex]
                                ?.phone || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                competitionIndex,
                                participantIndex,
                                "phone",
                                e.target.value
                              )
                            }
                            error={
                              !!errors[competitionIndex]?.[participantIndex]
                                ?.phone
                            }
                            helperText={
                              errors[competitionIndex]?.[participantIndex]
                                ?.phone
                            }
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="Enter participant email"
                            value={
                              formData[competitionIndex]?.[participantIndex]
                                ?.email || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                competitionIndex,
                                participantIndex,
                                "email",
                                e.target.value
                              )
                            }
                            error={
                              !!errors[competitionIndex]?.[participantIndex]
                                ?.email
                            }
                            helperText={
                              errors[competitionIndex]?.[participantIndex]
                                ?.email
                            }
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Enter college name"
                            value={
                              formData[competitionIndex]?.[participantIndex]
                                ?.college || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                competitionIndex,
                                participantIndex,
                                "college",
                                e.target.value
                              )
                            }
                            error={
                              !!errors[competitionIndex]?.[participantIndex]
                                ?.college
                            }
                            helperText={
                              errors[competitionIndex]?.[participantIndex]
                                ?.college
                            }
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Enter course"
                            value={
                              formData[competitionIndex]?.[participantIndex]
                                ?.course || ""
                            }
                            onChange={(e) =>
                              handleInputChange(
                                competitionIndex,
                                participantIndex,
                                "course",
                                e.target.value
                              )
                            }
                            error={
                              !!errors[competitionIndex]?.[participantIndex]
                                ?.course
                            }
                            helperText={
                              errors[competitionIndex]?.[participantIndex]
                                ?.course
                            }
                            required
                          />
                        </Grid2>
                      </Grid2>
                    </Paper>
                  ))}
                </Grid2>
              </Paper>
            </Grid2>
          ))}
        <Grid2 size={{ xs: 12 }}>
          <Button
            onClick={handleSubmit}
            fullWidth
            color="secondary"
            sx={{ p: 1, fontFamily: "Segoe UI", fontWeight: "900" }}
          >
            Submit
          </Button>
        </Grid2>
      </Grid2>
    </Box>
  );
}
