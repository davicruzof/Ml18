import React, { useEffect, useMemo, useState } from "react";
import InputForm from "components/Input";
import * as S from "./styles";
import ButtonComponent from "components/Button";
import { Box, FormGroup, LinearProgress, Typography } from "@mui/material";
import { VIDEO_DEFAULT } from "utils/constants";
import Snack from "components/Snack";
import { ValueType } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { InputFile } from "components/InputControl/inputFile";
import { createVideo } from "services/Telemetria";
import { formatData } from "utils/format";
import ButtonLight from "components/ButtonLight";
import TextArea from "components/TextArea";

export default function Create_Edit() {
  const location = useLocation();

  const editVideo = location.state?.video;

  const navigate = useNavigate();
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [expiracao, setExpiracao] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const [video, setVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);

  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const handleError = (text: string) => {
    setSnackStatus(true);
    setSnackType("error");
    setSnackMessage(text);
    setProgress(0);
  };

  const results = (data: any, text: string) => {
    if (data.status === 200) {
      if (data.data.sucess) {
        setSnackStatus(true);
        setSnackType("success");
        setSnackMessage(text);
        setTimeout(() => {
          setProgress(0);
          navigate("/rh/videos", { replace: true });
        }, 2000);
      }

      if (data.data.error) {
        handleError(data.data.error);
      }
    }
  };

  const { mutate: registerVideo, isLoading: isLoadingRegisterVideo } =
    useMutation({
      mutationFn: (dataSendCreateVideo: any) =>
        createVideo(dataSendCreateVideo),
      onSuccess: (data) => {
        results(data, "Video cadastrado com sucesso!");
      },
      onError: () => {
        handleError("Ocorreu um erro ao tentar cadastrar!");
      },
    });

  const createObjVideo = () => {
    const form = new FormData();
    const values = localStorage.getItem("authValues");
    const data = JSON.parse(values!);
    form.append("id_empresa", data.id_empresa);
    form.append("descricao", descricao);
    form.append("titulo", titulo);
    expiracao && form.append("dt_expiracao", formatData(new Date(expiracao)));
    video && form.append("video", video);

    return form;
  };

  const handleEditVideo = () => {};

  const handleRegisterVideo = async () => {
    const dataSendVideo = createObjVideo();
    registerVideo({ credentials: dataSendVideo, setProgress });
  };

  const handleLogo = (arg0: File) => {
    setVideo(arg0);
    setVideoUrl(URL.createObjectURL(arg0));
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

  return (
    <S.Container>
      <S.Title>Cadastro de Videos</S.Title>

      {progress !== 0 ? (
        <S.LoadingContainer>
          <LinearProgress variant="determinate" value={progress} />
          <Box sx={{ minWidth: 35 }}>
            <Typography variant="body2" color="text.secondary">{`${Math.round(
              progress
            )}%`}</Typography>
          </Box>
          <Box sx={{ mt: 5 }}>
            <Typography variant="h5" color="text.error">
              Aguarde enquanto estamos enviado o seu video
            </Typography>
          </Box>
        </S.LoadingContainer>
      ) : (
        <>
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
                rows={videoUrl.length > 0 ? 13 : 8}
              />
            </FormGroup>
            <FormGroup style={{ width: "25%" }}>
              {videoUrl.length > 0 ? (
                <video
                  controls
                  src={videoUrl}
                  style={{
                    maxWidth: 280,
                    borderRadius: 8,
                    border: "none",
                    objectFit: "cover",
                    boxShadow:
                      "0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)",
                  }}
                />
              ) : (
                <div
                  style={{
                    flex: 1,
                    maxWidth: 280,
                    padding: 1,
                    borderRadius: 8,
                    display: "flex",
                    alignItems: "center",
                    boxShadow:
                      "0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)",
                  }}
                >
                  <img
                    src={VIDEO_DEFAULT}
                    style={{
                      flex: 1,
                      maxWidth: 280,
                      objectFit: "cover",
                    }}
                    alt="imagem default"
                  />
                </div>
              )}

              <S.ButtonCustom>
                Selecione video
                <InputFile
                  accept="video/*"
                  name="logo"
                  handleLogo={handleLogo}
                />
              </S.ButtonCustom>

              {videoUrl.length > 0 && (
                <S.ButtonRemove onClick={() => setVideoUrl("")}>
                  remover video
                </S.ButtonRemove>
              )}

              {videoUrl.length > 0 && (
                <>
                  <label style={{ marginTop: 10 }}>Data de expiração</label>
                  <InputForm
                    label=""
                    onChange={(e: ValueType) => setExpiracao(e.target.value)}
                    value={expiracao}
                    placeholder="aaaa/mm/dd"
                    type="date"
                  />
                </>
              )}
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
              title={editVideo ? "Editar" : "Cadastrar"}
              loading={isLoading}
              onClick={editVideo ? handleEditVideo : handleRegisterVideo}
            />
          </FormGroup>
        </>
      )}

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </S.Container>
  );
}
