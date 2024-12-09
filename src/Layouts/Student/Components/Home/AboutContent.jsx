import React from "react";
import { Box, Container, Grid, Typography, Button } from "@mui/material";
import { styled } from "@mui/system";
import about1 from "../../Assets/Images/about-1.jpg";
import about from "../../Assets/Images/ab.jpg";
// Custom styling for background images
const ImageBox = styled(Box)({
  height: "400px",
  backgroundSize: "cover",
  backgroundPosition: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginBottom: "20px",
  // borderRadius: "30% 70% 70% 30% / 51% 42% 58% 49% ",
  // boxShadow: "10px 20px 25px grey inset",
  border: "1px solid white",
});

const AboutContent = () => {
  return (
    <Box sx={{ py: 5 }}>
      <Container>
        <Grid container spacing={5}>
          {/* Images Section */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <ImageBox sx={{ backgroundImage: `url(${about})` }} />
              </Grid>
              {/* <Grid item xs={12}>
                <ImageBox sx={{ backgroundImage: `url(${about})` }} />
              </Grid> */}
            </Grid>
          </Grid>
          {/* Text Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ pl: { md: 5 }, py: { xs: 3, md: 5 } }}>
              {/* <Typography
                variant="subtitle1"
                color="secondary"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "600",
                }}
                gutterBottom
              >
                Enhance Your Skills
              </Typography> */}
              <Typography
                variant="h3"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "600",
                }}
                gutterBottom
              >
                Learn Anything You Want Today
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Segoe UI",
                }}
              >
                At Campus Connect, our vision is to create a unified platform
                that transforms how students and colleges connect, collaborate,
                and grow. We aim to be the driving force behind enriching
                student experiences, fostering inter-college unity, and
                empowering communities through shared opportunities and
                impactful events. By bridging the gap between institutions and
                individuals, we strive to build a vibrant ecosystem where
                learning and creativity know no bounds
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default AboutContent;
