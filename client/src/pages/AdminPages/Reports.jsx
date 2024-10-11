import React, { useEffect, useState, useRef } from "react";
import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import axios from "axios";

import { Box } from "@mui/material";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Reports = () => {
  const [eventData, setEventData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [bankReportData, setBankReportData] = useState([]);
  const [branchReportData, setBranchReportData] = useState([]);
  const [selectedType, setSelectedType] = useState("all");
  const [chartType, setChartType] = useState("line");
  const chartRef = useRef(null);

  // Fetch all events
  const fetchAllEvents = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/eventdetails`
      );
      setEventData(response.data);
    } catch (error) {
      console.log("Error fetching events:", error);
    }
  };

  const fetchUserReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/userreport`
      );
      setUserData(response.data);
    } catch (error) {
      console.log("Error fetching user reports:", error);
    }
  };

  const fetchBankReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/eventdetailsbank`
      );
      setBankReportData(response.data);
    } catch (error) {
      console.log("Error fetching bank reports:", error);
    }
  };

  const fetchBranchReport = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/admin/eventdetailsbranch`
      );
      setBranchReportData(response.data);
    } catch (error) {
      console.log("Error fetching branch reports:", error);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchAllEvents();
    fetchUserReport();
    fetchBankReport();
    fetchBranchReport();
  }, []);

  // Filter event data based on selected event type
  const filteredEventData = eventData.filter((event) => {
    if (selectedType === "all") return true;
    return event.type === selectedType;
  });

  // Prepare data for the chart
  const [selectedGraph, setSelectedGraph] = useState("events");

  const eventDates = filteredEventData.map((data) => data._id);
  const eventCounts = filteredEventData.map((data) => data.count);

  const userDates = userData.map((data) => data._id);
  const userCounts = userData.map((data) => data.count);

  const bankDates = bankReportData.map((data) => data._id);
  const bankCounts = bankReportData.map((data) => data.count);

  const branchDates = branchReportData.map((data) => data._id);
  const branchCounts = branchReportData.map((data) => data.count);

  let labels, dataCounts;

  switch (selectedGraph) {
    case "userReports":
      labels = userDates;
      dataCounts = userCounts;
      break;
    case "bankReports":
      labels = bankDates;
      dataCounts = bankCounts;
      break;
    case "branchReports":
      labels = branchDates;
      dataCounts = branchCounts;
      break;
    case "events":
    default:
      labels = eventDates;
      dataCounts = eventCounts;
  }

  const colorMapping = {
    events: {
      borderColor: "rgba(234, 179, 8, 1)",
      backgroundColor: "rgba(234, 179, 8, 0.5)",
    },
    userReports: {
      borderColor: "rgba(6, 78, 59, 1) ",
      backgroundColor: "rgba(6, 78, 59, 0.4) ",
    },
    bankReports: {
      borderColor: "rgba(197, 48, 48, 1)",
      backgroundColor: "rgba(197, 48, 48, 0.5)",
    },
    branchReports: {
      borderColor: "rgba(0, 0, 139, 1)",
      backgroundColor: "rgba(0, 0, 139, 0.5)",
    },
  };

  const chartOptions = {
    plugins: {
      legend: {
        display: false, // This disables the label box
      },
    },
  };

  const chartData = {
    labels,
    datasets: [
      {
        label: "",
        data: dataCounts,
        borderColor: colorMapping[selectedGraph].borderColor,
        backgroundColor: colorMapping[selectedGraph].backgroundColor,
        borderWidth: 1,
      },
    ],
  };

  // Function to handle graph type change
  const handleGraphTypeChange = (type) => {
    setSelectedGraph(type);
  };

  // Function to handle chart type switch
  const toggleChartType = () => {
    setChartType((prevType) => (prevType === "line" ? "bar" : "line"));
  };

  // Handle download as image
  const handleDownload = () => {
    const chart = chartRef.current;
    const url = chart.toBase64Image();
    const link = document.createElement("a");
    link.href = url;
    link.download = "graph.png";
    link.click();
  };

  return (
    <Box sx={{ padding: 3, height: "90vh", overflowY: "auto" }}>
      <div className="relative ">
        <div className="mt-2 mb-4 ml-2">
          <button
            onClick={() => handleGraphTypeChange("userReports")}
            className="px-4 py-2 mr-2 text-white transition bg-green-900 rounded hover:bg-green-900"
          >
            User
          </button>
          <button
            onClick={() => handleGraphTypeChange("events")}
            className="px-4 py-2 mr-2 text-white transition bg-[#b8860b] rounded hover:bg-[#b8860c]"
          >
            Events
          </button>

          <button
            onClick={() => handleGraphTypeChange("bankReports")}
            className="px-4 py-2 mr-2 text-white transition bg-red-600 rounded hover:bg-red-700"
          >
            Bank Reports
          </button>
          <button
            onClick={() => handleGraphTypeChange("branchReports")}
            className="px-4 py-2 mr-2 text-white transition bg-[#00008b] rounded hover:bg-[#00008c]"
          >
            Branch Reports
          </button>
        </div>

        {/* Toggle button */}
        <div className="absolute space-x-2 top-[0.30px] right-4">
          <button
            onClick={toggleChartType}
            className="px-4 py-2 font-bold text-black transition bg-gray-400 border-black rounded hover:bg-gray-500"
            aria-pressed={chartType === "bar"}
          >
            {chartType === "line" ? "Bar" : "Line"} Chart
          </button>
          <button
            onClick={handleDownload}
            className="px-4 py-2 text-white transition bg-black rounded hover:bg-yellow-600"
          >
            Download as PNG
          </button>
        </div>

        {chartType === "line" ? (
          <Line
            ref={chartRef}
            data={chartData}
            options={chartOptions}
            width={400}
            height={180}
          />
        ) : (
          <Bar
            ref={chartRef}
            data={chartData}
            options={chartOptions}
            width={400}
            height={180}
          />
        )}
      </div>
    </Box>
  );
};

export default Reports;
