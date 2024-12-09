import { Box } from "@mui/material";
import React, { useContext } from "react";
import Hero from "../Components/Home/Hero";
import AboutContent from "../Components/Home/AboutContent";
import CounterBanner from "../Components/Home/CounterBanner";
import BannerSection from "../Components/Home/BannerSection";
import BlogSection from "../Components/Home/BlogSection";
import { StudentContext } from "../Context";
import { useEffect } from "react";

export default function Home() {
  const { student, host, blogs, viewAllBlogs } = useContext(StudentContext);
  useEffect(() => {
    viewAllBlogs();
  }, []);
  console.log(student);
  return (
    <Box>
      <Box>
        <Hero student={student} host={host} />
      </Box>
      <Box sx={{ pt: 3 }}>
        <AboutContent />
      </Box>
      <Box sx={{}}>
        <BannerSection />
      </Box>
      <Box sx={{ pt: 0 }}>
        <CounterBanner />
      </Box>
      {blogs?.length >= 3 && (
        <Box sx={{ py: 0 }}>
          <BlogSection
            blogs={blogs?.slice().reverse().slice(0, 3)}
            host={host}
            student={student}
          />
        </Box>
      )}
    </Box>
  );
}
