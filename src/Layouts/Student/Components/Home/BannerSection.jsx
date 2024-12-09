import { Box, Container, Grid2, Typography } from "@mui/material";
import bg_2 from "../../Assets/Images/ab3.jpg";
const BannerSection = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid2 container spacing={0}>
        <Grid2 sx={{ width: "100%" }} size={{ xs: 12, sm: 7 }}>
          <Box
            sx={{
              backgroundColor: "#f4f4f4",
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              px: 5,
            }}
          >
            <Box sx={{ width: "90%" }}>
              <Grid2 container spacing={2} alignItems="center">
                {/* Text Content */}
                <Grid2 item xs={12} md={8}>
                  <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 1, fontFamily: "Segoe UI", fontWeight: "600" }}
                  >
                    Welcome to CampusConnect
                  </Typography>
                  <Typography
                    variant="h3"
                    sx={{ mb: 4, fontFamily: "Segoe UI", fontWeight: "600" }}
                  >
                    We Are CampusConnect, An Online College event management
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Segoe UI" }}
                    variant="body1"
                    paragraph
                  >
                    Students love *Campus Connect* for enhancing college life by
                    connecting them with events, workshops, and competitions. It
                    offers easy registration and real-time updates, while
                    fostering collaboration on creative projects.
                  </Typography>
                  <Typography
                    sx={{ fontFamily: "Segoe UI" }}
                    variant="body1"
                    paragraph
                  >
                    Students can showcase talents, gain recognition, and unlock
                    opportunities. With its user-friendly interface and vibrant
                    community, Campus Connect blends learning, fun, and
                    networking, creating meaningful connections.
                  </Typography>
                </Grid2>
              </Grid2>
            </Box>
          </Box>
        </Grid2>
        <Grid2 size={{ xs: 12, sm: 5 }}>
          <Box
            sx={{
              backgroundImage: `url(${bg_2})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              zIndex: 0,
              width: "100%",
              height: "70vh",
            }}
          />
        </Grid2>
      </Grid2>
    </Box>
  );
};

export default BannerSection;
