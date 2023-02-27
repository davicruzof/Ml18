import { useEffect, useMemo, useState } from "react";
import InputForm from "components/Input";
import * as S from "./styles";
import { SelectChangeEvent, Button, FormGroup } from "@mui/material";
import { IMAGEM_DEFAULT } from "utils/constants";
import Snack from "components/Snack";
import { ValueType } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { InputFile } from "components/InputControl/inputFile";
import theme from "utils/theme";
import SelectComponent from "components/Select";
import { createVehicle } from "services/Vehicle";
import { ButtonsForm } from "components/ButtonsForm";

export default function Create_Edit() {
  const location = useLocation();

  const id = location.state?.idEnterprise;

  const [prefixo, setPrefixo] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [anoModelo, setAnoModelo] = useState<string>("");
  const [anoFabricacao, setAnoFabricacao] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");
  const [chassis, setChassis] = useState<string>("");
  const [garagem, setGaragem] = useState<string>("");
  const [media, setMedia] = useState<string>("");

  const [logo, setLogo] = useState<File | null>(null);
  const navigate = useNavigate();
  const [logoURl, setLogoURL] = useState<string>("");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);

  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const [anos, setAnos] = useState<string[]>([]);

  useEffect(() => {
    const dataNow = new Date();
    const ANOS = [];
    for (let index = 0; index < 30; index++) {
      const ano = dataNow.getFullYear() - index;
      ANOS.push(ano.toString());
    }

    setAnos(ANOS);
  }, []);

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

  const { mutate: registerVehicle, isLoading: isLoadingRegisterVehicle } =
    useMutation({
      mutationFn: (formData: FormData) => createVehicle(formData),
      onSuccess: (data) => {
        results(data, "Veículo cadastrado com sucesso!");
      },
      onError: () => {
        handleError("Ocorreu um erro ao tentar cadastrar!");
      },
    });

  const onCanSubmit = () => {
    return Boolean(
      chassis &&
        placa &&
        anoFabricacao &&
        anoModelo &&
        modelo &&
        garagem &&
        media
    );
  };

  const createObjVehicle = () => {
    const form = new FormData();

    form.append("chassi", chassis);
    form.append("placa", placa);
    form.append("ano_fabricacao", anoFabricacao);
    form.append("ano_modelo", anoModelo);
    form.append("modelo", modelo);
    form.append("prefixo", prefixo);
    form.append("media_consumo", media);
    form.append("id_grupo", "1");
    form.append("id_empresa", "2");
    logo && form.append("foto", logo, "foto.jpg");

    return form;
  };

  const handleCreateVehicle = async () => {
    if (onCanSubmit()) {
      const dataSend = createObjVehicle();

      registerVehicle(dataSend);
    } else {
      handleError("Preencha os dados obrigatórios!");
    }
  };

  const handleUpdateVehicle = async () => {};

  const handleChangeAnoModelo = (event: SelectChangeEvent) => {
    setAnoModelo(event.target.value as string);
  };

  const handleChangeAnoFabricacao = (event: SelectChangeEvent) => {
    setAnoFabricacao(event.target.value as string);
  };

  const handleLogo = (arg0: File) => {
    setLogo(arg0);
    setLogoURL(URL.createObjectURL(arg0));
  };

  const isLoading = useMemo(() => {
    return isLoadingRegisterVehicle;
  }, [isLoadingRegisterVehicle]);

  return (
    <S.Container>
      <h3 style={{ paddingTop: 16 }}>Cadastro de Veículos</h3>

      <FormGroup row sx={{ justifyContent: "space-between", mt: 5 }}>
        <InputForm
          label="Prefixo"
          onChange={(e: ValueType) => setPrefixo(e.target.value)}
          value={prefixo}
          required
        />
        <FormGroup sx={{ mr: 2 }} />
        <InputForm
          label="Placa"
          onChange={(e: ValueType) => setPlaca(e.target.value)}
          value={placa}
          required
        />
        <FormGroup sx={{ mr: 2 }} />

        <SelectComponent
          itens={anos}
          handleChange={handleChangeAnoModelo}
          value={anoModelo}
          label="Ano Modelo"
        />

        <FormGroup sx={{ mr: 2 }} />

        <SelectComponent
          itens={anos}
          handleChange={handleChangeAnoFabricacao}
          value={anoFabricacao}
          label="Ano de Fabricação"
        />
      </FormGroup>

      <FormGroup row style={{ flex: 1 }}>
        <FormGroup
          sx={{
            justifyContent: "space-between",
            marginRight: 2,
            flex: 1,
          }}
        >
          <InputForm
            label="Modelo"
            onChange={(e: ValueType) => setModelo(e.target.value)}
            value={modelo}
            required
          />
          <FormGroup sx={{ mr: 2 }} />
          <InputForm
            label="Chassis"
            onChange={(e: ValueType) => setChassis(e.target.value)}
            value={chassis}
            required
          />
          <FormGroup sx={{ mr: 2 }} />
          <FormGroup row>
            <InputForm
              label="Garagem"
              onChange={(e: ValueType) => setGaragem(e.target.value)}
              value={garagem}
              required
            />
            <FormGroup sx={{ mr: 2 }} />
            <InputForm
              label="Media Km/L"
              onChange={(e: ValueType) => setMedia(e.target.value)}
              value={media}
              required
            />
          </FormGroup>
        </FormGroup>

        <FormGroup style={{ width: 130 }}>
          <img
            src={logoURl.length > 0 ? logoURl : IMAGEM_DEFAULT}
            height={logoURl.length > 0 ? 100 : 52}
            width={logoURl.length > 0 ? 100 : 52}
            style={{
              backgroundColor: theme.colors.primary,
              height: 130,
              width: 130,
              padding: 1,
              objectFit: "cover",
              boxShadow: "0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)",
            }}
          />

          <Button
            variant="contained"
            component="label"
            style={{ height: logoURl.length > 0 ? 42 : 52, marginTop: 20 }}
          >
            Selecione o foto
            <InputFile name="logo" handleLogo={handleLogo} />
          </Button>

          <FormGroup sx={{ mt: 2 }} />

          {logoURl.length > 0 && (
            <Button
              variant="contained"
              component="label"
              style={{ height: 42 }}
              onClick={() => setLogoURL("")}
            >
              remover foto
            </Button>
          )}
        </FormGroup>
      </FormGroup>

      <ButtonsForm
        rotaBack="/frota/Listagem"
        title={id ? "Editar" : "Cadastrar"}
        handleButton={id ? handleUpdateVehicle : handleCreateVehicle}
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
