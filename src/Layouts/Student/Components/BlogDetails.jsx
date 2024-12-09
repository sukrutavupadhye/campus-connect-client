import { Box, Container, Grid2, Typography } from "@mui/material";
import React from "react";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ApartmentIcon from "@mui/icons-material/Apartment";
import moment from "moment";
export default function BlogDetails({ details, host }) {
  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <img
            src={`${host}/blogUploads/college/${details?.picture}`}
            alt="picture"
            style={{ width: "100%" }}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 1,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              <CalendarTodayIcon sx={{ fontSize: "15px", color: "grey" }} />
              <Typography
                color="text.secondary"
                sx={{ fontFamily: "Segoe UI" }}
                variant="body2"
              >
                {moment(details?.createdAt).fromNow()}
              </Typography>
            </Box>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                gap: 1,
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ fontFamily: "Segoe UI" }}
              >
                {details?.college?.collegeName} -{" "}
                {details?.college?.collegePlace}
              </Typography>
              <ApartmentIcon sx={{ fontSize: "20px", color: "grey" }} />
            </Box>
            {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FaComment style={{ marginRight: 4 }} />
                    <Typography variant="body2">{post?.comments}</Typography>
                  </Box> */}
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 6 }}>
          <Box>
            <Typography
              variant="h5"
              sx={{ fontWeight: "600", fontFamily: "Segoe UI" }}
            >
              {details?.title}
            </Typography>
          </Box>
          <Box sx={{ py: 3 }}>
            <Typography
              variant="body1"
              sx={{ fontFamily: "Segoe UI", textAlign: "justify" }}
            >
              {details?.firstDescription}
            </Typography>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 12 }}>
          <Box sx={{ py: 3 }}>
            <Typography
              variant="body1"
              sx={{ fontFamily: "Segoe UI", textAlign: "justify" }}
            >
              {details?.secondDescription}
            </Typography>
          </Box>
        </Grid2>
      </Grid2>
    </Box>
  );
}
