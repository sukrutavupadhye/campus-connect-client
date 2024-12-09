import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import BlogDetails from "../Components/BlogDetails";
import { useContext } from "react";
import { StudentContext } from "../Context";
import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ApartmentIcon from "@mui/icons-material/Apartment";
import moment from "moment";
const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  color: theme.palette.text.secondary,
  "& > :not(style) ~ :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const DividerText = styled(Typography)(({ theme }) => ({
  textAlign: "center",
  wordBreak: "break-word", // Ensures long words wrap
  overflowWrap: "break-word", // Handles long unbreakable text
  fontSize: "clamp(0.875rem, 2vw, 1.01rem)", // Responsive font size
  fontFamily: "Segoe UI",
}));

export default function SingleBlog() {
  const { id } = useParams();
  const { singleBlog, singleBlogData, host, otherBlogs, student } =
    useContext(StudentContext);

  useEffect(() => {
    singleBlog(id);
  }, [id]);

  return (
    <Box>
      <Box>
        <PageBanner title="Blog Details" />
      </Box>
      <Box sx={{ p: 5 }}>
        <BlogDetails details={singleBlogData} host={host} />
        {otherBlogs?.length >= 3 && (
          <Root>
            <Divider>
              <DividerText component={Typography} variant="body1">
                Recent blog posts by {singleBlogData?.college?.collegeName}
              </DividerText>
            </Divider>
          </Root>
        )}
        <Box sx={{ py: 5 }}>
          <Grid container spacing={2}>
            {otherBlogs?.length >= 3 &&
              otherBlogs
                ?.slice()
                ?.reverse()
                ?.slice(0, 4)
                ?.map((post, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Card sx={{ boxShadow: 0 }}>
                      <CardMedia
                        image={`${host}/blogUploads/college/${post?.picture}`}
                        sx={{
                          height: 300,
                        }}
                      />
                      <CardContent>
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
                            <CalendarTodayIcon
                              sx={{ fontSize: "15px", color: "grey" }}
                            />
                            <Typography
                              color="text.secondary"
                              sx={{ fontFamily: "Segoe UI" }}
                              variant="body2"
                            >
                              {moment(post?.createdAt).fromNow()}
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
                              {post?.college?.collegeName}
                            </Typography>
                            <ApartmentIcon
                              sx={{ fontSize: "20px", color: "grey" }}
                            />
                          </Box>
                          {/* <Box sx={{ display: "flex", alignItems: "center" }}>
                    <FaComment style={{ marginRight: 4 }} />
                    <Typography variant="body2">{post?.comments}</Typography>
                  </Box> */}
                        </Box>

                        <Typography
                          component={Link}
                          to={student ? `/view-blog/${post?._id}` : `/login`}
                          sx={{
                            fontFamily: "Segoe UI",
                            textOverflow: "ellipsis",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textDecoration: "none",
                          }}
                          variant="h6"
                          gutterBottom
                        >
                          {post?.title?.length > 40 // Adjust the length as needed
                            ? `${post.title.substring(0, 35)}...`
                            : post?.title}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}
