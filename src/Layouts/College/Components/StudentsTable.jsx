import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function StudentsTable({ dashboard }) {
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
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Student</TableCell>
            {!dashboard && (
              <TableCell sx={{ fontFamily: "Segoe UI" }}>
                Fat&nbsp;(g)
              </TableCell>
            )}
            {!dashboard && (
              <TableCell sx={{ fontFamily: "Segoe UI" }}>
                Carbs&nbsp;(g)
              </TableCell>
            )}
            {!dashboard && (
              <TableCell sx={{ fontFamily: "Segoe UI" }}>
                Protein&nbsp;(g)
              </TableCell>
            )}
            <TableCell sx={{ fontFamily: "Segoe UI" }}>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows?.length > 0 ? (
            rows.map((row) => (
              <TableRow
                key={row.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell
                  sx={{ fontFamily: "Segoe UI" }}
                  component="th"
                  scope="row"
                >
                  {row.name}
                </TableCell>
                {!dashboard && (
                  <TableCell sx={{ fontFamily: "Segoe UI" }}>
                    {row.calories}
                  </TableCell>
                )}
                {!dashboard && (
                  <TableCell sx={{ fontFamily: "Segoe UI" }}>
                    {row.fat}
                  </TableCell>
                )}
                {!dashboard && (
                  <TableCell sx={{ fontFamily: "Segoe UI" }}>
                    {row.carbs}
                  </TableCell>
                )}
                <TableCell sx={{ fontFamily: "Segoe UI" }}>
                  {row.protein}
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
                  No students found!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
