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

  if (!row.foto && !row.data_cadastro) {
    return null;
  }

  return (
    <DialogComponent
      open={open}
      title="Confirmação de Apontamento"
      setOpen={setOpen}
      disableClose={true}
      buttonConfirmText="fechar"
      handleButtonConfirm={handleUpdateStatus}
    >
      <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
        <FormControl sx={{ mb: 3, width: "100%" }}>
          <span>Data da confirmação:{row.data_cadastro}</span>
          <img
            loading="lazy"
            style={{ objectFit: "contain", height: 400, width: 400 }}
            src={row.foto}
          />
        </FormControl>
      </Box>
    </DialogComponent>
  );
};

export default Dialog;
