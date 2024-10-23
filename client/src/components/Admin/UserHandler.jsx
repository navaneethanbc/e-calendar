import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import axios from "axios";

const UserHandler = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newUsernames, setNewUsernames] = useState({});
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch users
  const viewUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/views`
      );
      setUsers(response.data.users);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching users", error);
      setLoading(false);
    }
  };

  // Handle delete confirmation dialog
  const handleOpenDeleteDialog = (user) => {
    setSelectedUser(user);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
    setSelectedUser(null);
  };

  // Handle update confirmation dialog
  const handleOpenUpdateDialog = (user) => {
    setSelectedUser(user);
    setOpenUpdateDialog(true);
  };

  const handleCloseUpdateDialog = () => {
    setOpenUpdateDialog(false);
    setSelectedUser(null);
  };

  // Delete user
  const deleteUser = async () => {
    if (selectedUser) {
      try {
        await axios.delete(
          `http://localhost:8000/admin/deleteuser/${selectedUser.username}`
        );
        setUsers(
          users.filter((user) => user.username !== selectedUser.username)
        );
        handleCloseDeleteDialog();
      } catch (error) {
        console.log("Error deleting user", error);
      }
    }
  };

  // Update user
  const updateUser = async () => {
    const newUsername = newUsernames[selectedUser.username];
    try {
      await axios.put(
        `http://localhost:8000/admin/updateuser/${selectedUser.username}`,
        {
          newUsername,
        }
      );
      setUsers(
        users.map((user) =>
          user.username === selectedUser.username
            ? { ...user, username: newUsername }
            : user
        )
      );
      setNewUsernames({ ...newUsernames, [selectedUser.username]: "" });
      handleCloseUpdateDialog();
    } catch (error) {
      console.log("Error updating user", error);
    }
  };

  const handleInputChange = (e, username) => {
    setNewUsernames({ ...newUsernames, [username]: e.target.value });
  };

  useEffect(() => {
    viewUsers();
  }, []);

  return (
    <div className="bg-[#504f4a]">
      <Box>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            color: "#febe00",
            fontSize: "bold",
            padding: "20px 3px 3px 20px",
          }}
        >
          User Settings
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : (
          <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: "black" }}>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    User Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Full Name
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Employee ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Role
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Branch
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold", color: "#FFFFFF" }}>
                    Update Username
                  </TableCell>
                  <TableCell sx={{ fontWeight: "bold" }}>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((user, index) => (
                  <TableRow key={index}>
                    <TableCell>{user.username}</TableCell>
                    <TableCell>{user.fullname}</TableCell>
                    <TableCell>{user.employee_id}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>{user.branch}</TableCell>

                    {/* Update username input */}
                    <TableCell>
                      <TextField
                        size="small"
                        label="New Username"
                        value={newUsernames[user.username] || ""}
                        onChange={(e) => handleInputChange(e, user.username)}
                      />
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "black",
                          "&:hover": {
                            backgroundColor: "#b8860c",
                          },
                          marginLeft: 1,
                        }}
                        onClick={() => handleOpenUpdateDialog(user)}
                      >
                        Update
                      </Button>
                    </TableCell>

                    {/* Delete user button */}
                    <TableCell>
                      <Button
                        variant="contained"
                        sx={{
                          backgroundColor: "black",
                          "&:hover": {
                            backgroundColor: "#b8860c",
                          },
                        }}
                        onClick={() => handleOpenDeleteDialog(user)}
                      >
                        <DeleteIcon />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog
          open={openDeleteDialog}
          onClose={handleCloseDeleteDialog}
          aria-labelledby="confirm-delete-dialog"
        >
          <DialogTitle id="confirm-delete-dialog">Confirm Delete</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete the user "{selectedUser?.username}
              "?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
            <Button
              onClick={deleteUser}
              sx={{
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "#b8860c",
                },
              }}
              variant="contained"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>

        {/* Update Confirmation Dialog */}
        <Dialog
          open={openUpdateDialog}
          onClose={handleCloseUpdateDialog}
          aria-labelledby="confirm-update-dialog"
        >
          <DialogTitle id="confirm-update-dialog">Confirm Update</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to update the username of "
              {selectedUser?.username}" to "
              {newUsernames[selectedUser?.username]}
              "?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseUpdateDialog}>Cancel</Button>
            <Button
              onClick={updateUser}
              sx={{
                backgroundColor: "black",
                "&:hover": {
                  backgroundColor: "#b8860c",
                },
              }}
              variant="contained"
              autoFocus
            >
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </Box>{" "}
    </div>
  );
};

export default UserHandler;
