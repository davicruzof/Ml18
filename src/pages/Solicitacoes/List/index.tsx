import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/Buttons/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import {
  Box,
  Chip,
  FormControl,
  IconButton,
  InputLabel,
  Select,
  SelectChangeEvent,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { getMe } from "services/Auth/auth";
import { listRequests, updateRequest } from "services/Solicitacoes";
import { listRequestResponse } from "services/Solicitacoes/types";
import { TypeListRequest } from "services/Solicitacoes/types";
import { UserData } from "services/Auth/types";
import { statusUtil } from "../util";
import { returnTime } from "utils/format";
import InputForm from "components/Input";
import { ValueType } from "./types";
import DialogComponent from "components/Dialog";
import Sider from "components/Sider";

const ListRequests = () => {
  const navigation = useNavigate();
  const [rows, setRows] = useState<listRequestResponse[]>([]);
  const [updateRow, setUpdateRow] = useState<listRequestResponse>();
  const [pageSize, setPageSize] = useState<number>(10);

  const [parecer, setParecer] = useState("");
  const [open2, setOpen2] = useState(false);
  const [newStatus2, setNewStatus2] = useState<number | string>("");
  const [idUpdate2, setIDUpdate2] = useState<number | string>("");
  const [idFunc, setIdFunc] = useState<number | string>("");

  const { isLoading: isLoadingUserData, refetch } = useQuery("getMe", {
    queryFn: () => getMe(),
    enabled: true,
    keepPreviousData: false,
    onSuccess: (data: UserData) => {
      if (data.departamentos && data.user) {
        setIdFunc(data.user.id_funcionario);
        const dpts = data.departamentos.map((item) => item.id_area);
        const sendData = {
          status: "",
          departamento: dpts,
        };
        getListRequests(sendData);
      }
    },
  });

  const {
    mutate: getListRequests,
    isLoading: isLoadingRequests,
    data: dataRequests,
  } = useMutation({
    mutationFn: (formData: TypeListRequest) => listRequests(formData),
    onSuccess: (data: listRequestResponse[]) => {
      if (data) {
        const send: listRequestResponse[] = [];
        data.map((item) => {
          if (
            item.id_funcionario_analise === idFunc ||
            item.status !== "ATENDIDA"
          ) {
            send.push({
              id: item.id_solicitacao,
              ...item,
            });
          }
        });
        setRows(send);
      }
    },
  });

  const { mutate: updateStatusRequest, isLoading: isLoadingUpdateRequests } =
    useMutation({
      mutationFn: (formData: any) => updateRequest(formData),
      onSuccess: (data: any) => {
        refetch();
        setOpen2(false);
      },
      onError: () => {
        alert("Ocorreu um erro, tente novamente!");
      },
    });

  const handleChange2 = (event: SelectChangeEvent<typeof newStatus2>) => {
    setNewStatus2("");
    setNewStatus2(event.target.value);
  };

  const handleUpdateStatus2 = () => {
    setNewStatus2("");
    if (idUpdate2 && newStatus2) {
      const sendData = {
        id_solicitacao: idUpdate2,
        status: newStatus2,
        parecer,
      };
      updateStatusRequest(sendData);
    }
  };

  const handleUpdate = (data: any) => {
    setOpen2(!open2);
    setUpdateRow(data);
    setParecer(data.parecer);
    setNewStatus2(data.status);
    setIDUpdate2(data.id_solicitacao);
  };

  const VISIBLE_FIELDS = [
    { field: "nome", headerName: "Funcionário", width: 300 },
    { field: "area", headerName: "Departamento", width: 150 },
    { field: "modulo", headerName: "Tipo", width: 100 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (data: any) => {
        const { title, bg, color } = statusUtil[data.row.status];
        return [<Chip label={title} style={{ color, backgroundColor: bg }} />];
      },
    },
    {
      field: "data",
      headerName: "Criado há",
      width: 80,
      renderCell: (data: any) => {
        return [<span>{returnTime(data.row.cadastrado_a)}</span>];
      },
    },
    {
      field: "update",
      headerName: "Atualizado há",
      width: 110,
      renderCell: (data: any) => {
        return [<span>{returnTime(data.row.atualizado_a)}</span>];
      },
    },
    {
      field: "Editar",
      type: "actions",
      headerName: "Atualizar",
      width: 100,
      cellClassName: "actions",
      getActions: (data: any) => {
        return [
          <IconButton
            color="primary"
            aria-label="edit request"
            component="label"
            onClick={() => handleUpdate(data.row)}
          >
            <EditIcon />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    if (dataRequests) {
      const send: listRequestResponse[] = [];
      dataRequests.map((item) => {
        if (
          item.id_funcionario_analise === idFunc ||
          item.status !== "ATENDIDA"
        ) {
          send.push({
            id: item.id_solicitacao,
            ...item,
          });
        }
      });
      setRows(send);
    }
  }, [dataRequests]);

  if (isLoadingRequests || isLoadingUserData || isLoadingUpdateRequests) {
    return (
      <div style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </div>
    );
  }

  const SelectStatus = ({
    newStatus,
    handleChange,
  }: {
    newStatus: string | number;
    handleChange: (event: SelectChangeEvent<typeof newStatus>) => void;
  }) => {
    return (
      <FormControl sx={{ mb: 1, minWidth: 250, width: "100%" }}>
        <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
        <Select native value={newStatus} onChange={handleChange} label="Status">
          <option value="SOLICITADO">Solicitado</option>
          <option value="ANDAMENTO">Em andamento</option>
          <option value="ATENDIDA">Finalizada</option>
        </Select>
      </FormControl>
    );
  };

  return (
    <S.Container>
      <S.Wrapper>
        <ButtonComponent
          onClick={() => navigation("/Solicitacoes/New", { replace: true })}
          loading={false}
          title="+ Adicionar nova solicitação"
          active={false}
        />
      </S.Wrapper>

      {rows.length > 0 && rows[0]?.id && dataRequests && (
        <div style={{ width: "100%", height: "100%" }}>
          <DataGrid
            loading={isLoadingRequests || isLoadingUserData}
            columns={VISIBLE_FIELDS}
            rows={rows}
            style={{ padding: 15, paddingBottom: 5, paddingLeft: 20 }}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[5, 10, 20, 50, 100]}
            pagination
            disableSelectionOnClick
          />
        </div>
      )}

      <DialogComponent
        open={open2}
        title="Atualizar solicitação"
        setOpen={setOpen2}
        buttonConfirmText="Atualizar"
        handleButtonConfirm={handleUpdateStatus2}
      >
        <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
          <FormControl sx={{ mb: 3, width: "100%" }}>
            <h4>Justificativa:</h4>
            <span>{updateRow?.justificativa}</span>
          </FormControl>
          <SelectStatus newStatus={newStatus2} handleChange={handleChange2} />
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
    </S.Container>
  );
};

export default ListRequests;
