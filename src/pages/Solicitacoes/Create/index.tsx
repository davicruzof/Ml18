import React, { useEffect, useMemo, useState } from "react";
import InputForm from "components/Input";
import * as S from "./styles";
import ButtonComponent from "components/Buttons/Button";
import { SelectChangeEvent, Button, FormGroup } from "@mui/material";
import Snack from "components/Snack";
import { ValueType } from "./types";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "react-query";

import {
  DptTypes,
  TypeRequest,
  TypeSolicitations,
} from "@services/Solicitacoes/types";
import {
  createRequest,
  getDepartments,
  getTypeSolicitations,
} from "@services/Solicitacoes";

import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Loading from "components/Loading/Loading";

export default function Create() {
  const [departamentos, setDepartamentos] = useState<DptTypes[]>([]);
  const [departamento, setDepartamento] = useState("");
  const [tiposSolicitacao, setTiposSolicitacao] = useState<TypeSolicitations[]>(
    []
  );
  const [tipoSolicitacao, setTipoSolicitacao] = useState("");

  const [justificativa, setJustificativa] = useState("");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const navigate = useNavigate();

  const [dataSend, setSendData] = useState<{
    id_modulo: string;
    id_area: string;
  } | null>(null);

  const { isLoading: isLoadingDepartamentos, refetch: refetchDpts } = useQuery(
    "getDepartments",
    {
      queryFn: () => getDepartments(),
      enabled: true,
      keepPreviousData: false,
      onSuccess: (data: DptTypes[]) => {
        data.length > 0 && setDepartamentos(data);
      },
      onError: () => {
        setSnackStatus(true);
        setSnackType("error");
        setSnackMessage("Ocorreu um erro ao tentar buscar dados!");
      },
    }
  );

  const {
    mutate: getDepartamenteByName,
    isLoading: isLoadingTiposdeSolicitacoes,
  } = useMutation({
    mutationFn: (formData: string) => getTypeSolicitations(formData),
    onSuccess: (data: TypeSolicitations[]) => {
      if (data.length > 0) {
        setTiposSolicitacao(data);
      } else {
        setSnackStatus(true);
        setSnackType("error");
        setSnackMessage(
          "Desculpa não é possível realizar solicitações para esse departamento no momento"
        );
      }
    },
    onError: () => {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage("Ocorreu um erro ao tentar buscar dados!");
    },
  });

  const { mutate: createNewRequest, isLoading: isLoadingRequest } = useMutation(
    {
      mutationFn: (formData: TypeRequest) => createRequest(formData),
      onSuccess: (data) => {
        if (data?.status) {
          setSnackStatus(true);
          setSnackType("success");
          setSnackMessage(data.status);
          setDepartamento("");
          setSendData(null);
          setTiposSolicitacao([]);
          setTipoSolicitacao("");
          setJustificativa("");
        }
      },
    }
  );

  const chooseDpt = (dpt: DptTypes) => {
    setDepartamento(dpt.area);
    getDepartamenteByName(dpt.id_area);
    setSendData({ id_area: dpt.id_area, id_modulo: "" });
    setTiposSolicitacao([]);
    setTipoSolicitacao("");
  };

  const chooseType = (dpt: TypeSolicitations) => {
    setTipoSolicitacao(dpt.modulo);
    setSendData((old) =>
      old?.id_area
        ? {
            id_modulo: dpt.id_modulo,
            id_area: old.id_area,
          }
        : null
    );
  };

  const onCanSubmit = () => {
    return Boolean(departamento && tipoSolicitacao && justificativa);
  };

  const handleSubmit = () => {
    if (onCanSubmit() && dataSend) {
      const data: TypeRequest = {
        ...dataSend,
        justificativa,
      };
      createNewRequest(data);
    } else {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage(
        "Preencha todos os campos para realizar a sua solicitação"
      );
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setDepartamento(event.target.value as string);
  };

  const handleChangeTypeRequest = (event: SelectChangeEvent) => {
    setTipoSolicitacao(event.target.value as string);
  };

  useEffect(() => {
    refetchDpts();
  }, []);

  const disable = useMemo(() => {
    if (tiposSolicitacao.length > 0) {
      return false;
    }
    return (
      tiposSolicitacao.length === 0 ||
      Boolean(departamento) ||
      isLoadingTiposdeSolicitacoes
    );
  }, [departamento, tiposSolicitacao, isLoadingTiposdeSolicitacoes]);

  const isLoading = useMemo(() => {
    return (
      isLoadingTiposdeSolicitacoes &&
      isLoadingRequest &&
      isLoadingTiposdeSolicitacoes
    );
  }, [
    isLoadingTiposdeSolicitacoes,
    isLoadingRequest,
    isLoadingTiposdeSolicitacoes,
  ]);

  if (isLoadingDepartamentos) {
    return <Loading />;
  }

  return (
    <S.Container>
      <h3>Cadastro de Solicitação</h3>

      <FormControl>
        <InputLabel id="simple-select-label">Departamento</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={departamento}
          label="Departamento"
          onChange={handleChange}
        >
          {departamentos &&
            departamentos.map((item: DptTypes) => (
              <MenuItem
                key={item.id_area}
                value={item.area}
                onClick={() => chooseDpt(item)}
              >
                {item.area}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormGroup sx={{ mb: 2 }} />

      <FormControl>
        <InputLabel id="simple-select-label">Tipo de Solicitação</InputLabel>
        <Select
          labelId="simple-select-label"
          id="simple-select"
          value={tipoSolicitacao}
          disabled={disable}
          label="Tipo de Solicitação"
          onChange={handleChangeTypeRequest}
        >
          {tiposSolicitacao &&
            tiposSolicitacao.map((item: TypeSolicitations) => (
              <MenuItem
                key={item.id_modulo}
                value={item.modulo}
                onClick={() => chooseType(item)}
              >
                {item.modulo}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormGroup sx={{ mb: 2 }} />

      <InputForm
        label="Justificativa"
        multiline
        maxRows={8}
        onChange={(e: ValueType) => setJustificativa(e.target.value)}
        value={justificativa}
      />

      <FormGroup
        row
        sx={{ justifyContent: "center", alignItems: "center", mb: 4 }}
      >
        <Button
          variant="text"
          onClick={() => navigate("/Solicitacoes/List", { replace: true })}
          sx={{ mt: 3 }}
        >
          Voltar
        </Button>
        <FormGroup sx={{ mr: 4 }} />
        <ButtonComponent
          disabled={false}
          title="Cadastrar"
          loading={isLoading}
          onClick={handleSubmit}
        />
      </FormGroup>

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </S.Container>
  );
}
