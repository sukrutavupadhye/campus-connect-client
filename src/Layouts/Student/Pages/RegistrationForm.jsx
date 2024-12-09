import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import PageBanner from "../Components/PageBanner";
import { useContext } from "react";
import { StudentContext } from "../Context";
import { useEffect } from "react";
import FormContainer from "../Components/FormContainer";
import noData from "../Assets/Images/no-data.png";
import { Link, useParams } from "react-router-dom";
import FormContainer2 from "../Components/FormContainer2";
export default function RegistrationForm() {
  const { id } = useParams();
  const {
    getStudentList,
    list,
    viewSingleCompetitionDetails,
    singleCompetition,
  } = useContext(StudentContext);
  useEffect(() => {
    getStudentList();
    id && viewSingleCompetitionDetails(id);
  }, []);
  // console.log(list);
  return (
    <Box>
      <Box>
        <PageBanner title="Registration" />
      </Box>
      <Container sx={{ p: 2 }}>
        {list?.length > 0 ? (
          <FormContainer2 list={list} singleCompetition={singleCompetition} />
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <img src={noData} style={{ width: "300px" }} />
            <Typography color="text.secondary" gutterBottom variant="body2">
              No competitions selected!
            </Typography>
            <Button size="small" component={Link} to="/events">
              View events
            </Button>
          </Box>
        )}
      </Container>
    </Box>
  );
}
