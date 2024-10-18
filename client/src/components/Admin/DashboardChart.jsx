import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";
import { Box, Card, Typography } from "@mui/material";
import { Bar } from "react-chartjs-2";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DashboardChart = () => {
  const [userEventData, setUserEventData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    const fetchUserEventData = async () => {
      try {
        // Fetch users
        const usersResponse = await axios.get(
          "https://e-calendar-cocq.vercel.app/admin/views"
        );
        const users = usersResponse.data.users;

        // Fetch event details grouped by user
        const eventsResponse = await axios.get(
          "https://e-calendar-cocq.vercel.app/admin/eventcountwithusers"
        );
        const events = eventsResponse.data;

        const userEventCount = users.map((user) => {
          const userEvent = events.find((event) => event._id === user.username);
          return {
            username: user.username,
            count: userEvent ? userEvent.count : 0, // Default to 0 if no events found
          };
        });

        // Prepare data for the chart
        const labels = userEventCount.map((user) => user.username);
        const data = userEventCount.map((user) => user.count);

        const dataSource = {
          labels,
          datasets: [
            {
              label: "Events per User",
              data: data,
              backgroundColor: "#febe00",
            },
          ],
        };

        setUserEventData(dataSource);
      } catch (error) {
        console.error("Error fetching user and event data:", error);
      }
    };

    fetchUserEventData();
  }, []);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <Box sx={{ width: "50%", paddingRight: 2 }}>
      <Typography variant="h5" gutterBottom>
        User Events
      </Typography>
      <Card sx={{ height: 269, boxShadow: 5 }}>
        <Bar options={options} data={userEventData} />
      </Card>
    </Box>
  );
};

export default DashboardChart;
