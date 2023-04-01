import { CircularProgress } from "@mui/material";
import { LoadingContainer } from "./styles";

export default function Loading() {
  return (
    <LoadingContainer>
      <CircularProgress />
    </LoadingContainer>
  );
}
