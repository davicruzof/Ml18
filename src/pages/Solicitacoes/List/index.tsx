import EditIcon from "@mui/icons-material/Edit";
import { Chip, IconButton } from "@mui/material";
import Snack from "components/Snack";
import { useEffect, useMemo, useState } from "react";
import { useMutation, useQuery } from "react-query";
import { getMe } from "services/Auth/auth";
import { UserData } from "services/Auth/types";
import { listRequests, updateRequest } from "services/Solicitacoes";
import { listRequestResponse } from "services/Solicitacoes/types";
import { TypeListRequest } from "services/Solicitacoes/types";
import { returnTime } from "utils/format";

import { formatRequests, statusUtil } from "../util";
import Dialog from "./updateStatus";
import Table from "components/Table";

const ListRequests = () => {
  const [requests, setRequests] = useState<listRequestResponse[]>([]);
  const [updateRow, setUpdateRow] = useState<listRequestResponse>();
  const [pageSize, setPageSize] = useState<number>(10);

  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<string>("");
  const [idFunc, setIdFunc] = useState<number | string>("");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const { data: UserData, isLoading: isLoadingUserData } = useQuery("getMe", {
    queryFn: () => getMe(),
    enabled: true,
    keepPreviousData: false,
  });

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

  const handleSnack = (type: "error" | "success", text: string) => {
    setSnackStatus(true);
    setSnackType(type);
    setSnackMessage(text);
  };

  const { mutate: updateStatusRequest, isLoading: isLoadingUpdateRequests } =
    useMutation({
      mutationFn: (formData: any) => updateRequest(formData),
      onSuccess: () => {
        handleSnack("success", "Solicitação atualizada com sucesso!");
        if (UserData) {
          const sendData = {
            status: "",
            departamento: handleDptsID(UserData),
          };
          getRequests(sendData);
          setOpen(false);
        }
      },
      onError: () => {
        handleSnack("error", "Ocorreu um erro, tente novamente!");
      },
    });

  const handleUpdate = (data: listRequestResponse) => {
    console.log(data);
    setOpen(!open);
    setUpdateRow(data);
    setStatus(data.status);
  };

  const VISIBLE_FIELDS = [
    { field: "nome", headerName: "Funcionário", width: 300 },
    { field: "area", headerName: "Departamento", width: 200 },
    { field: "modulo", headerName: "Tipo", width: 150 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: ({ row }: { row: listRequestResponse }) => {
        const { bg, color, title } = statusUtil[row.status];
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
      headerName: "Atualizar",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }: { row: listRequestResponse }) => {
        return [
          <IconButton
            color="primary"
            aria-label="edit request"
            component="label"
            onClick={() => handleUpdate(row)}
          >
            <EditIcon />
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
    return isLoadingRequests || isLoadingUserData || isLoadingUpdateRequests;
  }, [isLoadingRequests, isLoadingUserData, isLoadingUpdateRequests]);

  return (
    <>
      <Table
        loading={loading}
        fields={VISIBLE_FIELDS}
        rows={requests}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      <Dialog
        setStatus={setStatus}
        status={status}
        openDialog={open}
        setOpenDialog={setOpen}
        updateStatusRequest={updateStatusRequest}
        request={updateRow!}
      />

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </>
  );
};

export default ListRequests;
