import {
  Box,
  Container,
  Grid,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../../Assets/Images/lg.png";

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundImage:
          "linear-gradient(87deg, #d7992270 -31%, #f13c208a 64%, #a0b1f29e 103%)",
        padding: "50px 0",
      }}
    >
      <Container>
        {/* Main Grid Section */}
        <Grid container spacing={5}>
          {/* About Section */}
          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ pt: 5 }}>
              {/* <Typography
                variant="h4"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "900",
                  color: "white",
                }}
                gutterBottom
              >
                CampusConnect
              </Typography> */}
              <img src={logo} style={{ width: "200px" }} />
              <Typography
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "600",
                  color: "white",
                }}
                variant="body2"
                paragraph
              >
                the ultimate platform for linking students and colleges
              </Typography>
              {/* <Box sx={{ display: "flex", gap: 2 }}>
                <Link to="#">
                  <FaTwitter />
                </Link>
                <Link to="#">
                  <FaFacebook />
                </Link>
                <Link to="#">
                  <FaInstagram />
                </Link>
              </Box> */}
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Box sx={{ pt: 5 }}>
              <Typography
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "900",
                  color: "#bd0924",
                }}
                variant="h6"
                gutterBottom
              >
                Quick Links
              </Typography>
              <List>
                {[
                  { title: "Home", path: "/" },
                  { title: "About", path: "/About" },
                  { title: "Events", path: "/Events" },
                  { title: "Blog", path: "/Blog" },
                ].map((item, index) => (
                  <ListItem key={index} sx={{ padding: 0 }}>
                    <ListItemText>
                      <Link
                        to={item.path}
                        style={{
                          display: "block",
                          py: 1,
                          textDecoration: "none",
                        }}
                      >
                        <Typography
                          sx={{
                            fontFamily: "Segoe UI",
                            fontWeight: "600",
                            color: "white",
                            ":hover": {
                              color: "#bd0924",
                            },
                            transition: "0.5s ease",
                          }}
                        >
                          {item.title}
                        </Typography>
                      </Link>
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>

        {/* Footer Bottom */}
        <Box sx={{ textAlign: "center", marginTop: "30px" }}>
          <Typography
            variant="body2"
            sx={{
              fontFamily: "Segoe UI",
              fontWeight: "600",
              color: "white",
            }}
          >
            Copyright © {new Date().getFullYear()} All rights reserved
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
