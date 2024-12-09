import { Box, TextField } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import BlogSection from "../Components/Home/BlogSection";
import { useContext } from "react";
import { StudentContext } from "../Context";
import { useEffect } from "react";

export default function Blogs() {
  const { viewColleges, colleges, blogs, viewAllBlogs, host, student } =
    useContext(StudentContext);
  useEffect(() => {
    viewAllBlogs();
    viewColleges();
  }, []);
  return (
    <Box>
      <Box>
        <PageBanner title="Blogs" />
      </Box>
      <Box>
        <BlogSection
          blogs={blogs}
          host={host}
          student={student}
          subTitle={"Blog Posts"}
          colleges={colleges}
        />
      </Box>
    </Box>
  );
}
