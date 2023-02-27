import { Box, CircularProgress } from "@mui/material";
import { LoadingContainer } from "./styles";

export default function Loading() {
  return (
    <LoadingContainer>
      {/* <Box
        sx={{
          display: "flex",
          height: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      > */}
      <CircularProgress />
      {/* </Box> */}
    </LoadingContainer>
  );
}
