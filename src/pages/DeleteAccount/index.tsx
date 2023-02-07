import { useEffect, useState } from "react";
import { useMutation } from "react-query";
import { Chip, IconButton } from "@mui/material";

import EditIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import { listRequests } from "services/Solicitacoes";
import { listRequestResponse } from "services/Solicitacoes/types";
import { TypeListRequest } from "services/Solicitacoes/types";
import { statusUtil } from "./util";
import { returnTime } from "utils/format";
import Dialog from "./updateStatus";
import Table from "components/Table";

const DeleteAccount = () => {
  const [requests, setRequests] = useState<listRequestResponse[]>([]);
  const [updateRow, setUpdateRow] = useState<listRequestResponse>();
  const [pageSize, setPageSize] = useState<number>(10);

  const [open, setOpen] = useState(false);

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
      send.push({
        id: item.id_solicitacao,
        ...item,
      });
    });
    return send;
  };

  const handleUpdate = (data: any) => {
    setOpen(!open);
    setUpdateRow(data);
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

  const newRequest = () => {
    const sendData = {
      status: "",
      departamento: [9],
    };
    getRequests(sendData);
  };

  useEffect(() => {
    newRequest();
  }, []);

  useEffect(() => {
    !open && newRequest();
  }, [open]);

  return (
    <>
      <Table
        loading={isLoadingRequests}
        fields={VISIBLE_FIELDS}
        rows={requests}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />

      <Dialog open={open} setOpen={setOpen} row={updateRow} />
    </>
  );
};

export default DeleteAccount;
