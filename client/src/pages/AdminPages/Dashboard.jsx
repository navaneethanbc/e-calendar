import {
  Storefront,
  Person,
  Event as EventIcon,
  AccountTree as AccountTreeIcon,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import BranchWithUsers from "../../components/Admin/BranchWithUsers";
import DashBoardChart from "../../components/Admin/DashboardChart";
import Image from "../../assets/icon.png";
import { Link } from "react-router-dom";

function DashboardCard({ title, value, icon, color, link }) {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <Link
        to={link}
        style={{ textDecoration: "none", display: "block", height: "100%" }} // Ensures the link takes the full height
      >
        <Card sx={{ boxShadow: 5 }}>
          <CardContent>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Avatar
                sx={{
                  backgroundColor: `${color}.light`,
                  color: color,
                  marginRight: 2,
                }}
              >
                {icon}
              </Avatar>
              <Typography variant="h6">{title}</Typography>
            </Box>
            <Typography variant="h5" sx={{ marginTop: 1 }}>
              {value}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </Grid>
  );
}

function Dashboard() {
  const [events, setEvents] = useState(0);
  const [bankEvents, setBankEvents] = useState(0);
  const [users, setUsers] = useState(0);
  const [branchEvents, setBranchEvents] = useState(0);

  const userCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/count`
      );
      setUsers(response.data.userCount);
    } catch (error) {
      console.log("Error userCount", error);
    }
  };

  const eventCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/eventdetails`
      );
      const eventData = response.data;
      const total = eventData.reduce((sum, event) => sum + event.count, 0);
      setEvents(total);
    } catch (error) {
      console.log("Error userCount", error);
    }
  };

  const bankEventCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/eventdetailsbank`
      );
      const eventData = response.data;
      const total = eventData.reduce((sum, event) => sum + event.count, 0);
      setBankEvents(total);
    } catch (error) {
      console.log("Error userCount", error);
    }
  };

  const branchEventCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/eventdetailsbranch`
      );
      const eventData = response.data;
      const total = eventData.reduce((sum, event) => sum + event.count, 0);
      setBranchEvents(total);
    } catch (error) {
      console.log("Error userCount", error);
    }
  };

  useEffect(() => {
    userCount();
    eventCount();
    bankEventCount();
    branchEventCount();
  }, []);

  return (
    <Box sx={{ padding: 3, height: "90vh", overflowY: "auto" }}>
      <Box sx={{ display: "flex", paddingBottom: "10px" }}>
        <img
          src={Image}
          alt="Logo"
          style={{
            width: "200px",
            height: "auto",
            marginRight: "8px",
            marginBottom: "12px",
          }}
        />

        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontWeight: "bold", marginTop: "19px" }}
        >
          Dashboard
        </Typography>
      </Box>

      <Grid container spacing={2}>
        <DashboardCard
          icon={<Person />}
          title="Users"
          value={users}
          color="green"
          link="/admin/users"
        />

        <DashboardCard
          icon={<EventIcon />}
          title="Events"
          value={events}
          color="#febe00"
          link="/admin/events"
        />
        <DashboardCard
          icon={<Storefront />}
          title="Bank Events"
          value={bankEvents}
          color="red"
          link="/admin/events"
        />

        <DashboardCard
          icon={<AccountTreeIcon />}
          title="Branch Events"
          value={branchEvents}
          color="blue"
          link="/admin/events"
        />
      </Grid>
      <Box sx={{ display: "flex", marginTop: 3 }}>
        <DashBoardChart />
        <BranchWithUsers />
      </Box>
    </Box>
  );
}

export default Dashboard;
