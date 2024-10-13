import { useState, useRef, useEffect } from "react";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";
import { Box } from "@mui/material";
import { Outlet } from "react-router-dom";

function PageContent() {
  const [open, setOpen] = useState(() => {
    return localStorage.getItem("drawerOpen") === "true";
  });

  const pageRef = useRef(null);

  const handleDrawer = () => {
    setOpen((prevOpen) => {
      const newOpen = !prevOpen;
      localStorage.setItem("drawerOpen", newOpen);
      return newOpen;
    });
  };

  useEffect(() => {
    const handleResize = () => {
      if (pageRef.current && pageRef.current.getApi) {
        pageRef.current.getApi().updateSize();
      }
    };

    handleResize(); // Initial resize call

    window.addEventListener("resize", handleResize); // Handle window resizing

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, [open]); // Depend on drawer state

  return (
    <>
      <AdminHeader handleDrawer={handleDrawer} />
      <div>
        <Box display={"flex"}>
          <SideMenu open={open} />
          <Box
            height="calc(100vh - 64px)"
            width={"100%"}
            sx={{
              transition: "width 0.3s",
              overflow: "hidden",
              "@media (max-width: 600px)": {
                width: open ? "0%" : "100%",
                display: open ? "none" : "block",
              },
            }}
          >
            <div ref={pageRef}>
              <Outlet />
            </div>
          </Box>
        </Box>
      </div>
    </>
  );
}

export default PageContent;
