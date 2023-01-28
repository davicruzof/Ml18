import { Box, FormControl } from "@mui/material";

import DialogComponent from "components/Dialog";

interface DialogProps {
  setOpen: (v: boolean) => void;
  open: boolean;
  row: any;
}

const Dialog = ({ setOpen, open, row }: DialogProps) => {
  const handleUpdateStatus = () => {
    setOpen(!open);
  };

  console.log(row);

  if (!row.foto && !row.data_cadastro) {
    return null;
  }

  return (
    <DialogComponent
      open={open}
      title="Confirmação de Apontamento"
      setOpen={setOpen}
      buttonConfirmText="fechar"
      handleButtonConfirm={handleUpdateStatus}
    >
      <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControl sx={{ mb: 3, width: "100%" }}>
          <h5>Data da confirmação:{row.data_cadastro}</h5>
          <img
            style={{ objectFit: "contain", height: 500, width: "auto" }}
            src={row.foto}
          />
        </FormControl>
      </Box>
    </DialogComponent>
  );
};

export default Dialog;
