import React, { useMemo, useState } from "react";
import InputForm from "components/Input";
import * as S from "./styles";
import ButtonComponent from "components/Button";
import { Button, FormGroup } from "@mui/material";
import { VIDEO_DEFAULT } from "utils/constants";
import Snack from "components/Snack";
import { ValueType } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { InputFile } from "components/InputControl/inputFile";
import { createVideo } from "services/Telemetria";
import { formatData } from "@utils/format";

export default function Create_Edit() {
  const location = useLocation();

  const id = location.state?.idEnterprise;

  const navigate = useNavigate();
  const [titulo, setTitulo] = useState<string>("");
  const [descricao, setDescricao] = useState<string>("");
  const [expiracao, setExpiracao] = useState<string>("");

  const [video, setVideo] = useState<File | null>(null);
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
    if (data.status === 200) {
      if (data.data.sucess) {
        setSnackStatus(true);
        setSnackType("success");
        setSnackMessage(text);
        setTimeout(() => {
          navigate("/Admin/Empresas", { replace: true });
        }, 2000);
      }

      if (data.data.error) {
        handleError(data.data.error);
      }
    }
  };

  const { mutate: registerVideo, isLoading: isLoadingRegisterVideo } =
    useMutation({
      mutationFn: (formData: FormData) => createVideo(formData),
      onSuccess: (data) => {
        console.log(data);
        results(data, "Veículo cadastrado com sucesso!");
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
    form.append("dt_expiracao", formatData(new Date(expiracao)));
    video && form.append("video", video);

    return form;
  };

  // const handleEnterprise = async () => {
  //   const dataSend = createObjVehicle();

  //   registerVideo(dataSend);
  //   handleError("Preencha os dados obrigatórios!");
  // };

  const handleRegisterVideo = async () => {
    // if (onCanSubmit()) {
    const dataSend = createObjVideo();
    registerVideo(dataSend);
    // } else {
    //   setSnackStatus(true);
    //   setSnackType("error");
    //   setSnackMessage("Preencha os dados obrigatórios!");
    // }
  };

  const handleLogo = (arg0: File) => {
    setVideo(arg0);
    setVideoUrl(URL.createObjectURL(arg0));
  };

  const isLoading = useMemo(() => {
    return isLoadingRegisterVideo;
  }, [isLoadingRegisterVideo]);

  return (
    <S.Container>
      <h3 style={{ paddingTop: 16 }}>Cadastro de Videos</h3>

      <FormGroup row style={{ flex: 1 }}>
        <FormGroup style={{ width: "70%" }} sx={{ mr: 2 }}>
          <InputForm
            label="Título"
            onChange={(e: ValueType) => setTitulo(e.target.value)}
            value={titulo}
            required
          />

          <InputForm
            label="Descricao"
            onChange={(e: ValueType) => setDescricao(e.target.value)}
            value={descricao}
            required
            multiline
            rows={videoUrl.length > 0 ? 14 : 10}
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

          <Button
            variant="contained"
            component="label"
            style={{ height: videoUrl.length > 0 ? 42 : 52, marginTop: 20 }}
          >
            Selecionar video
            <InputFile accept="video/*" name="logo" handleLogo={handleLogo} />
          </Button>

          <FormGroup sx={{ mt: 2 }} />

          {videoUrl.length > 0 && (
            <Button
              variant="contained"
              component="label"
              style={{ height: 42 }}
              onClick={() => setVideoUrl("")}
            >
              remover video
            </Button>
          )}

          {videoUrl.length > 0 && (
            <>
              <span style={{ marginTop: 10 }}>Data de expiração</span>
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
        <Button
          variant="text"
          onClick={() => navigate("/rh/Videos", { replace: true })}
          sx={{ mt: 3 }}
        >
          Voltar
        </Button>
        <FormGroup sx={{ mr: 4 }} />
        <FormGroup
          row
          sx={{
            width: "fit-content",
          }}
        >
          <ButtonComponent
            disabled={false}
            title={id ? "Editar" : "Cadastrar"}
            loading={isLoading}
            onClick={handleRegisterVideo}
          />
        </FormGroup>
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
