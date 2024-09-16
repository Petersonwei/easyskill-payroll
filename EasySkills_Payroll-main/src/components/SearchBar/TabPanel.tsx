import { Box } from "@mui/material";
import React from "react";

type TabPanelProps = {
  children?: React.ReactNode;
  index: number;
  value: number;
};

const TabPanel: React.FC<TabPanelProps> = ({ children, index, value }) => {
  return value === index ? (
    <Box
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      sx={{
        flex: "66%",
        height: "100%",
        position: "relative",
        bgcolor: "#242425",
        "&::before": {
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: "1px",
          height: "100%",
          background: "#6A6A6B",
        },
      }}
    >
      {children}
    </Box>
  ) : null;
};

export default TabPanel;
