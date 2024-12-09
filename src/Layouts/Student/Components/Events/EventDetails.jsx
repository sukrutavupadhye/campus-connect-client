import React from "react";
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Avatar,
  CardMedia,
  Paper,
  Tooltip,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import YouTubeIcon from "@mui/icons-material/YouTube";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  boxShadow: 24,
  //   p: 4,
};
export default function EventDetails({ event, host }) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const isValidYouTubeLink = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const YouTubeLinkDisplay = ({ row }) => {
    return (
      <>
        {row?.youtubeLink && isValidYouTubeLink(row.youtubeLink) && (
          <Tooltip arrow title="click to view video in youtube">
            <IconButton
              component="a"
              href={`${row.youtubeLink}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <YouTubeIcon color="error" />
            </IconButton>
          </Tooltip>
        )}
      </>
    );
  };
  return (
    <Box sx={{ bgcolor: "background.paper", py: 6 }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={`${host}/eventUploads/student/${event?.poster}`}
            style={{ width: "300px" }}
          />
        </Box>
      </Modal>
      <Container>
        <Grid container spacing={4}>
          {/* Profile Image & Social Links */}
          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                // maxWidth: 300,
                borderRadius: 1,
                overflow: "hidden",
                // boxShadow: 3,
                position: "relative",
              }}
            >
              {/* Profile Image */}
              <Box />
              <CardMedia
                onClick={handleOpen}
                image={`${host}/eventUploads/student/${event?.poster}`}
                sx={{
                  minHeight: 500,
                  //   width: "100%",
                }}
              />
              {/* Name, Position, and Social Links */}
              <Box sx={{ textAlign: "center", p: 2 }}>
                <Typography variant="h5" sx={{ mb: 1, fontFamily: "Segoe UI" }}>
                  {event?.title}
                </Typography>
                {/* <Typography
                  variant="subtitle1"
                  sx={{ mb: 2, color: "text.secondary" }}
                >
                  {event?.college?.collegeName}
                </Typography> */}
              </Box>
            </Box>
          </Grid>

          {/* About, Education, Experience */}
          <Grid item xs={12} md={7}>
            <Box sx={{ pl: { md: 4 } }}>
              <Box mb={4}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontFamily: "Segoe UI" }}
                  >
                    About Event
                  </Typography>
                  <YouTubeLinkDisplay row={event} />
                </Box>
                <Typography
                  sx={{ fontFamily: "Segoe UI" }}
                  variant="body1"
                  color="text.secondary"
                >
                  {event?.description}
                </Typography>
              </Box>
              <Box mb={4}>
                <List
                  component={Paper}
                  elevation={0}
                  sx={
                    {
                      // p: 3,
                      // width: "100%",
                      // maxWidth: 360,
                      // bgcolor: "background.paper",
                    }
                  }
                >
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          Event Place
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          {event?.place}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          Event Date
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          {event?.eDate}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          Entry Fees
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          {`₹ ${event?.entryFees}`}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText
                      primary={
                        <Typography
                          variant="body1"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          Last date for Registration
                        </Typography>
                      }
                      secondary={
                        <Typography
                          variant="subtitle2"
                          sx={{ fontFamily: "Segoe UI" }}
                        >
                          {event?.lastDate}
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
              </Box>
              <Box mb={4}>
                <Typography variant="h6" sx={{ mb: 1, fontFamily: "Segoe UI" }}>
                  College
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ fontFamily: "Segoe UI" }}
                >
                  {event?.college?.collegeName}, {event?.college?.collegePlace}
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
