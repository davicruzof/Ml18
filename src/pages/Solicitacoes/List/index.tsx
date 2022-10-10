import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/Buttons/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  IconButton,
  InputLabel,
  OutlinedInput,
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
import { returnTime } from "@utils/format";
import InputForm from "components/Input";
import { ValueType } from "./types";

export default function ListEnterprise() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<listRequestResponse[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const [parecer, setParecer] = useState("");
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [newStatus, setNewStatus] = useState<number | string>("");
  const [newStatus2, setNewStatus2] = useState<number | string>("");
  const [idUpdate, setIDUpdate] = useState<number | string>("");
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
        setOpen(false);
        setOpen2(false);
      },
      onError: () => {
        alert("Ocorreu um erro, tente novamente!");
      },
    });

  const handleChange = (event: SelectChangeEvent<typeof newStatus>) => {
    setNewStatus("");
    setNewStatus(event.target.value);
  };

  const handleChange2 = (event: SelectChangeEvent<typeof newStatus>) => {
    setNewStatus2("");
    setNewStatus2(event.target.value);
  };

  const handleClickOpen = (id: string) => {
    setIDUpdate(id);
    setOpen(true);
  };

  const handleClose = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  const handleClose2 = (
    event: React.SyntheticEvent<unknown>,
    reason?: string
  ) => {
    if (reason !== "backdropClick") {
      setOpen2(false);
    }
  };

  const handleUpdateStatus = () => {
    if (idUpdate && newStatus) {
      const sendData = {
        id_solicitacao: idUpdate,
        status: newStatus,
      };
      updateStatusRequest(sendData);
    }
  };

  const handleUpdateStatus2 = () => {
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
    setNewStatus2(data.status);
    setIDUpdate2(data.id_solicitacao);
  };

  const VISIBLE_FIELDS = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "id_funcionario", headerName: "Funcionário", width: 100 },
    { field: "area", headerName: "Departamento", width: 200 },
    { field: "modulo", headerName: "Tipo de Solicitação", width: 200 },
    { field: "justificativa", headerName: "Descrição", width: 300 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (data: any) => {
        const { title, bg, color } = statusUtil[data.row.status];
        return [
          <Chip
            label={title}
            onClick={() => handleClickOpen(data.row.id_solicitacao)}
            style={{ color, backgroundColor: bg }}
          />,
        ];
      },
    },
    {
      field: "data",
      headerName: "Tempo",
      width: 150,
      renderCell: (data: any) => {
        return [<span>{returnTime(data.row.cadastrado_a)}</span>];
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
        <div style={{ width: "100%", height: 685 }}>
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

      <Dialog disableEscapeKeyDown open={open2} onClose={handleClose2}>
        <DialogTitle>Atualizar status da solicitacao</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                native
                value={newStatus2}
                onChange={handleChange2}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value="ANDAMENTO">Em andamento</option>
                <option value="ATENDIDA">Finalizada</option>
              </Select>
            </FormControl>
            <FormControl sx={{ m: 1, width: "100%" }}>
              <InputForm
                label="Parecer da solicitacao"
                multiline
                maxRows={8}
                onChange={(e: ValueType) => setParecer(e.target.value)}
                value={parecer}
              />
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose2}>Cancel</Button>
          <Button onClick={handleUpdateStatus2}>Atualizar</Button>
        </DialogActions>
      </Dialog>

      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>Atualizar status da solicitacao</DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ display: "flex", flexWrap: "wrap" }}>
            <FormControl sx={{ m: 1, minWidth: 250 }}>
              <InputLabel htmlFor="demo-dialog-native">Status</InputLabel>
              <Select
                native
                value={newStatus}
                onChange={handleChange}
                input={<OutlinedInput label="Age" id="demo-dialog-native" />}
              >
                <option aria-label="None" value="" />
                <option value="ANDAMENTO">Em andamento</option>
                <option value="ATENDIDA">Finalizada</option>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleUpdateStatus}>Atualizar</Button>
        </DialogActions>
      </Dialog>
    </S.Container>
  );
}
