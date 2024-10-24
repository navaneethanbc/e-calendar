import {
  Avatar,
  Box,
  Button,
  IconButton,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import image from "../assets/icon.png";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [events, setEvents] = useState([]); // Change the state name to plural for clarity
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const userDetails = async () => {
    try {
      const response = await axios.get(
        `https://e-calendar-cocq.vercel.app/users/${username}`
      );

      const userData = response.data.user;
      setUserData(userData);
      console.log(userData);
    } catch (error) {
      console.log("Error fetching user details:", error);
    }
  };

  const fetchEvents = async () => {
    try {
      const response = await axios.post(
        "https://e-calendar-cocq.vercel.app/events/find/",
        {
          username,
        }
      );

      const eventData = response.data.events.map((event) => ({
        title: event.title,
        category: event.category,
        recurrence: event.recurrence,
        startedAt: event.starts_at,
      }));

      const distinctEventData = [
        ...new Map(eventData.map((item) => [item.title, item])).values(),
      ];

      // Set the state with distinct event data
      setEvents(distinctEventData);

      // Log the distinct events
      console.log(distinctEventData);
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    userDetails();
    fetchEvents();
  }, []);

  const handleClicktoCalendar = () => {
    navigate("/calendar");
  };

  return (
    <>
      <Box
        sx={{
          padding: 3,
          margin: 5,
          height: "88vh",
          overflowY: "auto",
          boxShadow: 3,
          display: "flex",
          gap: 3,
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            width: "30%",
            height: "100%",
            backgroundColor: "#f0f0f0",
            boxShadow: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-start",
              paddingTop: "20px",
            }}
          >
            <IconButton>
              <Avatar
                sx={{
                  width: { xs: 60, sm: 80, md: 100 },
                  height: { xs: 60, sm: 80, md: 100 },
                }}
              />
            </IconButton>
          </Box>
          {userData && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "flex-start",
                padding: "20px",
                flexDirection: "column",

                maxWidth: "100%",
              }}
            >
              <Box
                sx={{
                  textAlign: "center",
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: "bold",
                    margin: "0 auto",
                  }}
                >
                  {username}
                  <br />
                  {userData.employee_id}
                </Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  color: "white",
                  backgroundColor: "black",
                  borderRadius: "4px",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#b8860c",
                  },
                  mb: 1,
                  mt: 1,
                }}
              >
                Edit Profile
              </Button>

              <Typography variant="h6" sx={{ mt: 2, fontWeight: "bold" }}>
                Personal Information
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  mt: 2,
                  overflow: "hidden",
                  wordBreak: "break-word",
                  fontSize: "0.95rem",
                }}
              >
                Full Name: {userData.fullname}
                <br />
                User Role: {userData.role}
                <br />
                Branch: {userData.branch}
                <br />
                Email address: {userData.email}
              </Typography>
            </Box>
          )}
          <Box
            component="img"
            src={image}
            sx={{
              display: { xs: "none", sm: "none", md: "block" },
              height: "150px",
              width: "300px",
              margin: "2 auto",
            }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            width: "70%",
          }}
        >
          <Box
            sx={{
              height: "25%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              position: "relative",
            }}
          >
            <Button
              onClick={handleClicktoCalendar}
              variant="contained"
              sx={{
                position: "absolute",
                top: "20px",
                right: "20px",
                color: "white",
                backgroundColor: "black",
                borderRadius: "4px",
                transition: "background-color 0.3s ease",
                "&:hover": {
                  backgroundColor: "#b8860c",
                },
              }}
            >
              Go To Calendar
            </Button>
            {userData && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  padding: "20px",
                  paddingLeft: "40px",
                  flexDirection: "column",
                  maxWidth: "100%",
                }}
              >
                <Typography
                  sx={{
                    mt: 2,
                    overflow: "hidden",
                    wordBreak: "break-word",
                    fontSize: "0.95rem",
                  }}
                >
                  Last Login{"    :"}
                  {userData.last_login
                    ? moment(userData.last_login).format("YYYY-MM-DD HH:mm:ss")
                    : "No record available"}
                  <br />
                  Create Date:{" "}
                  {userData.createdAt
                    ? moment(userData.createdAt).format("YYYY-MM-DD HH:mm:ss")
                    : "N/A"}
                  <br />
                  Last Update Date:{" "}
                  {userData.updatedAt
                    ? moment(userData.updatedAt).format("YYYY-MM-DD HH:mm:ss")
                    : "N/A"}
                  <br />
                  TimeZone: {userData.timezone}
                </Typography>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              height: "75%",
              backgroundColor: "#f0f0f0",
              boxShadow: 2,
              position: "relative",
              overflowY: "auto",
            }}
          >
            <Box>
              <div className="bg-[#504f4a]">
                <TableContainer component={Paper} sx={{ boxShadow: 8 }}>
                  <Box>
                    <Table>
                      <TableHead stickyHeader>
                        <TableRow sx={{ backgroundColor: "#b8860c" }}>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                          >
                            Title
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                          >
                            Category
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                          >
                            Recurrence Type
                          </TableCell>
                          <TableCell
                            sx={{ fontWeight: "bold", color: "#FFFFFF" }}
                          >
                            Started At
                          </TableCell>
                        </TableRow>
                      </TableHead>

                      <TableBody>
                        {events.length > 0 ? (
                          events.map((event, index) => (
                            <TableRow key={index}>
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
                                {event.category}
                              </TableCell>
                              <TableCell
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  width: "150px",
                                }}
                              >
                                {event.recurrence}
                              </TableCell>
                              <TableCell
                                sx={{
                                  overflow: "hidden",
                                  textOverflow: "ellipsis",
                                  whiteSpace: "nowrap",
                                  width: "200px",
                                }}
                              >
                                {moment(event.startedAt).format(
                                  "YYYY-MM-DD HH:mm:ss"
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell
                              colSpan={4}
                              style={{ textAlign: "center" }}
                            >
                              No events available
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </Box>
                </TableContainer>
              </div>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ProfilePage;
