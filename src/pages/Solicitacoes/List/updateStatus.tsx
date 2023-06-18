import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import { DialogProps } from "./types";
import DialogComponent from "components/Dialog";

const Dialog = ({
  setOpenDialog,
  openDialog,
  status,
  setStatus,
  handleChange,
}: DialogProps) => {
  const selectStatus = (event: SelectChangeEvent<typeof status>) => {
    setStatus("");
    setStatus(event.target.value);
  };

  return (
    <DialogComponent
      open={openDialog}
      title="Solicitação"
      setOpen={setOpenDialog}
      buttonConfirmText="Atualizar"
      handleButtonConfirm={handleChange}
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          minHeight: 200,
          minWidth: 200,
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <FormControl sx={{ mb: 1, minWidth: 250, width: "100%" }}>
          <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
          <Select native value={status} onChange={selectStatus} label="Status">
            <option value="SOLICITADO">Solicitado</option>
            <option value="ANDAMENTO">Em andamento</option>
            <option value="ATENDIDA">Finalizada</option>
          </Select>
        </FormControl>
      </Box>
    </DialogComponent>
  );
};

export default Dialog;
