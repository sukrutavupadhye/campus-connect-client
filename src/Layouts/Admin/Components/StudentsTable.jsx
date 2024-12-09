import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useContext } from "react";
import { AdminContext } from "../Context";

export default function StudentsTable({ dashboard, students }) {
  const { host, updateStudentStatus } = useContext(AdminContext);
  const handleStatusUpdate = (id, status) => {
    updateStudentStatus(id, { status });
  };
  return (
    <Box sx={{ p: 1 }}>
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
              <TableCell
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "600",
                  fontFamily: "Segoe UI",
                  color: "#a3aed0",
                }}
              >
                Name
              </TableCell>
              {!dashboard && (
                <TableCell
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Email
                </TableCell>
              )}
              {!dashboard && (
                <TableCell
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Phone
                </TableCell>
              )}
              <TableCell
                sx={{
                  fontFamily: "Segoe UI",
                  fontWeight: "600",
                  fontFamily: "Segoe UI",
                  color: "#a3aed0",
                }}
              >
                Status
              </TableCell>
              {!dashboard && (
                <TableCell
                  sx={{
                    fontFamily: "Segoe UI",
                    fontWeight: "600",
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                >
                  Action
                </TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {students?.length > 0 ? (
              students?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell
                    sx={{
                      fontFamily: "Segoe UI",
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      gap: 2,
                      color: "gray",
                    }}
                    component="th"
                    scope="row"
                  >
                    <Avatar
                      src={`${host}/studentUploads/admin/${row?.profile}`}
                    />
                    {row?.username}
                  </TableCell>
                  {!dashboard && (
                    <TableCell sx={{ fontFamily: "Segoe UI", color: "gray" }}>
                      {row?.email}
                    </TableCell>
                  )}
                  {!dashboard && (
                    <TableCell sx={{ fontFamily: "Segoe UI", color: "gray" }}>
                      {row?.phone}
                    </TableCell>
                  )}
                  <TableCell sx={{ fontFamily: "Segoe UI", color: "gray" }}>
                    {row?.status}
                  </TableCell>
                  {!dashboard && (
                    <TableCell sx={{ fontFamily: "Segoe UI", color: "gray" }}>
                      {row?.status == "Active" ? (
                        <Button
                          onClick={() =>
                            handleStatusUpdate(row?._id, "Inactive")
                          }
                          variant="contained"
                          color="error"
                          sx={{ fontFamily: "Segoe UI", fontWeight: "600" }}
                        >
                          Block
                        </Button>
                      ) : (
                        <Button
                          onClick={() => handleStatusUpdate(row?._id, "Active")}
                          variant="contained"
                          color="info"
                          sx={{ fontFamily: "Segoe UI", fontWeight: "600" }}
                        >
                          UnBlock
                        </Button>
                      )}
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography
                    sx={{ color: "#a3aed0", fontFamily: "Segoe UI" }}
                    variant="caption"
                  >
                    No students found!
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
