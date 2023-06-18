import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getMe } from "services/Auth/auth";
import { UserData } from "services/Auth/types";
import { listRequests } from "services/Solicitacoes";
import { listRequestResponse } from "services/Solicitacoes/types";
import { TypeListRequest } from "services/Solicitacoes/types";
import { returnTime } from "utils/format";

import { formatRequests, statusUtil } from "../util";
import Table from "components/Table";
import { useNavigate } from "react-router-dom";
import { DialogUpdateStatus } from "../DialogUpdateStatus";
import { DialogInfos } from "../DialogInfos";
import Snack from "components/Snack";
import { Chat } from "@mui/icons-material";
import { GoEye } from "react-icons/go";

const ListRequests = () => {
  const navigation = useNavigate();
  const [requests, setRequests] = useState<listRequestResponse[]>([]);
  const [request, setRequest] = useState<listRequestResponse | null>(null);
  const [pageSize, setPageSize] = useState<number>(8);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [openDialogUpdateStatus, setOpenDialogUpdateStatus] = useState(false);
  const [openDialogInfo, setOpenDialogInfo] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const [idFunc, setIdFunc] = useState<number | string>("");

  const { data: UserData, isLoading: isLoadingUserData } = useQuery("getMe", {
    queryFn: () => getMe(),
    enabled: true,
    keepPreviousData: false,
  });

  const handleSnack = (type: "error" | "success", text: string) => {
    setSnackStatus(true);
    setSnackType(type);
    setSnackMessage(text);

    if (UserData) {
      const { user } = UserData;
      setIdFunc(user.id_funcionario);

      const sendData = {
        status: "",
        departamento: handleDptsID(UserData),
      };
      getRequests(sendData);
    }
  };

  const { mutate: getRequests, isLoading: isLoadingRequests } = useMutation({
    mutationFn: (formData: TypeListRequest) => listRequests(formData),
    onSuccess: (data: listRequestResponse[]) => {
      if (data) {
        const requestsFormatted = formatRequests(data, +idFunc);
        setRequests(requestsFormatted);
      }
    },
  });

  const handleDptsID = ({ departamentos }: UserData) => {
    const departamentosIds = departamentos.map((item) => item.id_area);

    return departamentosIds;
  };

  const handleUpdate = (data: listRequestResponse) => {
    navigation(`/solicitacoes/Details`, {
      replace: true,
      state: {
        request: data,
      },
    });
  };

  const VISIBLE_FIELDS = [
    { field: "registro", headerName: "Registro", width: 100 },
    { field: "nome", headerName: "Funcionário", width: 300 },
    { field: "area", headerName: "Departamento", width: 200 },
    { field: "modulo", headerName: "Tipo", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: ({ row }: { row: listRequestResponse }) => {
        console.log(
          row.status !== "ANDAMENTO" &&
            row.status !== "ATENDIDA" &&
            row.status !== "PENDENTE" &&
            row?.id_solicitacao
        );
        const { bg, color, title } = statusUtil[row?.status];
        return [<Chip label={title} style={{ color, backgroundColor: bg }} />];
      },
    },
    {
      field: "cadastro",
      headerName: "Data",
      width: 100,
      renderCell: ({ row }: { row: listRequestResponse }) => {
        return [<span>{row.dt_cadastro}</span>];
      },
    },
    {
      field: "update",
      headerName: "Atualizado",
      width: 80,
      renderCell: ({ row }: { row: listRequestResponse }) => {
        return [<span>{returnTime(row.atualizado_a)}</span>];
      },
    },
    {
      field: "Editar",
      type: "actions",
      headerName: "Ações",
      width: 200,
      cellClassName: "actions",
      getActions: ({ row }: { row: listRequestResponse }) => {
        return [
          <IconButton
            color="primary"
            disabled={row.status === "ATENDIDA"}
            aria-label="edit request"
            component="label"
            onClick={() => {
              setRequest(row);
              setOpenDialogUpdateStatus(!openDialogUpdateStatus);
            }}
          >
            <EditIcon />
          </IconButton>,
          <IconButton
            color="primary"
            aria-label="edit request"
            component="label"
            onClick={() => handleUpdate(row)}
          >
            <Chat />
          </IconButton>,
          <IconButton
            color="primary"
            aria-label="edit request"
            component="label"
            onClick={() => {
              setRequest(row);
              setOpenDialogInfo(!openDialogInfo);
            }}
          >
            <GoEye />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    if (UserData) {
      const { user } = UserData;
      setIdFunc(user.id_funcionario);

      const sendData = {
        status: "",
        departamento: handleDptsID(UserData),
      };
      getRequests(sendData);
    }
  }, [UserData]);

  const loading = useMemo(() => {
    return isLoadingRequests || isLoadingUserData;
  }, [isLoadingRequests, isLoadingUserData]);

  return (
    <div style={{ height: "100vh" }}>
      <Table
        loading={loading}
        fields={VISIBLE_FIELDS}
        rows={requests}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      {request && (
        <DialogUpdateStatus
          statusData={request?.status}
          openDialog={openDialogUpdateStatus}
          setOpenDialog={setOpenDialogUpdateStatus}
          id_solicitacao={request?.id_solicitacao}
          handleSnack={handleSnack}
        />
      )}

      {request && (
        <DialogInfos
          openDialog={openDialogInfo}
          setOpenDialog={setOpenDialogInfo}
          request={request}
        />
      )}

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </div>
  );
};

export default ListRequests;
