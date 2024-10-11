import React from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

const TableStructure = ({ headers, loading, dataSource }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };
  return (
    <div className="bg-[#504f4a]">
      <Typography
        variant="h3"
        gutterBottom
        sx={{
          color: "#febe00",
          fontSize: "bold",
          padding: "20px 3px 3px 20px",
        }}
      >
        {headers}
      </Typography>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
          <Box>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "black" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Owner
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Start Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    End Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Guests
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dataSource.map((event) => (
                  <TableRow key={event._id}>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {event.title}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {event.owner}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {formatDate(event.starts_at)}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "200px",
                      }}
                    >
                      {formatDate(event.ends_at)}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100px",
                      }}
                    >
                      {event.guests}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      )}
    </div>
  );
};

export default TableStructure;
