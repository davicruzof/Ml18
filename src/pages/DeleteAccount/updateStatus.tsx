import { Box, FormControl } from "@mui/material";
import { deleteAccount } from "services/Employee/employee";

import DialogComponent from "components/Dialog";
import { useMutation } from "react-query";
import { DialogProps } from "./types";

const Dialog = ({ setOpen, open, row }: DialogProps) => {
  const { mutate: removeAccount, isLoading } = useMutation({
    mutationFn: (id: number) => deleteAccount(id),
    onSuccess: () => {
      setOpen(!open);
    },
  });

  const handleUpdateStatus = () => {
    removeAccount(row?.id_funcionario);
  };

  return (
    <DialogComponent
      open={open}
      title="Confirmação de exclusão de conta"
      setOpen={setOpen}
      buttonConfirmText="Confirmar exclusão da conta"
      handleButtonConfirm={isLoading ? () => {} : handleUpdateStatus}
    >
      <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControl sx={{ mb: 3, width: "100%" }}>
          <h5>Justificativa:</h5>
          <span>{row?.justificativa}</span>
        </FormControl>
      </Box>
    </DialogComponent>
  );
};

export default Dialog;
