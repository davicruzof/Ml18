import React, { useEffect, useState } from "react";
import InputForm from "components/Input";
import * as S from "./styles";
import ButtonComponent from "components/Buttons/Button";
import {
  SelectChangeEvent,
  Button,
  FormGroup,
  InputAdornment,
} from "@mui/material";
import { IMAGEM_DEFAULT } from "utils/constants";
import SelectComponent from "components/Select";
import Snack from "components/Snack";
import cep from "cep-promise";
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

  const [cor, setCor] = useState<string>("");
  const [logo, setLogo] = useState<File | null>(null);
  const navigate = useNavigate();
  const [logoURl, setLogoURL] = useState<string>("");
  const [situacaoCadastral, setSituacaoCadastral] = useState<string>("Ativo");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);

  const [uf, setUf] = useState("");
  const [rua, setRua] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [email, setEmail] = useState("");
  const [cepValue, setCep] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [numero, setNumero] = useState("");
  const [telefone, setTelefone] = useState("");
  const [complemento, setComplemento] = useState("");
  const [nomeEmpresarial, setNomeEmpresarial] = useState("");
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const handleError = (text: string) => {
    setSnackStatus(true);
    setSnackType("error");
    setSnackMessage(text);
  };

  const { mutate: getEnterprise } = useMutation("getEnterpriseById", {
    mutationFn: (idEnterprise: number) => getEnterpriseById(idEnterprise),
    onSuccess: ({ data }) => {
      console.log(data);
      data.uf !== null && setUf(data.uf);
      data.cep !== null && setCep(data.cep);
      data.nomeempresarial !== null && setNomeEmpresarial(data.nomeempresarial);
      data.municipio !== null && setCidade(data.municipio);
      data.logo !== null && setLogoURL(data.logo);
      data.cnpj !== null && setCnpj(data.cnpj);
      data.situacaocadastral !== null &&
        setSituacaoCadastral(data.situacaocadastral);
      data.email !== null && setEmail(data.email);
      data.telefone !== null && setTelefone(data.telefone);
      data.primary_color !== null && setCor(data.primary_color);
      data.complemento !== null && setComplemento(data.complemento);
      data.bairro !== null && setBairro(data.bairro);
      data.numero !== null && setNumero(data.numero);
    },
    onError: () => {
      handleError("Ocorreu um erro ao tentar buscar dados!");
    },
  });

  useEffect(() => {
    if (id) {
      getEnterprise(parseInt(id));
    }
  }, []);

  useEffect(() => {
    if (cep.length > 8 || cep.length < 8) {
      setBairro("");
      setCidade("");
      setUf("");
      setRua("");
    }

    if (cepValue.length === 8) {
      cep(cepValue).then((val) => {
        setBairro(val.neighborhood);
        setCidade(val.city);
        setUf(val.state);
        setRua(val.street);
      });
    }
  }, [cepValue]);

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

  const { mutate: registerEnterprise, isLoading } = useMutation({
    mutationFn: (formData: FormData) => createEnterprise(formData),
    onSuccess: (data) => {
      results(data, "Cadastrado com sucesso!");
    },
    onError: () => {
      handleError("Ocorreu um erro ao tentar cadastrar!");
    },
  });

  const { mutate: editEnterprise, isLoading: isLoadingEditEnterprise } =
    useMutation({
      mutationFn: (formData: FormData) => updateEnterprise(formData),
      onSuccess: (data) => {
        results(data, "Editado com sucesso!");
      },
      onError: () => {
        handleError("Ocorreu um erro ao tentar editar!");
      },
    });

  const onCanSubmit = () => {
    return nomeEmpresarial.length > 0 && cnpj.length > 0;
  };

  const createObjectEnterprise = () => {
    const form = new FormData();
    logo && form.append("logo", logo, "logo.jpg");
    id && form.append("id_empresa", id);
    form.append("nomeempresarial", nomeEmpresarial);
    form.append("cnpj", cnpj);
    form.append("logradouro", rua);
    form.append("numero", numero);
    form.append("complemento", complemento);
    form.append("cep", cepValue);
    form.append("bairro", bairro);
    form.append("municipio", cidade);
    form.append("uf", uf);
    form.append("situacaocadastral", situacaoCadastral);
    form.append("id_grupo", "1");

    return form;
  };

  const handleEnterprise = async () => {
    if (onCanSubmit()) {
      const dataSend = createObjectEnterprise();

      registerEnterprise(dataSend);
    } else {
      handleError("Preencha os dados obrigatórios!");
    }
  };

  const handleUpdateEnterprise = async () => {
    if (onCanSubmit()) {
      const dataSend = createObjectEnterprise();

      editEnterprise(dataSend);
    } else {
      handleError("Preencha os dados obrigatórios!");
    }
  };

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
          label="Razão social"
          onChange={(e: ValueType) => setNomeEmpresarial(e.target.value)}
          value={nomeEmpresarial}
          required
        />
        <FormGroup sx={{ mr: 2 }} />
        <InputForm
          name="cnpj"
          label="CNPJ"
          onChange={(e: ValueType) => setCnpj(e.target.value)}
          value={cnpj}
          required
        />
      </FormGroup>

      <FormGroup row sx={{ justifyContent: "space-between" }}>
        <InputForm
          label="CEP"
          onChange={(e: ValueType) => setCep(e.target.value)}
          value={cepValue}
          required
        />
        <FormGroup sx={{ mr: 2 }} />
        <InputForm
          label="Estado"
          onChange={(e: ValueType) => setUf(e.target.value)}
          value={uf}
          required
        />
        <FormGroup sx={{ mr: 2 }} />

        <InputForm
          label="Cidade"
          onChange={(e: ValueType) => setCidade(e.target.value)}
          value={cidade}
          required
        />
      </FormGroup>

      <InputForm
        label="Rua"
        onChange={(e: ValueType) => setRua(e.target.value)}
        value={rua}
        required
      />

      <FormGroup row sx={{ justifyContent: "space-between" }}>
        <InputForm
          label="Bairro"
          onChange={(e: ValueType) => setBairro(e.target.value)}
          value={bairro}
        />
        <FormGroup sx={{ mr: 2 }} />
        <InputForm
          label="Numero"
          onChange={(e: ValueType) => setNumero(e.target.value)}
          value={numero}
          required
        />
        <FormGroup sx={{ mr: 2 }} />
        <InputForm
          onChange={(e: ValueType) => setComplemento(e.target.value)}
          value={complemento}
          label="Complemento"
        />
      </FormGroup>

      <FormGroup row sx={{ justifyContent: "space-between" }}>
        <InputForm
          label="Email"
          type="email"
          onChange={(e: ValueType) => setEmail(e.target.value)}
          value={email}
        />
        <FormGroup sx={{ mr: 2 }} />
        <InputForm
          label="Telefone"
          type="tel"
          onChange={(e: ValueType) => setTelefone(e.target.value)}
          value={telefone}
        />
      </FormGroup>

      <FormGroup row>
        <SelectComponent
          itens={["Ativo", "Inativo", "Suspenso"]}
          handleChange={handleChange}
          value={situacaoCadastral}
          label="Status"
        />

        <FormGroup sx={{ mr: 2 }} />

        <InputForm
          label="Cor"
          InputProps={{
            startAdornment: <InputAdornment position="start">#</InputAdornment>,
          }}
          onChange={(e: ValueType) => setCor(e.target.value)}
          value={cor}
        />

        <div
          style={{
            backgroundColor: cor ? `#${cor}` : "#fff",
            height: 52,
            width: 80,
            borderRadius: 4,
            borderWidth: 1,
            borderStyle: "solid",
            borderColor: theme.colors.text.disabled,
            marginLeft: 14,
          }}
        />

        <FormGroup sx={{ mr: 3 }} />

        <img
          src={logoURl.length > 0 ? logoURl : IMAGEM_DEFAULT}
          height={logoURl.length > 0 ? 100 : 52}
          width={logoURl.length > 0 ? 100 : 52}
          style={{
            marginRight: 20,
            backgroundColor: theme.colors.primary,
            height: 50,
            width: 50,
            padding: 1,
            objectFit: "cover",
            borderRadius: "50%",
            boxShadow: "0 3px 6px rgba(0,0,0,.16),0 3px 6px rgba(0,0,0,.23)",
          }}
        />

        <FormGroup>
          <Button
            variant="contained"
            component="label"
            style={{ height: logoURl.length > 0 ? 42 : 52 }}
          >
            Selecione o logo
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
              remover
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
          onClick={() => navigate("/Admin/Empresas", { replace: true })}
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
