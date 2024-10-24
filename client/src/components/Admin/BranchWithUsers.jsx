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
} from "@mui/material";
import axios from "axios";

const BranchWithUsers = () => {
  const [branchData, setBranchData] = useState([]);
  const [loading, setLoading] = useState(false);
  const branches = ["Branch A", "Branch B", "Branch C", "Branch D"];

  // Fetch branch data including users and events
  const fetchBranchData = async () => {
    setLoading(true);

    try {
      const results = await Promise.all(
        branches.map(async (branchName) => {
          // Fetch users for the branch
          const userResponse = await axios.get(
            `https://e-calendar-cocq.vercel.app/admin/branchusers/${branchName}`
          );

          // Fetch branch events for the branch
          const eventResponse = await axios.get(
            `https://e-calendar-cocq.vercel.app/admin/branchevent/${branchName}`
          );

          return {
            branchName,
            users: userResponse.data.userCount,
            events: eventResponse.data.length,
          };
        })
      );
      setBranchData(results);
    } catch (error) {
      console.error("Error fetching branch data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranchData();
  }, []);

  return (
    <Box sx={{ width: "50%", paddingRight: 2 }}>
      <Typography variant="h5" gutterBottom>
        Recent Branches
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Branch Name</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Users</TableCell>
                <TableCell sx={{ fontWeight: "bold" }}>Branch Events</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {branchData.map((branchInfo, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ fontWeight: "bold" }}>
                    {branchInfo.branchName}
                  </TableCell>
                  <TableCell>{branchInfo.users}</TableCell>
                  <TableCell>{branchInfo.events}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default BranchWithUsers;
