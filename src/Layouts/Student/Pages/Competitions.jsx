import {
  Box,
  Button,
  Container,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageBanner from "../Components/PageBanner";
import EventDetails from "../Components/Events/EventDetails";
import CompetitionCard from "../Components/Events/CompetitionCard";
import { StudentContext } from "../Context";

export default function Competitions() {
  const {
    viewSingleEventDetails,
    singleEvent,
    competitions,
    host,
    student,
    list,
  } = useContext(StudentContext);
  const { id } = useParams();
  const [page, setPage] = useState(1);
  const itemsPerPage = 3; // Set the number of items per page

  useEffect(() => {
    viewSingleEventDetails(id);
  }, [id]);

  // Calculate total pages based on items per page
  const totalPages = Math.ceil(competitions.length / itemsPerPage);

  // Slice competitions to only show the current page's items
  const paginatedCompetitions = competitions.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  );

  // Handle page change
  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <PageBanner title="Event Details" />
      <EventDetails event={singleEvent} host={host} />
      <Box sx={{ bgcolor: "background.paper", py: 6 }}>
        {competitions.length > 0 && (
          <>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                p: 2,
              }}
            >
              <Typography
                sx={{ fontFamily: "Segoe UI" }}
                color="text.secondary"
                variant="body2"
              >
                Competitions
              </Typography>
            </Box>
            <Container>
              <Grid container spacing={4}>
                {paginatedCompetitions.map((competition, index) => (
                  <Grid item xs={12} key={index}>
                    <CompetitionCard
                      student={student}
                      data={competition}
                      host={host}
                      eventId={id}
                    />
                  </Grid>
                ))}
                {list?.length > 0 && (
                  <Grid
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "flex-end" }}
                  >
                    <Button
                      variant="text"
                      color="secondary"
                      sx={{ p: 1, fontFamily: "Segoe UI", fontWeight: "900" }}
                      component={Link}
                      to={`/registration-form`}
                    >
                      Continue
                    </Button>
                  </Grid>
                )}
              </Grid>
              <Box mt={5} display="flex" justifyContent="center">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange}
                  shape="rounded"
                  color="secondary"
                />
              </Box>
            </Container>
          </>
        )}
      </Box>
    </Box>
  );
}
