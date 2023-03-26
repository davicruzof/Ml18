import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/Button";
import { useQuery } from "react-query";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { getVideos } from "services/Telemetria";
import { type videoType } from "services/Telemetria/type";
import { formatData } from "utils/format";
import Loading from "components/Loading/Loading";
import Table from "components/Table";

export default function Videos() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<videoType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const { data: dataVideos, isLoading } = useQuery("getEnterprises", {
    queryFn: async () => getVideos(),
    enabled: true,
    keepPreviousData: false,
  });

  const handleEditClick = (item: videoType) => {
    navigation("/rh/videos/edit", {
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
            onClick={() => {
              handleEditClick(row);
            }}
          >
            <EditIcon />
          </IconButton>,
        ];
      },
    },
  ];

  useEffect(() => {
    if (dataVideos && dataVideos.length > 0) {
      const data: videoType[] = [];
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

  return isLoading ? (
    <Loading />
  ) : (
    <S.Container>
      <S.Wrapper>
        <ButtonComponent
          onClick={() => {
            navigation("/rh/AddVideo", { replace: true });
          }}
          loading={false}
          title="+ Adicionar novo video"
          active={false}
        />
      </S.Wrapper>

      <Table
        loading={isLoading}
        fields={VISIBLE_FIELDS}
        rows={rows}
        pageSize={pageSize}
        setPageSize={setPageSize}
      />
    </S.Container>
  );
}
