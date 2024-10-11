// import {
//   ShoppingCart,
//   Storefront,
//   Person,
//   AttachMoney,
// } from "@mui/icons-material";
// import {
//   Avatar,
//   Box,
//   Card,
//   CardContent,
//   Grid,
//   Typography,
//   CircularProgress,
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
// } from "@mui/material";
// import { useEffect, useState } from "react";
// import { Bar } from "react-chartjs-2";
// import axios from "axios";

// // Chart.js configuration
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from "chart.js";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// function Dashboard() {
//   const [events, setEvents] = useState(0);
//   const [inventory, setInventory] = useState(0);
//   const [users, setUsers] = useState(0);
//   const [revenue, setRevenue] = useState(0);

//   const userCount = async () => {
//     try {
//       const response = await axios.get(`https://e-calendar-cocq.vercel.app/admin/count`);
//       setUsers(response.data.userCount);
//     } catch (error) {
//       console.log("Error userCount", error);
//     }
//   };

//   const eventCount = async () => {
//     try {
//       const response = await axios.get(
//         `https://e-calendar-cocq.vercel.app/admin/eventdetails`
//       );
//       const eventData = response.data;
//       const total = eventData.reduce((sum, event) => sum + event.count, 0);
//       setEvents(total);
//     } catch (error) {
//       console.log("Error userCount", error);
//     }
//   };

//   useEffect(() => {

//     userCount();
//     eventCount();
//   }, []);

//   return (
//     <Box sx={{ padding: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         Dashboard
//       </Typography>
//       <Grid container spacing={2}>
//         <DashboardCard
//           icon={<ShoppingCart />}
//           title="Events"
//           value={events}
//           color="green"
//         />
//         <DashboardCard
//           icon={<Storefront />}
//           title="Inventory"
//           value={inventory}
//           color="blue"
//         />
//         <DashboardCard
//           icon={<Person />}
//           title="Users"
//           value={users}
//           color="purple"
//         />
//         <DashboardCard
//           icon={<AttachMoney />}
//           title="Revenue"
//           value={revenue}
//           color="red"
//         />
//       </Grid>
//       <Box sx={{ display: "flex", marginTop: 3 }}>
//         <RecentOrders />
//         <DashboardChart />
//       </Box>
//     </Box>
//   );
// }

// function DashboardCard({ title, value, icon, color }) {
//   return (
//     <Grid item xs={12} sm={6} md={3}>
//       <Card>
//         <CardContent>
//           <Box sx={{ display: "flex", alignItems: "center" }}>
//             <Avatar
//               sx={{
//                 backgroundColor: `${color}.light`,
//                 color: color,
//                 marginRight: 2,
//               }}
//             >
//               {icon}
//             </Avatar>
//             <Typography variant="h6">{title}</Typography>
//           </Box>
//           <Typography variant="h5" sx={{ marginTop: 1 }}>
//             {value}
//           </Typography>
//         </CardContent>
//       </Card>
//     </Grid>
//   );
// }

// function RecentOrders() {
//   const [dataSource, setDataSource] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     getOrders().then((res) => {
//       setDataSource(res.products.splice(0, 3));
//       setLoading(false);
//     });
//   }, []);

//   return (
//     <Box sx={{ width: "50%", paddingRight: 2 }}>
//       <Typography variant="h6" gutterBottom>
//         Recent Orders
//       </Typography>
//       {loading ? (
//         <CircularProgress />
//       ) : (
//         <TableContainer component={Paper}>
//           <Table>
//             <TableHead>
//               <TableRow>
//                 <TableCell>Title</TableCell>
//                 <TableCell>Quantity</TableCell>
//                 <TableCell>Price</TableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//               {dataSource.map((order, index) => (
//                 <TableRow key={index}>
//                   <TableCell>{order.title}</TableCell>
//                   <TableCell>{order.quantity}</TableCell>
//                   <TableCell>{order.discountedPrice}</TableCell>
//                 </TableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       )}
//     </Box>
//   );
// }

// function DashboardChart() {
//   const [revenueData, setRevenueData] = useState({
//     labels: [],
//     datasets: [],
//   });

//   useEffect(() => {
//     getRevenue().then((res) => {
//       const labels = res.carts.map((cart) => `User-${cart.userId}`);
//       const data = res.carts.map((cart) => cart.discountedTotal);

//       const dataSource = {
//         labels,
//         datasets: [
//           {
//             label: "Revenue",
//             data: data,
//             backgroundColor: "rgba(255, 0, 0, 0.5)",
//           },
//         ],
//       };

//       setRevenueData(dataSource);
//     });
//   }, []);

//   const options = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//       title: {
//         display: true,
//         text: "Order Revenue",
//       },
//     },
//   };

//   return (
//     <Card sx={{ width: 500, height: 300, marginLeft: 2 }}>
//       <Bar options={options} data={revenueData} />
//     </Card>
//   );
// }

// export default Dashboard;

import React from "react";

const Dashboard = () => {
  return <div></div>;
};

export default Dashboard;
