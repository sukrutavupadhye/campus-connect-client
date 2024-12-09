import { Box, Paper, Typography } from "@mui/material";
import React from "react";
import BlogTable from "../Components/Blog/BlogTable";
import BlogForm from "../Components/Blog/BlogForm";
import { useContext } from "react";
import { CollegeContext } from "../Context";
import { useEffect } from "react";

export default function Blogs() {
  const { getBlogs, blogs, host } = useContext(CollegeContext);
  useEffect(() => {
    getBlogs();
  }, []);
  return (
    <Paper sx={{ p: 4, borderRadius: "30px" }} elevation={0}>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography
          variant="h6"
          sx={{
            color: "#a42b34",
            fontWeight: "600",
            fontFamily: "Segoe UI",
          }}
        >
          Blogs
        </Typography>
        <BlogForm />
      </Box>
      <BlogTable blogs={blogs} host={host} />
    </Paper>
  );
}
