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
      const response = await axios.get(
        `http://localhost:8000/admin/views`
      );
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
          <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
            <Box>
              <Table>
                <TableHead>
                  <TableRow sx={{ backgroundColor: "black" }}>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                      Employee ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                      User Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                      Full Name
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                      Email
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                      Role
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                      Branch
                    </TableCell>
                    <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                      Last Login
                    </TableCell>
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
      </div>
    </Box>
  );
}

export default Users;
