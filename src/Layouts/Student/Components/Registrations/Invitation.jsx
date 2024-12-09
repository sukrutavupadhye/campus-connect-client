import React from "react";
import {
  Box,
  Typography,
  Grid,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TableHead,
  styled,
  Button,
} from "@mui/material";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import DownloadIcon from "@mui/icons-material/Download";
const Invitation = ({ data, competition }) => {
  console.log(data);
  console.log(competition);

  const Root = styled("div")(({ theme }) => ({
    width: "100%",
    ...theme.typography.body2,
    color: theme.palette.text.secondary,
    "& > :not(style) ~ :not(style)": {
      marginTop: theme.spacing(2),
    },
  }));

  const downloadPdf = async () => {
    const element = document.getElementById("content-to-pdf"); // ID of the content element
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        backgroundColor: null,
      });

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const scaleRatio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * scaleRatio;

      const gradientCanvas = document.createElement("canvas");
      gradientCanvas.width = canvas.width;
      gradientCanvas.height = canvas.height;

      const gradientCtx = gradientCanvas.getContext("2d");
      const gradient = gradientCtx.createLinearGradient(
        0,
        0,
        gradientCanvas.width,
        gradientCanvas.height
      );
      gradient.addColorStop(1.0, "#8f0337");
      gradient.addColorStop(0.75, "#5e184a");
      gradient.addColorStop(0.25, "#302d62");

      gradientCtx.fillStyle = gradient;
      gradientCtx.fillRect(0, 0, gradientCanvas.width, gradientCanvas.height);

      const gradientImgData = gradientCanvas.toDataURL("image/png");

      let yOffset = 0;

      while (yOffset < imgHeight) {
        pdf.addImage(gradientImgData, "PNG", 0, 0, pdfWidth, pdfHeight);
        const canvasPart = document.createElement("canvas");
        canvasPart.width = imgWidth;
        canvasPart.height = Math.min(
          imgHeight - yOffset,
          pdfHeight / scaleRatio
        );

        const ctx = canvasPart.getContext("2d");
        ctx.drawImage(
          canvas,
          0,
          yOffset,
          imgWidth,
          canvasPart.height,
          0,
          0,
          canvasPart.width,
          canvasPart.height
        );

        const partImgData = canvasPart.toDataURL("image/png");
        pdf.addImage(
          partImgData,
          "PNG",
          0,
          0,
          pdfWidth,
          (canvasPart.height * pdfWidth) / imgWidth
        );

        yOffset += canvasPart.height;

        if (yOffset < imgHeight) {
          pdf.addPage();
        }
      }

      pdf.save("event-invitation.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          backgroundImage:
            "linear-gradient(45deg, #302d62 20%, #5e184a 75%, #8f0337 105%)",
        }}
      >
        <Paper
          elevation={0}
          id="content-to-pdf"
          sx={{
            padding: 3,
            //   backgroundImage:
            //     "linear-gradient(45deg, #302d62 20%, #5e184a 75%, #8f0337 105%)",
            backgroundColor: "transparent",
          }}
        >
          <Box sx={{ p: 3 }}>
            {/* Event Title */}
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "900",
                  color: "white",
                }}
              >
                {data?.event?.college?.collegeName},{" "}
                {data?.event?.college?.collegePlace}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "900",
                  color: "white",
                }}
              >
                presenting
              </Typography>
              <Typography
                variant="h4"
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "900",
                  color: "#ffd600",
                }}
              >
                {data?.event?.title}
              </Typography>
            </Box>

            {/* Event Date and Place */}
            <Grid
              container
              justifyContent="space-between"
              sx={{ marginBottom: 2 }}
            >
              <Grid item>
                <Typography
                  sx={{ fontFamily: "Segoe UI", color: "#ccc" }}
                  variant="body1"
                >
                  Venue : {data?.event?.place}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ fontFamily: "Segoe UI", color: "#ccc" }}
                  variant="body1"
                >
                  Event Date :{moment(data?.event?.eDate).format("DD-MM-YYYY")}
                </Typography>
              </Grid>
            </Grid>

            <Divider sx={{ my: 2 }} />

            {/* Invitation Description */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="body1"
                sx={{
                  textAlign: "justify",
                  fontFamily: "Segoe UI",
                  color: "#ccc",
                }}
              >
                We are delighted to welcome you to{" "}
                <span style={{ fontWeight: "600" }}> {data?.event?.title}</span>
                , a platform to showcase your talents and creativity. Join us in
                celebrating excellence and innovation at{" "}
                <span style={{ fontWeight: "600" }}>
                  {" "}
                  {competition?.competition?.title}
                </span>
                , where your skills and passion will shine. We look forward to
                your enthusiastic participation and wish you great success in
                this event
              </Typography>
            </Box>

            {/* Participant List */}
            <Box sx={{ marginBottom: 2, p: 1 }}>
              {/* Table displaying participants */}

              <Root>
                <Divider sx={{ color: "#ccc" }}>
                  <Typography
                    sx={{ fontFamily: "Segoe UI", color: "#ffd600" }}
                    variant="caption"
                  >
                    Participant list
                  </Typography>
                </Divider>
              </Root>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "600",
                          color: "#ccc",
                          borderBottom: "0.5px solid #cccccc30",
                        }}
                      >
                        Sl No
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "600",
                          color: "#ccc",
                          borderBottom: "0.5px solid #cccccc30",
                        }}
                      >
                        Name
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "600",
                          color: "#ccc",
                          borderBottom: "0.5px solid #cccccc30",
                        }}
                      >
                        Phone
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "600",
                          color: "#ccc",
                          borderBottom: "0.5px solid #cccccc30",
                        }}
                      >
                        Email
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "600",
                          color: "#ccc",
                          borderBottom: "0.5px solid #cccccc30",
                        }}
                      >
                        College
                      </TableCell>
                      <TableCell
                        sx={{
                          fontFamily: "Segoe UI",
                          fontWeight: "600",
                          color: "#ccc",
                          borderBottom: "0.5px solid #cccccc30",
                        }}
                      >
                        Course
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {competition?.participants?.map((participant, index) => (
                      <TableRow key={index}>
                        <TableCell
                          sx={{
                            fontFamily: "Segoe UI",
                            color: "#ccc",
                            borderBottom: "0.5px solid #cccccc30",
                          }}
                        >
                          {index + 1}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Segoe UI",
                            color: "#ccc",
                            borderBottom: "0.5px solid #cccccc30",
                          }}
                        >
                          {participant.name}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Segoe UI",
                            color: "#ccc",
                            borderBottom: "0.5px solid #cccccc30",
                          }}
                        >
                          {participant.phone}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Segoe UI",
                            color: "#ccc",
                            borderBottom: "0.5px solid #cccccc30",
                          }}
                        >
                          {participant.email}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Segoe UI",
                            color: "#ccc",
                            borderBottom: "0.5px solid #cccccc30",
                          }}
                        >
                          {participant.college}
                        </TableCell>
                        <TableCell
                          sx={{
                            fontFamily: "Segoe UI",
                            color: "#ccc",
                            borderBottom: "0.5px solid #cccccc30",
                          }}
                        >
                          {participant.course}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            {/* <Divider sx={{ my: 2 }} /> */}

            {/* Footer */}
            <Grid container justifyContent="space-between">
              <Grid item>
                <Typography
                  sx={{ fontFamily: "Segoe UI", color: "#ccc" }}
                  variant="body2"
                >
                  Place : {data?.event?.place}
                </Typography>
              </Grid>
              <Grid item>
                <Typography
                  sx={{ fontFamily: "Segoe UI", color: "#ccc" }}
                  variant="body2"
                >
                  Date : {moment(data?.createdAt).format("DD-MM-YYYY")}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 1,
        }}
      >
        <Button startIcon={<DownloadIcon />} autoFocus onClick={downloadPdf}>
          Download
        </Button>
      </Box>
    </Box>
  );
};

export default Invitation;
