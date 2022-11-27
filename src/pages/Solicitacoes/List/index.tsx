import { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useMutation, useQuery } from "react-query";
import Loading from "components/Loading/Loading";
import { Chip, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { getMe } from "services/Auth/auth";
import { listRequests, updateRequest } from "services/Solicitacoes";
import { listRequestResponse } from "services/Solicitacoes/types";
import { TypeListRequest } from "services/Solicitacoes/types";
import { UserData } from "services/Auth/types";
import { statusUtil } from "../util";
import { returnTime } from "utils/format";
import Empty from "components/Empty";
import Dialog from "./updateStatus";

const ListRequests = () => {
  const [requests, setRequests] = useState<listRequestResponse[]>([]);
  const [departamentos, setDepartamentos] = useState<number[]>([]);
  const [updateRow, setUpdateRow] = useState<listRequestResponse>();
  const [pageSize, setPageSize] = useState<number>(10);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [idRequest, setIdRequest] = useState<number | string>("");
  const [idFunc, setIdFunc] = useState<number | string>("");

  const { isLoading: isLoadingUserData } = useQuery("getMe", {
    queryFn: () => getMe(),
    enabled: true,
    keepPreviousData: false,
    onSuccess: (data: UserData) => {
      if (data.departamentos && data.user) {
        setIdFunc(data.user.id_funcionario);
        const dpts = data.departamentos.map((item) => item.id_area);
        setDepartamentos(dpts);
      }
    },
  });

  const { mutate: getRequests, isLoading: isLoadingRequests } = useMutation({
    mutationFn: (formData: TypeListRequest) => listRequests(formData),
    onSuccess: (data: listRequestResponse[]) => {
      if (data) {
        const requestsFormatted = formatRequests(data);
        setRequests(requestsFormatted);
      }
    },
  });

  const formatRequests = (data: listRequestResponse[]) => {
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
    return send;
  };

  const { mutate: updateStatusRequest, isLoading: isLoadingUpdateRequests } =
    useMutation({
      mutationFn: (formData: any) => updateRequest(formData),
      onSuccess: () => {
        const sendData = {
          status: "",
          departamento: departamentos,
        };
        getRequests(sendData);
        setOpen(false);
      },
      onError: () => {
        alert("Ocorreu um erro, tente novamente!");
      },
    });

  const handleUpdate = (data: any) => {
    setOpen(!open);
    setUpdateRow(data);
    setStatus(data.status);
    setIdRequest(data.id_solicitacao);
  };

  const VISIBLE_FIELDS = [
    { field: "nome", headerName: "Funcionário", width: 300 },
    { field: "area", headerName: "Departamento", width: 200 },
    { field: "modulo", headerName: "Tipo", width: 150 },
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

  const height = window.innerHeight - 100;

  useEffect(() => {
    if (departamentos.length > 0) {
      const sendData = {
        status: "",
        departamento: departamentos,
      };
      getRequests(sendData);
    }
  }, [departamentos]);

  if (isLoadingRequests || isLoadingUserData || isLoadingUpdateRequests) {
    return <Loading />;
  }

  if (requests.length === 0) {
    return <Empty text="Nenhuma solicitação foi encontrada!" />;
  }

  return (
    <div>
      <DataGrid
        columns={VISIBLE_FIELDS}
        rows={requests}
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

      <Dialog
        setStatus={setStatus}
        status={status}
        open={open}
        setOpen={setOpen}
        id_solicitacao={idRequest}
        updateStatusRequest={updateStatusRequest}
        justificativa={updateRow?.justificativa}
      />
    </div>
  );
};

export default ListRequests;
