import React from "react";
import {
  Container,
  Grid,
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Checkbox,
  TextField,
  Button,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import noResult from "../../Assets/Images/no-result.png";
export default function EventsContainer({ host, events, student }) {
  console.log(events);
  return (
    <Grid container spacing={3}>
      {events?.length > 0 ? (
        events?.map((event, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Card
              component={Link}
              to={student ? `/view-competitions/${event?._id}` : "/login"}
              sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                textDecoration: "none",
                transition:
                  "background-color 0.3s ease-in-out, transform 0.5s ease-in-out, box-shadow 0.5s ease-in-out", // Smooth transition
                "&:hover": {
                  backgroundColor: "#f9edff", // Hover background color
                  transform: "scale(1.01, 1.01)", // Hover scale effect
                  boxShadow: 5,
                },
              }}
            >
              <CardMedia
                // component="div"
                image={`${host}/eventUploads/student/${event?.poster}`}
                sx={{
                  height: 350,
                  // backgroundImage: `url(${host}/eventUploads/student/${event?.poster})`,
                  // backgroundSize: "cover",
                }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography
                  variant="h6"
                  sx={{
                    color: "text.primary",
                    fontFamily: "Segoe UI",
                    textDecoration: "none",
                  }}
                >
                  {event?.title}
                </Typography>
                <Typography
                  sx={{ fontFamily: "Segoe UI" }}
                  variant="body2"
                  color="textSecondary"
                >
                  {event?.college?.collegeName}
                </Typography>
                <Typography
                  sx={{ fontFamily: "Segoe UI" }}
                  variant="caption"
                  color="textSecondary"
                >
                  {event?.place}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={1}>
                  <Typography sx={{ fontFamily: "Segoe UI" }} variant="body2">
                    <span className="flaticon-shower" /> {event?.eDate}
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Segoe UI" }}
                    variant="subtitle"
                    color="primary"
                  >
                    Entry fees ₹ {event?.entryFees}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))
      ) : (
        <Grid
          item
          xs={12}
          sm={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <img src={noResult} style={{ width: "300px" }} />
          <Typography
            color="text.secondary"
            variant="subtitle"
            sx={{ fontFamily: "Segoe UI", fontWeight: "600" }}
          >
            No result found!
          </Typography>
        </Grid>
      )}
    </Grid>
  );
}
