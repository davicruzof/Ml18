import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    </div>
  );
}
