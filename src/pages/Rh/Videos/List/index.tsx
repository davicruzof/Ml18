import { useEffect, useState } from "react";
import * as S from "./styles";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "components/Button";
import { useMutation, useQuery } from "react-query";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SendIcon from "@mui/icons-material/Telegram";
import { deleteVideo, getVideos } from "services/Telemetria";
import { type videoType } from "services/Telemetria/type";
import { formatDataHuman } from "utils/format";
import Loading from "components/Loading/Loading";
import Table from "components/Table";
import Snack from "components/Snack";

export default function Videos() {
  const navigation = useNavigate();
  const [rows, setRows] = useState<videoType[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);

  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const handleResult = (text: string, type: "error" | "success") => {
    setSnackStatus(true);
    setSnackType(type);
    setSnackMessage(text);
  };

  const {
    data: dataVideos,
    isLoading,
    refetch: refetchGetVideos,
  } = useQuery("getEnterprises", {
    queryFn: async () => getVideos(),
    enabled: true,
    keepPreviousData: false,
  });

  const { mutate: mutateDeleteVideo, isLoading: isLoadingDeleteVideo } =
    useMutation({
      mutationFn: (formData: number) => deleteVideo(formData),
      onSuccess: () => {
        refetchGetVideos();
        handleResult("Video excluído com sucesso!", "success");
      },
      onError: () => {
        handleResult("Ocorreu um erro ao tentar cadastrar!", "error");
      },
    });

  const handleEditClick = (item: videoType) => {
    navigation("/rh/videos/edit", {
      replace: true,
      state: {
        video: item,
      },
    });
  };
  const handleDeleteVideo = (id: number) => {
    mutateDeleteVideo(id);
  };

  const handleSendVideo = (id: number) => {
    navigation("/rh/videos/send", {
      replace: true,
      state: {
        id_video: id,
      },
    });
  };

  const VISIBLE_FIELDS = [
    { field: "titulo", headerName: "Título", width: 350 },
    { field: "descricao", headerName: "Descricao", width: 400 },
    { field: "expiracao", headerName: "Data de expiração", width: 150 },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 200,
      cellClassName: "actions",
      getActions: ({ row }: { row: videoType }) => {
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
          <IconButton
            color="success"
            aria-label="send video"
            component="label"
            onClick={() => {
              handleSendVideo(row.id_video);
            }}
          >
            <SendIcon />
          </IconButton>,
          <IconButton
            color="error"
            aria-label="upload picture"
            component="label"
            onClick={() => {
              handleDeleteVideo(row.id_video);
            }}
          >
            <DeleteIcon />
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
          expiracao: formatDataHuman(new Date(item.dt_expiracao)),
          ...item,
        })
      );
      setRows(data);
    }
  }, [dataVideos]);

  if (isLoadingDeleteVideo || isLoading) {
    return <Loading />;
  }
  return (
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

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </S.Container>
  );
}
