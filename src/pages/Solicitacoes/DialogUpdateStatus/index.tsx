import { useMutation } from "react-query";
import { Box, FormControl, InputLabel, Select } from "@mui/material";
import { updateRequest } from "services/Solicitacoes";
import { useState } from "react";
import DialogComponent from "components/Dialog";

export function DialogUpdateStatus({
  statusData,
  setOpenDialog,
  openDialog,
  id_solicitacao,
  handleSnack,
}: any) {
  const [status, setStatus] = useState(statusData);

  const { mutate: updateStatusRequest } = useMutation({
    mutationFn: (formData: any) => updateRequest(formData),
    onSuccess: () => {
      handleSnack("success", "Solicitação atualizada com sucesso!");

      setOpenDialog(false);
    },
    onError: () => {
      handleSnack("error", "Ocorreu um erro, tente novamente!");
    },
  });

  const handleUpdateStatus = () => {
    updateStatusRequest({ status, id_solicitacao });
  };

  return (
    <DialogComponent
      buttonConfirmText="Atualizar Status"
      setOpen={setOpenDialog}
      open={openDialog}
      handleButtonConfirm={handleUpdateStatus}
      title="Atualizar Status da Solicitação"
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
          <Select
            native
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            label="Status"
          >
            <option value="PENDENTE">Solicitado</option>
            <option value="ANDAMENTO">Em Andamento</option>
            <option value="ATENDIDA">Finalizada</option>
          </Select>
        </FormControl>
      </Box>
    </DialogComponent>
  );
}
