import React from "react";
import { Button } from "@mui/material";

type DptButtonType = {
  handleAll: () => void;
  active: boolean;
  label: string;
};

const DptButton: React.FC<DptButtonType> = ({ handleAll, active, label }) => (
  <Button
    sx={{ my: 1 }}
    variant="outlined"
    size="small"
    style={{ width: window.innerHeight * 0.3 }}
    onClick={handleAll}
    disabled={active}
  >
    {label}
  </Button>
);

export default DptButton;
