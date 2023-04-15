import React from "react";

import * as S from "./styles";
import { Box, LinearProgress, Typography } from "@mui/material";

export function ProgressLoading({ progress, text }: any) {
  return (
    <S.LoadingContainer>
      <LinearProgress variant="determinate" value={progress} />
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(
          progress
        )}%`}</Typography>
      </Box>
      <Box sx={{ mt: 5 }}>
        <Typography variant="h5" color="text.error">
          {text}
        </Typography>
      </Box>
    </S.LoadingContainer>
  );
}
