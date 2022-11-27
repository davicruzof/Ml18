import { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import InputForm from "components/Input";
import { ValueType } from "./types";
import DialogComponent from "components/Dialog";

interface DialogProps {
  setOpen: (v: boolean) => void;
  setStatus: (v: string) => void;
  open: boolean;
  status: string;
  id_solicitacao: string | number;
  updateStatusRequest: ({}) => void;
  justificativa: string | undefined;
}

const Dialog = ({
  setOpen,
  open,
  id_solicitacao,
  updateStatusRequest,
  justificativa,
  status,
  setStatus,
}: DialogProps) => {
  const [parecer, setParecer] = useState("");

  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus("");
    setStatus(event.target.value);
  };

  const handleUpdateStatus = () => {
    const sendData = {
      id_solicitacao,
      status,
      parecer,
    };
    updateStatusRequest(sendData);
  };

  return (
    <DialogComponent
      open={open}
      title="Atualizar solicitação"
      setOpen={setOpen}
      buttonConfirmText="Atualizar"
      handleButtonConfirm={handleUpdateStatus}
    >
      <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControl sx={{ mb: 3, width: "100%" }}>
          <h4>Justificativa:</h4>
          <span>{justificativa}</span>
        </FormControl>
        <FormControl sx={{ mb: 1, minWidth: 250, width: "100%" }}>
          <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
          <Select native value={status} onChange={handleChange} label="Status">
            <option value="SOLICITADO">Solicitado</option>
            <option value="ANDAMENTO">Em andamento</option>
            <option value="ATENDIDA">Finalizada</option>
          </Select>
        </FormControl>
        <FormControl sx={{ mt: 1, width: "100%" }}>
          <InputForm
            label="Parecer da solicitacao"
            multiline
            maxRows={8}
            onChange={(e: ValueType) => setParecer(e.target.value)}
            value={parecer}
          />
        </FormControl>
      </Box>
    </DialogComponent>
  );
};

export default Dialog;
