import { Box } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import AboutContent from "../Components/Home/AboutContent";
import CounterBanner from "../Components/Home/CounterBanner";
import BannerSection from "../Components/Home/BannerSection";

export default function About() {
  return (
    <Box>
      <Box>
        <PageBanner title="About Us" />
      </Box>
      <Box sx={{ py: 5 }}>
        <AboutContent />
      </Box>
      <Box sx={{ py: 0 }}>
        <BannerSection />
      </Box>
      <Box sx={{ py: 0 }}>
        <CounterBanner />
      </Box>
    </Box>
  );
}
