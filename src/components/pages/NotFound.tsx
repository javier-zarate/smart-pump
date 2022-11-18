import React from "react";
import { Box, Typography } from "@mui/material";

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "primary",
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        404 Page Not Found
      </Typography>
    </Box>
  );
};
