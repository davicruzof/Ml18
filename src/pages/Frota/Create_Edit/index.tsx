import { useEffect, useState } from "react";
import InputForm from "components/Input";
import * as S from "./styles";
import ButtonComponent from "components/Buttons/Button";
import { SelectChangeEvent, Button, FormGroup } from "@mui/material";
import { IMAGEM_DEFAULT } from "utils/constants";
import Snack from "components/Snack";
import { ValueType } from "./types";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import {
  createEnterprise,
  getEnterpriseById,
  updateEnterprise,
} from "services/Enterprises/enterprises";
import { InputFile } from "components/InputControl/inputFile";
import theme from "utils/theme";

export default function Create_Edit() {
  const location = useLocation();

  const id = location.state?.idEnterprise;

  const [prefixo, setPrefixo] = useState<string>("");
  const [placa, setPlaca] = useState<string>("");
  const [ano, setAno] = useState<string>("");
  const [anoModelo, setAnoModelo] = useState<string>("");
  const [modelo, setModelo] = useState<string>("");
  const [chassis, setChassis] = useState<string>("");

  const [logo, setLogo] = useState<File | null>(null);
  const navigate = useNavigate();
  const [logoURl, setLogoURL] = useState<string>("");
  const [situacaoCadastral, setSituacaoCadastral] = useState<string>("Ativo");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);

  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const { mutate: getEnterprise, isLoading: isLoadingEdit } = useMutation(
    "getEnterpriseById",
    {
      mutationFn: (idEnterprise: number) => getEnterpriseById(idEnterprise),
      onSuccess: ({ data }) => {},
      onError: () => {
        setSnackStatus(true);
        setSnackType("error");
        setSnackMessage("Ocorreu um erro ao tentar buscar dados!");
      },
    }
  );

  useEffect(() => {
    if (id) {
      getEnterprise(parseInt(id));
    }
  }, []);

  const { mutate: registerEnterprise, isLoading } = useMutation({
    mutationFn: (formData: FormData) => createEnterprise(formData),
    onSuccess: (data) => {
      if (data.status === 200) {
        if (data.data.sucess) {
          setSnackStatus(true);
          setSnackType("success");
          setSnackMessage("Cadastrado com sucesso!");
          setTimeout(() => {
            navigate("/Empresa/List", { replace: true });
          }, 3000);
        }

        if (data.data.error) {
          setSnackStatus(true);
          setSnackType("error");
          setSnackMessage(data.data.error);
        }
      }
    },
    onError: () => {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage("Ocorreu um erro ao tentar cadastrar!");
    },
  });

  const { mutate: editEnterprise, isLoading: isLoadingEditEnterprise } =
    useMutation({
      mutationFn: (formData: FormData) => updateEnterprise(formData),
      onSuccess: (data) => {
        if (data.status === 200) {
          if (data.data.sucess) {
            setSnackStatus(true);
            setSnackType("success");
            setSnackMessage("Cadastrado com sucesso!");
            setTimeout(() => {
              navigate("/Empresa/List", { replace: true });
            }, 3000);
          }

          if (data.data.error) {
            setSnackStatus(true);
            setSnackType("error");
            setSnackMessage(data.data.error);
          }
        }
      },
      onError: () => {
        setSnackStatus(true);
        setSnackType("error");
        setSnackMessage("Ocorreu um erro ao tentar cadastrar!");
      },
    });

  const onCanSubmit = () => {
    return true;
  };

  const createObjectEnterprise = () => {
    const form = new FormData();
    logo && form.append("logo", logo, "logo.jpg");
    id && form.append("id_empresa", id);
    form.append("situacao_cadastral", situacaoCadastral);
    form.append("id_grupo", "1");

    return form;
  };

  const handleEnterprise = async () => {
    if (onCanSubmit()) {
      const dataSend = createObjectEnterprise();

      registerEnterprise(dataSend);
    } else {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage("Preencha os dados obrigatórios!");
    }
  };

  const handleUpdateEnterprise = async () => {
    if (onCanSubmit()) {
      const dataSend = createObjectEnterprise();

      editEnterprise(dataSend);
    } else {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage("Preencha os dados obrigatórios!");
    }
  };

  console.log(logoURl);

  const handleChange = (event: SelectChangeEvent) => {
    setSituacaoCadastral(event.target.value as string);
  };

  const handleLogo = (arg0: File) => {
    setLogo(arg0);
    setLogoURL(URL.createObjectURL(arg0));
  };

  return (
    <S.Container>
      <h3>Cadastro de Empresa</h3>

      <FormGroup row sx={{ justifyContent: "space-between" }}>
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
        <InputForm
          label="Ano Fabricação"
          onChange={(e: ValueType) => setAno(e.target.value)}
          value={ano}
          required
        />
        <FormGroup sx={{ mr: 2 }} />
        <InputForm
          label="Ano Modelo"
          onChange={(e: ValueType) => setAnoModelo(e.target.value)}
          value={anoModelo}
          required
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
              onChange={(e: ValueType) => setChassis(e.target.value)}
              value={chassis}
              required
            />
            <FormGroup sx={{ mr: 2 }} />
            <InputForm
              label="Media Km/L"
              onChange={(e: ValueType) => setChassis(e.target.value)}
              value={chassis}
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

      <FormGroup
        row
        sx={{ justifyContent: "center", alignItems: "center", mb: 4 }}
      >
        <Button
          variant="text"
          onClick={() => navigate("/backOffice/Veiculos", { replace: true })}
          sx={{ mt: 3 }}
        >
          Voltar
        </Button>
        <FormGroup sx={{ mr: 4 }} />
        <ButtonComponent
          disabled={false}
          title={id ? "Editar" : "Cadastrar"}
          loading={isLoading || isLoadingEditEnterprise}
          onClick={id ? handleUpdateEnterprise : handleEnterprise}
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
