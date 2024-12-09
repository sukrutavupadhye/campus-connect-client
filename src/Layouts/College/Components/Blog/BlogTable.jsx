import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import BlogForm from "./BlogForm";
import moment from "moment";
import DeleteBlog from "./DeleteBlog";
export default function BlogTable({ blogs, host }) {
  return (
    <TableContainer>
      <Table
        sx={
          {
            // minWidth: 650
          }
        }
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Blog</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {blogs?.length > 0 ? (
            blogs
              ?.slice()
              .reverse()
              ?.map((row, index) => (
                <TableRow
                  key={index}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell>{moment(row?.createdAt).fromNow()}</TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        gap: 2,
                        flexDirection: "column",
                      }}
                    >
                      <Box>
                        <img
                          src={`${host}/collegeBlogUploads/college/${row?.picture}`}
                          style={{ width: "100px" }}
                          alt=""
                          srcset=""
                        />
                      </Box>
                      <Box>
                        <Typography
                          sx={{
                            fontFamily: "Segoe UI",
                            width: "100%",
                          }}
                          variant="subtitle2"
                        >
                          {row?.title}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row?.status}
                      color={row?.status == "Public" ? "success" : "error"}
                      size="small"
                      component={Paper}
                    />
                  </TableCell>
                  <TableCell>
                    <BlogForm singleBlog={row} />
                    <DeleteBlog blog={row} />
                  </TableCell>
                </TableRow>
              ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} align="center">
                <Typography
                  sx={{
                    fontFamily: "Segoe UI",
                    color: "#a3aed0",
                  }}
                  variant="caption"
                >
                  No blogs found!
                </Typography>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
