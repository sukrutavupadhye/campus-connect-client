import React from "react";
import {
  Box,
  Typography,
  CardMedia,
  Paper,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useContext } from "react";
import { StudentContext } from "../../Context";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  //   width: 400,
  //   bgcolor: "background.paper",
  //   border: "2px solid #000",
  //   boxShadow: 24,
  //   p: 4,
};
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  width: "100%",
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: "rgba(0, 0, 0, .03)",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
  ...theme.applyStyles("dark", {
    backgroundColor: "rgba(255, 255, 255, .05)",
  }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

export default function CompetitionCard({ data, host, student, eventId }) {
  const { removeFromList, addIntoList, registeredEvents } =
    useContext(StudentContext);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  const handleList = (e, id) => {
    if (e.target.checked) {
      addIntoList(id, eventId);
    } else {
      removeFromList(id, eventId);
    }
  };
  return (
    <Paper sx={{ display: "flex", gap: 2, p: 2, borderRadius: "20px" }}>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <img
            src={`${host}/CompetitionUploads/student/${data?.picture}`}
            style={{ width: "300px" }}
          />
        </Box>
      </Modal>
      {/* Image */}
      <CardMedia
        onClick={handleOpen}
        image={`${host}/CompetitionUploads/student/${data?.picture}`}
        sx={{
          width: 200,
          //   height: 200,
          objectFit: "cover",
        }}
      />

      {/* Text */}
      <Box sx={{ p: 2, width: "75%" }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography sx={{ fontFamily: "Segoe UI" }} variant="h6">
            {data?.title}
          </Typography>
          <Typography
            sx={{ fontFamily: "Segoe UI" }}
            variant="body2"
            color="text.secondary"
          >
            {/* Competition Type{" "} */}
            {data?.isGrouped ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <GroupIcon color="secondary" />
                {`Group of ${data?.groupMembers}`}
              </Box>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <PersonIcon color="secondary" /> Individual
              </Box>
            )}
          </Typography>
        </Box>
        <Box style={{ p: 1, width: "100%" }}>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              aria-controls="panel1d-content"
              id="panel1d-header"
            >
              <Typography sx={{ fontFamily: "Segoe UI" }} variant="body2">
                Description
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{
                  fontFamily: "Segoe UI",
                  maxHeight: "5vh",
                  overflow: "auto",
                }}
                variant="body2"
                color="text.secondary"
              >
                {data.description}
              </Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              aria-controls="panel2d-content"
              id="panel2d-header"
            >
              <Typography sx={{ fontFamily: "Segoe UI" }} variant="body2">
                Rules & regulations
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography
                sx={{ fontFamily: "Segoe UI" }}
                variant="body2"
                color="text.secondary"
              >
                {data?.rules}
              </Typography>
            </AccordionDetails>
          </Accordion>
          {student && (
            <>
              {registeredEvents.some((registered) =>
                registered.competitionData.some(
                  (competition) => competition.competition._id === data?._id
                )
              ) ? (
                <Typography
                  sx={{
                    float: "right",
                    fontFamily: "Segoe UI",
                    color: "green",
                    mt: 1,
                  }}
                  variant="subtitle2"
                  gutterBottom
                >
                  You are already registered for this competition
                </Typography>
              ) : (
                <FormGroup
                  sx={{
                    float: "right",
                  }}
                >
                  <FormControlLabel
                    control={
                      <Checkbox
                        color="secondary"
                        checked={data?.isThereInList}
                      />
                    }
                    label={
                      <Typography
                        sx={{ fontFamily: "Segoe UI" }}
                        variant="subtitle2"
                      >
                        {`Participate for ${data?.title}`}
                      </Typography>
                    }
                    onChange={(e) => handleList(e, data?._id)}
                  />
                </FormGroup>
              )}
            </>
          )}

          {/* {student && (
            <Link
              style={{
                textDecoration: "none",
                fontWeight: "600",
                float: "right",
              }}
              to={`/registration-form/${data?._id}`}
            >
              Participate for {data?.title}
            </Link>
          )} */}
        </Box>
      </Box>
    </Paper>
  );
}
