import React, { useEffect, useState } from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { styled } from "@mui/system";
import bg_4 from "../../Assets/Images/ab.jpg";
// Custom styling for the section with background image and overlay
const CounterSection = styled(Box)({
  backgroundImage: `url(${bg_4})`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  position: "relative",
  padding: "60px 0",
  color: "white",
  backgroundAttachment: "fixed",
});

const Overlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "linear-gradient(135deg, #d799227d 0%, #efe2baf0 100%)",
  zIndex: 1,
});

const CounterWrap = styled(Box)({
  zIndex: 2,
  display: "flex",
  alignItems: "center",
});

const CounterIcon = styled(Box)({
  fontSize: "50px",
  marginRight: "20px",
});

// Function to animate counters
const useCountUp = (endValue, duration) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(endValue);
    if (start === end) return;

    const incrementTime = Math.abs(Math.floor(duration / end));
    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);

    return () => clearInterval(timer);
  }, [endValue, duration]);

  return count;
};

const CounterBanner = () => {
  const courses = useCountUp(400, 2000);
  const students = useCountUp(4500, 2000);
  const instructors = useCountUp(1200, 2000);
  const contentHours = useCountUp(300, 2000);

  return (
    <CounterSection>
      <Overlay />
      <Container sx={{ position: "relative", zIndex: 2 }}>
        <Grid container spacing={5}>
          {/* Counter 1 */}
          <Grid item xs={12} md={3}>
            <CounterWrap>
              <CounterIcon>
                <span className="flaticon-online" />
              </CounterIcon>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "900",
                    color: "white",
                  }}
                  variant="h3"
                  component="div"
                >
                  {courses}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    color: "white",
                  }}
                  variant="subtitle1"
                >
                  Online Courses
                </Typography>
              </Box>
            </CounterWrap>
          </Grid>
          {/* Counter 2 */}
          <Grid item xs={12} md={3}>
            <CounterWrap>
              <CounterIcon>
                <span className="flaticon-graduated" />
              </CounterIcon>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "900",
                    color: "white",
                  }}
                  variant="h3"
                  component="div"
                >
                  {students}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    color: "white",
                  }}
                  variant="subtitle1"
                >
                  Students Enrolled
                </Typography>
              </Box>
            </CounterWrap>
          </Grid>
          {/* Counter 3 */}
          <Grid item xs={12} md={3}>
            <CounterWrap>
              <CounterIcon>
                <span className="flaticon-instructor" />
              </CounterIcon>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "900",
                    color: "white",
                  }}
                  variant="h3"
                  component="div"
                >
                  {instructors}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    color: "white",
                  }}
                  variant="subtitle1"
                >
                  Experts Instructors
                </Typography>
              </Box>
            </CounterWrap>
          </Grid>
          {/* Counter 4 */}
          <Grid item xs={12} md={3}>
            <CounterWrap>
              <CounterIcon>
                <span className="flaticon-tools" />
              </CounterIcon>
              <Box>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "900",
                    color: "white",
                  }}
                  variant="h3"
                  component="div"
                >
                  {contentHours}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    color: "white",
                  }}
                  variant="subtitle1"
                >
                  Hours Content
                </Typography>
              </Box>
            </CounterWrap>
          </Grid>
        </Grid>
      </Container>
    </CounterSection>
  );
};

export default CounterBanner;
