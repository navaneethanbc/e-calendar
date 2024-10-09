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
import { useEffect, useState } from "react";
import axios from "axios";

function Users() {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);

  const userDetails = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/admin/views`);
      setDataSource(response.data.users);
    } catch (error) {
      setError("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userDetails();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <Box sx={{ padding: 3, height: "90vh", overflowY: "auto" }}>
      <Typography variant="h3" gutterBottom>
        User Details
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
        <TableContainer component={Paper}>
          <Box>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "#b8860b" }}>
                  <TableCell sx={{ fontWeight: "bold" }}>Employee ID</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>User Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Full Name</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Role</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Branch</TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Last Login</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {dataSource.map((user) => (
                  <TableRow key={user._id}>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {user.employee_id}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {user.username}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {user.fullname}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "200px",
                      }}
                    >
                      {user.email}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100px",
                      }}
                    >
                      {user.role}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "100px",
                      }}
                    >
                      {user.branch}
                    </TableCell>
                    <TableCell
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        width: "150px",
                      }}
                    >
                      {formatDate(user.last_login)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </TableContainer>
      )}
    </Box>
  );
}

export default Users;
