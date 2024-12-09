import React from "react";
import {
  Grid,
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  CardContent,
  IconButton,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Pagination,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import ApartmentIcon from "@mui/icons-material/Apartment";
import moment from "moment";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import noBlog from "../../Assets/Images/no-blog.png";
const BlogSection = ({ blogs, host, student, subTitle, colleges }) => {
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9; // Number of events per page

  useEffect(() => {
    const filtered = blogs
      .filter((blog) => {
        const matchesCollege =
          selectedCollege !== "All"
            ? blog.college?._id === selectedCollege
            : true;
        const matchesSearch =
          search !== ""
            ? blog?.title?.toLowerCase().includes(search?.toLowerCase())
            : true;
        return matchesCollege && matchesSearch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date, latest first

    setFilteredBlogs(filtered);
  }, [search, selectedCollege, blogs]);

  // Pagination Logic
  const indexOfLastEvent = currentPage * blogsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstEvent, indexOfLastEvent);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };
  const blogsToBeMapped = subTitle == "Blog Posts" ? currentBlogs : blogs;
  return (
    <Box sx={{ backgroundColor: "#f8f9fa", p: 10 }}>
      <Box textAlign="center" mb={5}>
        <Typography
          variant="subtitle1"
          sx={{ color: "gray", fontFamily: "Segoe UI", fontWeight: "600" }}
        >
          Our Blog
        </Typography>
        <Typography
          variant="h3"
          sx={{
            fontWeight: "bold",
            mb: 2,
            fontFamily: "Segoe UI",
            fontWeight: "600",
          }}
        >
          {subTitle == "Blog Posts" ? "Blog Posts" : "Recent Blog Posts"}
        </Typography>
      </Box>
      {subTitle == "Blog Posts" && (
        <Box sx={{ p: 5 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={8}>
              <TextField
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                sx={{ fontFamily: "Segoe UI" }}
                type="search"
                fullWidth
                placeholder="search blog by title here"
                label="Search blog here..."
              />
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Filter by college
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={selectedCollege}
                  label="Filter by college"
                  onChange={(e) => setSelectedCollege(e.target.value)}
                >
                  <MenuItem value={"All"}>All</MenuItem>
                  {colleges.map((college, index) => (
                    <MenuItem value={college?._id} key={index}>
                      {college?.collegeName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      )}
      <Grid container spacing={2}>
        {blogsToBeMapped?.length > 0 ? (
          blogsToBeMapped?.map((post, index) => (
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
                      <ApartmentIcon sx={{ fontSize: "20px", color: "grey" }} />
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
          ))
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              width: "100%",
            }}
          >
            <img src={noBlog} style={{ width: "300px" }} alt="noBlog" />
            <Typography
              color="text.secondary"
              variant="caption"
              sx={{ fontFamily: "Segoe UI" }}
            >
              No posts found!
            </Typography>
          </Box>
        )}
      </Grid>
      {subTitle == "Blog Posts" && (
        <Box mt={4} display="flex" justifyContent="center">
          <Pagination
            count={Math.ceil(filteredBlogs.length / blogsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};

export default BlogSection;
