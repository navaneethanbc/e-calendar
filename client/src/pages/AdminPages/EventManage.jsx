import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TableStructure from "../../components/Admin/TableStructure";

function EventManage() {
  const [loading, setLoading] = useState(false);
  const [dataSourceBank, setDataSourceBank] = useState([]);
  const [dataSourceBranchA, setDataSourceBranchA] = useState([]);
  const [dataSourceBranchB, setDataSourceBranchB] = useState([]);
  const [dataSourceBranchC, setDataSourceBranchC] = useState([]);
  const [dataSourceBranchD, setDataSourceBranchD] = useState([]);

  const bankEvent = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://e-calendar-cocq.vercel.app/admin/bankevent`
      );
      setDataSourceBank(response.data);
    } catch (error) {
      setError("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  const branchEventA = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://e-calendar-cocq.vercel.app/admin/branchevent/Branch A`
      );
      setDataSourceBranchA(response.data);
    } catch (error) {
      setError("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  const branchEventB = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://e-calendar-cocq.vercel.app/admin/branchevent/Branch B`
      );
      setDataSourceBranchB(response.data);
    } catch (error) {
      setError("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  const branchEventC = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://e-calendar-cocq.vercel.app/admin/branchevent/Branch C`
      );
      setDataSourceBranchC(response.data);
    } catch (error) {
      setError("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  const branchEventD = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://e-calendar-cocq.vercel.app/admin/branchevent/Branch D`
      );
      setDataSourceBranchD(response.data);
    } catch (error) {
      setError("Error fetching user details.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    bankEvent();
    branchEventA();
    branchEventB();
    branchEventC();
    branchEventD();
  }, []);

  return (
    <Box sx={{ padding: 3, height: "90vh", overflowY: "auto" }}>
      <TableStructure
        headers={"Bank"}
        loading={loading}
        dataSource={dataSourceBank}
      />
      <br />
      <TableStructure
        headers={"Branch A"}
        loading={loading}
        dataSource={dataSourceBranchA}
      />
      <br />
      <TableStructure
        headers={"Branch B"}
        loading={loading}
        dataSource={dataSourceBranchB}
      />
      <br />
      <TableStructure
        headers={"Branch C"}
        loading={loading}
        dataSource={dataSourceBranchC}
      />
      <br />
      <TableStructure
        headers={"Branch D"}
        loading={loading}
        dataSource={dataSourceBranchD}
      />
    </Box>
  );
}

export default EventManage;
