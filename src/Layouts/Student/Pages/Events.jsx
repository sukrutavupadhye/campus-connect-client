import {
  Box,
  Container,
  Grid,
  Typography,
  Checkbox,
  TextField,
  FormControlLabel,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState, useContext } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PageBanner from "../Components/PageBanner";
import EventsContainer from "../Components/Events/EventsContainer";
import { StudentContext } from "../Context";

export default function Events() {
  const { viewColleges, viewEvents, colleges, events, host, student } =
    useContext(StudentContext);
  const [search, setSearch] = useState("");
  const [selectedCollege, setSelectedCollege] = useState("All");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 4; // Number of events per page

  useEffect(() => {
    viewColleges();
    viewEvents();
  }, []);

  useEffect(() => {
    // Sort events by date (latest first), filter based on search and selected college
    const filtered = events
      .filter((event) => {
        const matchesCollege =
          selectedCollege !== "All"
            ? event.college?._id === selectedCollege
            : true;
        const matchesSearch =
          search !== ""
            ? event?.title?.toLowerCase().includes(search?.toLowerCase())
            : true;
        return matchesCollege && matchesSearch;
      })
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by date, latest first

    setFilteredEvents(filtered);
  }, [search, selectedCollege, events]);

  // Pagination Logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = filteredEvents.slice(
    indexOfFirstEvent,
    indexOfLastEvent
  );

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box>
      <PageBanner title="Events" />
      <Box sx={{ mt: 4 }}>
        <Container maxWidth="lg" sx={{ py: 4, bgcolor: "background.paper" }}>
          <Grid container spacing={3}>
            {/* Search Bar */}
            <Grid item xs={12} md={12}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  backgroundColor: "white",
                  mb: 2,
                }}
              >
                <SearchIcon sx={{ mr: 1 }} />
                <TextField
                  type="search"
                  placeholder="Search events here..."
                  variant="standard"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  sx={{ fontFamily: "Segoe UI", width: "75%" }}
                />
              </Box>
            </Grid>

            {/* Sidebar - College Filter */}
            <Grid item xs={12} md={3}>
              <Typography
                variant="subtitle1"
                sx={{ fontFamily: "Segoe UI", mb: 1 }}
              >
                Filter by college
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedCollege === "All"}
                      onChange={() => setSelectedCollege("All")}
                    />
                  }
                  label={
                    <Typography
                      variant="subtitle2"
                      sx={{ fontFamily: "Segoe UI" }}
                    >
                      All
                    </Typography>
                  }
                />
                {colleges.map((college, index) => (
                  <FormControlLabel
                    key={index}
                    control={
                      <Checkbox
                        checked={selectedCollege === college._id}
                        onChange={() => setSelectedCollege(college._id)}
                      />
                    }
                    label={
                      <Typography
                        variant="subtitle2"
                        sx={{ fontFamily: "Segoe UI" }}
                      >
                        {college?.collegeName}
                      </Typography>
                    }
                  />
                ))}
              </Box>
            </Grid>

            {/* Events Container */}
            <Grid item xs={12} md={9}>
              <EventsContainer
                student={student}
                events={currentEvents}
                host={host}
              />
              <Box mt={4} display="flex" justifyContent="center">
                <Pagination
                  count={Math.ceil(filteredEvents.length / eventsPerPage)}
                  page={currentPage}
                  onChange={handlePageChange}
                  variant="outlined"
                  color="primary"
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
