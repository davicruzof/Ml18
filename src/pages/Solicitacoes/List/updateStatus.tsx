import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import InputForm from "components/Input";
import { DialogProps, ValueType } from "./types";
import DialogComponent from "components/Dialog";
import { returnTime } from "utils/format";
import { getEmployeeById } from "services/Employee/employee";
import { useMutation } from "react-query";
import Loading from "components/Loading/Loading";

const Dialog = ({
  setOpenDialog,
  openDialog,
  updateStatusRequest,
  status,
  setStatus,
  request,
}: DialogProps) => {
  const [parecer, setParecer] = useState(request?.parecer || "");
  const [nameFuncionarioUpdate, setNameFuncionarioUpdate] = useState("");

  const { mutate: getEmployeeByIdFunc, isLoading: isLoadingEmployeeById } =
    useMutation({
      mutationFn: (formData: string) => getEmployeeById(formData),
      onSuccess: (data: any) => {
        if (data) {
          setNameFuncionarioUpdate(data[0].nome.toLowerCase());
        }
      },
    });

  const handleChange = (event: SelectChangeEvent<typeof status>) => {
    setStatus("");
    setStatus(event.target.value);
  };

  const handleUpdateRequest = () => {
    const sendData = {
      id_solicitacao: request.id,
      status,
      parecer,
    };

    updateStatusRequest(sendData);
  };

  useEffect(() => {
    console.log(request?.status);
    if (
      request?.status === "PENDENTE" ||
      (!request?.id_funcionario_analise && !request?.id_funcionario_finalizada)
    ) {
      return setNameFuncionarioUpdate("");
    }

    const idFuncionarioUpdate =
      request.status === "ANDAMENTO"
        ? request?.id_funcionario_analise
        : request?.id_funcionario_finalizada;

    getEmployeeByIdFunc(idFuncionarioUpdate.toString());
  }, [request]);

  return (
    <DialogComponent
      open={openDialog}
      title="Solicitação"
      setOpen={setOpenDialog}
      disableClose={request?.status === "ATENDIDA"}
      buttonConfirmText={
        request?.status === "ATENDIDA" ? "Fechar" : "Atualizar"
      }
      handleButtonConfirm={() =>
        request?.status === "ATENDIDA"
          ? setOpenDialog(!openDialog)
          : handleUpdateRequest()
      }
    >
      <Box
        component="form"
        sx={{
          display: "flex",
          flexWrap: "wrap",
          minHeight: 200,
          minWidth: 200,
          justifyContent: isLoadingEmployeeById ? "center" : "flex-start",
          alignItems: "center",
        }}
      >
        {isLoadingEmployeeById ? (
          <CircularProgress />
        ) : (
          <>
            {nameFuncionarioUpdate.length > 0 && (
              <FormControl sx={{ mb: 3, width: "100%" }}>
                <Alert severity="info">
                  Atualizado há {returnTime(request?.atualizado_a)} por{" "}
                  {nameFuncionarioUpdate}
                </Alert>
              </FormControl>
            )}
            <FormControl sx={{ mb: 3, width: "100%" }}>
              <h5>Justificativa:</h5>
              <span>{request?.justificativa}</span>
            </FormControl>
            <FormControl sx={{ mb: 1, minWidth: 250, width: "100%" }}>
              <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                disabled={request?.status === "ATENDIDA"}
                native
                value={status}
                onChange={handleChange}
                label="Status"
              >
                <option value="SOLICITADO">Solicitado</option>
                <option value="ANDAMENTO">Em andamento</option>
                <option value="ATENDIDA">Finalizada</option>
              </Select>
            </FormControl>
            <FormControl sx={{ mt: 1, width: "100%" }}>
              <InputForm
                label="Parecer da solicitacao"
                multiline
                disabled={request?.status === "ATENDIDA"}
                maxRows={8}
                onChange={(e: ValueType) => setParecer(e.target.value)}
                value={parecer}
              />
            </FormControl>
            {request?.status === "ATENDIDA" && (
              <Alert severity="warning" sx={{ width: "100%" }}>
                Está solicitação não pode ser modificada pois já foi finalizada!
              </Alert>
            )}
          </>
        )}
      </Box>
    </DialogComponent>
  );
};

export default Dialog;
