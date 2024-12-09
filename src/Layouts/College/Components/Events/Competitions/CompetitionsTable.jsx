import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Chip, TextField, Typography } from "@mui/material";
import CompetitionForm from "./CompetitionForm";

export default function CompetitionsTable({ host, competitions, event }) {
  return (
    <TableContainer>
      <Table
        sx={{
          // minWidth: 650
          fontFamily: "Segoe UI",
        }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Title</TableCell>
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Description</TableCell>
            <TableCell sx={{ fontFamily: "Segoe UI" }}>
              Rules & Regulations
            </TableCell>
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Status</TableCell>
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {competitions?.length > 0 ? (
            competitions.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ fontFamily: "Segoe UI" }}
                  component="th"
                  scope="row"
                >
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    <Box>
                      <img
                        src={`${host}/collegeCompetitionUploads/college/${row?.picture}`}
                        style={{ width: "50px", objectFit: "contain" }}
                      />
                    </Box>
                    <Box>
                      <Typography
                        sx={{ fontFamily: "Segoe UI" }}
                        variant="subtitle2"
                      >
                        {row.title}
                      </Typography>
                      <Typography
                        sx={{ fontFamily: "Segoe UI" }}
                        variant="caption"
                      >
                        {row?.isGrouped
                          ? `Group of ${row.groupMembers}`
                          : "Individual"}
                      </Typography>
                    </Box>
                  </Box>
                </TableCell>
                <TableCell sx={{ fontFamily: "Segoe UI" }}>
                  <TextField
                    value={row?.description}
                    fullWidth
                    multiline
                    rows={2}
                    readOnly
                  />
                </TableCell>
                <TableCell sx={{ fontFamily: "Segoe UI" }}>
                  <TextField
                    value={row?.rules}
                    fullWidth
                    multiline
                    rows={2}
                    readOnly
                  />
                </TableCell>
                <TableCell sx={{ fontFamily: "Segoe UI" }}>
                  <Chip
                    label={row?.status}
                    color={row?.status == "Active" ? "success" : "error"}
                    size="small"
                    component={Paper}
                  />
                </TableCell>
                <TableCell sx={{ fontFamily: "Segoe UI" }}>
                  <CompetitionForm event={event} singleCompetition={row} />
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5} align="center">
                <Typography
                  sx={{ color: "#a3aed0", fontFamily: "Segoe UI" }}
                  variant="caption"
                >
                  No competitions found!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
