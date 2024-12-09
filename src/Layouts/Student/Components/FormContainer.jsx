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
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
export default function FormContainer({ singleCompetition }) {
  const { removeFromList } = useContext(StudentContext);
  const [formData, setFormData] = useState(
    Array.from({ length: singleCompetition?.groupMembers || 0 }, () => ({
      name: "",
      phone: "",
      email: "",
      college: "",
      course: "",
    }))
  );

  const [errors, setErrors] = useState(() => {
    // return Array.from({ length: list.length }, () =>
    //   Array.from(
    //     { length: list[0]?.competition?.groupMembers || 0 },
    //     () => ({})
    //   )
    // );
  });

  const handleSubmit = () => {
    // Handle successful submission
    const formattedData = {
      competition: singleCompetition._id,
      participants: formData.map((participant) => ({
        name: participant.name,
        phone: participant.phone,
        email: participant.email,
        college: participant.college,
        course: participant.course,
      })),
    };

    console.log("Formatted Data:", formattedData); // Debug or send to server

    // Submit form logic goes here
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 spacing={1} container>
        <Grid2 size={{ xs: 12 }}>
          <Paper sx={{ p: 4, flexGrow: 1 }} elevation={1}>
            <Box sx={{ flexGrow: 1 }}>
              <Grid2 spacing={2} container>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <List
                    sx={{
                      width: "100%",
                      bgcolor: "background.paper",
                    }}
                  >
                    <ListItem>
                      <ListItemText
                        primary="Competition"
                        secondary={singleCompetition?.title}
                      />
                    </ListItem>
                  </List>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <List
                    sx={{
                      width: "100%",
                    }}
                  >
                    <ListItem sx={{ textAlign: "center" }}>
                      <ListItemText
                        primary="Place"
                        secondary={singleCompetition?.event?.place}
                      />
                    </ListItem>
                  </List>
                </Grid2>
                <Grid2 size={{ xs: 12, sm: 4 }}>
                  <List
                    sx={{
                      width: "100%",
                    }}
                  >
                    <ListItem
                      sx={{
                        textAlign: "right",
                      }}
                    >
                      <ListItemText
                        primary="Date"
                        secondary={singleCompetition?.event?.eDate}
                      />
                    </ListItem>
                  </List>
                </Grid2>
                <Divider sx={{ py: 2, overflow: "auto" }}>
                  <Typography
                    gutterBottom
                    sx={{ fontFamily: "Segoe UI" }}
                    variant="body2"
                  >
                    Total participants - {singleCompetition?.groupMembers}
                  </Typography>
                </Divider>
                {singleCompetition?.isGrouped ? (
                  Array.from({
                    length: singleCompetition?.groupMembers || 0,
                  }).map((_, participantIndex) => (
                    <Paper sx={{ flexGrow: 1, p: 3 }} elevation={1}>
                      <Typography
                        gutterBottom
                        sx={{ fontFamily: "Segoe UI" }}
                        variant="body2"
                      >
                        Participant - {participantIndex + 1}
                      </Typography>
                      <Grid2 spacing={2} container>
                        <Grid2 size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="Enter participant name"
                            value={formData?.name || ""}
                            error={!!errors?.name}
                            helperText={errors?.name}
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="Enter participant contact number"
                            value={formData?.phone || ""}
                            error={!!errors?.phone}
                            helperText={errors?.phone}
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 4 }}>
                          <TextField
                            fullWidth
                            label="Enter participant email"
                            value={formData?.email || ""}
                            error={!!errors?.email}
                            helperText={errors?.email}
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Enter college name"
                            value={formData?.college || ""}
                            error={!!errors?.college}
                            helperText={errors?.college}
                            required
                          />
                        </Grid2>
                        <Grid2 size={{ xs: 12, sm: 6 }}>
                          <TextField
                            fullWidth
                            label="Enter course"
                            value={formData?.course || ""}
                            error={!!errors?.course}
                            helperText={errors?.course}
                            required
                          />
                        </Grid2>
                      </Grid2>
                    </Paper>
                  ))
                ) : (
                  <Paper sx={{ flexGrow: 1, p: 3 }} elevation={1}>
                    <Typography
                      gutterBottom
                      sx={{ fontFamily: "Segoe UI" }}
                      variant="body2"
                    >
                      Total participants - {singleCompetition?.groupMembers}
                    </Typography>
                    <Grid2 spacing={2} container>
                      <Grid2 size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Enter participant name"
                          value={formData?.name || ""}
                          error={!!errors?.name}
                          helperText={errors?.name}
                          required
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Enter participant contact number"
                          value={formData?.phone || ""}
                          error={!!errors?.phone}
                          helperText={errors?.phone}
                          required
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 4 }}>
                        <TextField
                          fullWidth
                          label="Enter participant email"
                          value={formData?.email || ""}
                          error={!!errors?.email}
                          helperText={errors?.email}
                          required
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Enter college name"
                          value={formData?.college || ""}
                          error={!!errors?.college}
                          helperText={errors?.college}
                          required
                        />
                      </Grid2>
                      <Grid2 size={{ xs: 12, sm: 6 }}>
                        <TextField
                          fullWidth
                          label="Enter course"
                          value={formData?.course || ""}
                          error={!!errors?.course}
                          helperText={errors?.course}
                          required
                        />
                      </Grid2>
                    </Grid2>
                  </Paper>
                )}

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
            {/* <Divider sx={{ py: 2, overflow: "auto" }}>
              <Box>
                <Typography sx={{ fontFamily: "Segoe UI" }} variant="subtitle2">
                  Competition - {singleCompetition?.title} from{" "}
                  {singleCompetition?.event?.title} in{" "}
                  {singleCompetition?.event?.place}
                </Typography>
                <Typography sx={{ fontFamily: "Segoe UI" }} variant="subtitle2">
                  Total participants - {singleCompetition?.groupMembers}
                </Typography>
              </Box>
            </Divider> */}

            {/* <Grid2 container spacing={2}>
              {Array.from({
                length: singleCompetition?.groupMembers || 0,
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
                        value={formData?.name || ""}
                        error={!!errors?.name}
                        helperText={errors?.name}
                        required
                      />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        label="Enter participant contact number"
                        value={formData?.phone || ""}
                        error={!!errors?.phone}
                        helperText={errors?.phone}
                        required
                      />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 4 }}>
                      <TextField
                        fullWidth
                        label="Enter participant email"
                        value={formData?.email || ""}
                        error={!!errors?.email}
                        helperText={errors?.email}
                        required
                      />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Enter college name"
                        value={formData?.college || ""}
                        error={!!errors?.college}
                        helperText={errors?.college}
                        required
                      />
                    </Grid2>
                    <Grid2 size={{ xs: 12, sm: 6 }}>
                      <TextField
                        fullWidth
                        label="Enter course"
                        value={formData?.course || ""}
                        error={!!errors?.course}
                        helperText={errors?.course}
                        required
                      />
                    </Grid2>
                  </Grid2>
                </Paper>
              ))}
            </Grid2> */}
          </Paper>
        </Grid2>
      </Grid2>
    </Box>
  );
}
