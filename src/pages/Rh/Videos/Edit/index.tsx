import { FormGroup } from "@mui/material";
import { formatData } from "utils/format";
import ButtonComponent from "components/Button";
import ButtonLight from "components/ButtonLight";
import InputForm from "components/Input";
import Snack from "components/Snack";
import TextArea from "components/TextArea";
import { useEffect, useMemo, useState } from "react";
import { useMutation } from "react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { updateVideo } from "services/Telemetria";
import { videoType, videoTypeEdit } from "services/Telemetria/type";
import * as S from "./styles";
import { ValueType } from "./types";
import VideoComponent from "../components/video";
import Loading from "components/Loading/Loading";

export default function Edit() {
  const location = useLocation();

  const editVideo = location.state?.video as videoType;

  const navigate = useNavigate();
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [expiracao, setExpiracao] = useState<string>("");

  const [videoUrl, setVideoUrl] = useState<string>("");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);

  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const handleError = (text: string) => {
    setSnackStatus(true);
    setSnackType("error");
    setSnackMessage(text);
  };

  const results = (data: any, text: string) => {
    if (data.sucess) {
      setSnackStatus(true);
      setSnackType("success");
      setSnackMessage(text);
      setTimeout(() => {
        navigate("/rh/videos", { replace: true });
      }, 1000);
    }

    if (data.error) {
      handleError(data.data.error);
    }
  };

  const { mutate: editVideoMutation, isLoading: isLoadingRegisterVideo } =
    useMutation({
      mutationFn: (formData: videoTypeEdit) => updateVideo(formData),
      onSuccess: (data) => {
        results(data, "Video atualizado com sucesso!");
      },
      onError: () => {
        handleError("Ocorreu um erro ao tentar atualizar video!");
      },
    });

  const createObjVideo = () => {
    return {
      id_video: editVideo.id_video.toString(),
      descricao: descricao,
      titulo: titulo,
      dt_expiracao: formatData(new Date(expiracao)),
    };
  };

  const handleEditVideo = () => {
    const dataSend = createObjVideo() as videoTypeEdit;
    editVideoMutation(dataSend);
  };

  useEffect(() => {
    if (editVideo) {
      setVideoUrl(editVideo.link);
      setTitulo(editVideo.titulo);
      setDescricao(editVideo.descricao);
      setExpiracao(formatData(new Date(editVideo.dt_expiracao)));
    }
  }, [editVideo]);

  const isLoading = useMemo(() => {
    return isLoadingRegisterVideo;
  }, [isLoadingRegisterVideo]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.Title>Editar informações de Videos</S.Title>

      <FormGroup row style={{ flex: 1, marginTop: 30 }}>
        <FormGroup style={{ width: "70%" }} sx={{ mr: 2 }}>
          <InputForm
            label="Título"
            onChange={(e: ValueType) => setTitulo(e.target.value)}
            value={titulo}
            required
          />

          <TextArea
            label="Descricao"
            onChange={(e: ValueType) => setDescricao(e.target.value)}
            value={descricao}
            required
            multiline
            rows={13}
          />
        </FormGroup>
        <FormGroup style={{ width: "25%" }}>
          <VideoComponent videoUrl={videoUrl} />

          <label style={{ marginTop: 10 }}>Data de expiração</label>
          <InputForm
            label=""
            onChange={(e: ValueType) => setExpiracao(e.target.value)}
            value={expiracao}
            placeholder="aaaa/mm/dd"
            type="date"
          />
        </FormGroup>
      </FormGroup>

      <FormGroup
        row
        sx={{ justifyContent: "center", alignItems: "center", mb: 4 }}
      >
        <ButtonLight
          title="Voltar"
          onClick={() => navigate("/rh/Videos", { replace: true })}
        />

        <FormGroup sx={{ mr: 4 }} />

        <ButtonComponent
          disabled={false}
          title={"Editar informações do video"}
          loading={isLoading}
          onClick={handleEditVideo}
        />
      </FormGroup>

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </S.Container>
  );
}
