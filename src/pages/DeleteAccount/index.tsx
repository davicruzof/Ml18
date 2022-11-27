import React, { useEffect, useState } from "react";
import * as S from "./styles";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation } from "react-query";
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
import { listRequests, updateRequest } from "services/Solicitacoes";
import { listRequestResponse } from "services/Solicitacoes/types";
import { TypeListRequest } from "services/Solicitacoes/types";
import { statusUtil } from "./util";
import { returnTime } from "utils/format";
import InputForm from "components/Input";
import { ValueType } from "./types";
import DialogComponent from "components/Dialog";

const DeleteAccount = () => {
  const [rows, setRows] = useState<listRequestResponse[]>([]);
  const [updateRow, setUpdateRow] = useState<listRequestResponse>();
  const [pageSize, setPageSize] = useState<number>(10);

  const [parecer, setParecer] = useState("");
  const [open2, setOpen2] = useState(false);
  const [newStatus2, setNewStatus2] = useState<number | string>("");
  const [idUpdate2, setIDUpdate2] = useState<number | string>("");
  const [idFunc, setIdFunc] = useState<number | string>("");

  useEffect(() => {
    const sendData = {
      status: "",
      departamento: [9],
    };
    getListRequests(sendData);
  }, []);

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
          if (item.status !== "ATENDIDA") {
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
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (data: any) => {
        const { title, bg, color } = statusUtil[data.row.status];
        const title2 = title === "Solicitado" ? "Pendente" : title;
        return [<Chip label={title2} style={{ color, backgroundColor: bg }} />];
      },
    },
    {
      field: "cadastro",
      headerName: "Data",
      width: 100,
      renderCell: (data: any) => {
        return [<span>{data.row.dt_cadastro}</span>];
      },
    },

    {
      field: "update",
      headerName: "Atualizado",
      width: 80,
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
        if (item.status !== "ATENDIDA") {
          send.push({
            id: item.id_solicitacao,
            ...item,
          });
        }
      });
      setRows(send);
    }
  }, [dataRequests]);

  if (isLoadingRequests || isLoadingUpdateRequests) {
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

  const height = window.innerHeight - 100;

  return (
    <S.Container>
      {rows.length > 0 && rows[0]?.id && dataRequests && (
        <DataGrid
          loading={isLoadingRequests}
          columns={VISIBLE_FIELDS}
          rows={rows}
          components={{ Toolbar: GridToolbar }}
          pageSize={pageSize}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          pagination
          style={{
            paddingLeft: 20,
            justifyContent: "space-between",
            display: "flex",
            margin: 20,
            height,
          }}
          disableSelectionOnClick
        />
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

export default DeleteAccount;
