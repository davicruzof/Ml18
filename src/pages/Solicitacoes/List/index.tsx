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

const ListRequests = () => {
  const navigation = useNavigate();
  const [requests, setRequests] = useState<listRequestResponse[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const [idFunc, setIdFunc] = useState<number | string>("");

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
    return isLoadingRequests || isLoadingUserData;
  }, [isLoadingRequests, isLoadingUserData]);

  return (
    <>
      <Table
        loading={loading}
        fields={VISIBLE_FIELDS}
        rows={requests}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </>
  );
};

export default ListRequests;
