import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/Button";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useQuery } from "react-query";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getVideos } from "services/Telemetria";
import { videoType } from "services/Telemetria/type";
import { formatData } from "utils/format";

export default function Videos() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<videoType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const height = window.innerHeight - 200;

  const { data: dataVideos, isLoading } = useQuery("getEnterprises", {
    queryFn: () => getVideos(),
    enabled: true,
    keepPreviousData: false,
  });

  const handleEditClick = (item: videoType) => {
    navigation(`/rh/AddVideo`, {
      replace: true,
      state: {
        video: item,
      },
    });
  };

  const VISIBLE_FIELDS = [
    { field: "titulo", headerName: "Título", width: 350 },
    { field: "descricao", headerName: "Descricao", width: 500 },
    { field: "expiracao", headerName: "Data de expiração", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ row }: any) => {
        return [
          <IconButton
            color="primary"
            aria-label="upload picture"
            component="label"
            onClick={() => handleEditClick(row)}
          >
            <EditIcon />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    if (dataVideos) {
      let data: videoType[] = [];
      dataVideos.map((item: any) =>
        data.push({
          id: item.dt_criacao,
          expiracao: formatData(new Date(item.dt_expiracao)),
          ...item,
        })
      );
      setRows(data);
    }
  }, [dataVideos]);

  return (
    <S.Container>
      <S.Wrapper>
        <ButtonComponent
          onClick={() => navigation("/rh/AddVideo", { replace: true })}
          loading={false}
          title="+ Adicionar novo video"
          active={false}
        />
      </S.Wrapper>

      {rows && (
        <DataGrid
          loading={isLoading}
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
    </S.Container>
  );
}
