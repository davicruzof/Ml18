// @ts-nocheck
import React, { useEffect, useState } from "react";
import Sider from "../../../components/Sider";
import Input from "../../../components/TextInput";
import { cnpj } from "cpf-cnpj-validator";
import * as S from "./styles";
import cep from "cep-promise";
import ButtonComponent from "../../../components/Buttons/Button";
import { InputAdornment, SelectChangeEvent, Button } from "@mui/material";
import { IMAGEM_DEFAULT } from "../../../utils/constants";
import SelectComponent from "../../../components/Select";
import { createEnterprise } from "../../../services/Enterprises/enterprises";
import Snack from "../../../components/Snack";

export default function NewEnterprise() {
  const [rua, setRua] = useState<string>("");
  const [cor, setCor] = useState<string>("");
  const [logo, setLogo] = useState<any>(null);
  const [nome, setNome] = useState<string>("");
  const [logoURl, setLogoURL] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [numero, setNumero] = useState<string>("");
  const [bairro, setBairro] = useState<string>("");
  const [cidade, setCidade] = useState<string>("");
  const [estado, setEstado] = useState<string>("");
  const [telefone, setTelefone] = useState<string>("");
  const [cepValue, setCepValue] = useState<string>("");
  const [cnpjValue, setcnpjValue] = useState<string>("");
  const [complemento, setComplemento] = useState<string>("");
  const [situacaoCadastral, setSituacaoCadastral] = useState<string>("Ativo");

  const [errorcnpjValueMessage, setErrorcnpjValueMessage] = useState("");
  const [errorcepValueMessage, setErrorcepValueMessage] = useState("");
  const [errorcnpjValue, setErrorcnpjValue] = useState(false);
  const [errorcepValue, setErrorcepValue] = useState(false);
  const [loading, setLoading] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  useEffect(() => {
    if (cnpjValue.length > 18) {
      setErrorcnpjValue(true);
      setErrorcnpjValueMessage("CNPJ inválido");
    } else {
      setErrorcnpjValue(false);
      setErrorcnpjValueMessage("");
    }
  }, [cnpjValue]);

  useEffect(() => {
    logo && setLogoURL(URL.createObjectURL(logo));
  }, [logo]);

  useEffect(() => {
    if (cepValue.length > 8) {
      setErrorcepValue(true);
      setErrorcepValueMessage("Cep inválido");
      setBairro("");
      setCidade("");
      setEstado("");
      setRua("");
    } else {
      setErrorcepValue(false);
      setErrorcepValueMessage("");
    }

    if (cepValue.length === 8) {
      cep(cepValue).then((val) => {
        setBairro(val.neighborhood);
        setCidade(val.city);
        setEstado(val.state);
        setRua(val.street);
      });
    }
  }, [cepValue]);

  const setCNPJ = (val: string) => {
    if (val.length === 14) {
      setcnpjValue(cnpj.format(val));
      return;
    }
    setcnpjValue(val);
  };

  const onCanSubmit: Boolean = () => {
    return (
      cnpj.isValid(cnpjValue) &&
      nome.length > 0 &&
      !errorcepValue &&
      estado.length > 0 &&
      cidade.length > 0 &&
      rua.length > 0
    );
  };

  const handleSubmit = async () => {
    if (onCanSubmit()) {
      const form = new FormData();
      form.append("logo", logo, "logo.jpg");
      form.append("nomeempresarial", nome);
      form.append("cnpj", cnpjValue);
      form.append("logradouro", rua);
      form.append("numero", numero);
      form.append("complemento", complemento);
      form.append("cep", cepValue);
      form.append("bairro", bairro);
      form.append("municipio", cidade);
      form.append("uf", estado);
      form.append("situacao_cadastral", situacaoCadastral);
      form.append("id_grupo", "1");

      const response = await createEnterprise(form);
      
      if (response.status === 200) {
        setSnackStatus(true);
        setSnackType("success");
        setSnackMessage("Cadastro realizado com sucesso!");
        setTimeout(() => {
          navigation("/Empresa/list", { replace: true });
        }, 6000);
      }

      if (response.status === 400 || response.data.error) {
        setLoading(false);
        setSnackStatus(true);
        setSnackType("error");
        setSnackMessage(response.data.error);
      }
    } else {
      setLoading(false);
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage("Preencha todos os dados validos!");
    }
  };

  const handleChange = (event: SelectChangeEvent) => {
    setSituacaoCadastral(event.target.value as string);
  };

  return (
    <S.Container>
      <Sider />
      <S.Wrapper>
        <h1>Cadastro de Empresa</h1>

        <Input
          label="Razão social"
          onChange={(e) => setNome(e.target.value)}
          value={nome}
          required
          type="text"
          variant="outlined"
        />

        <Input
          label="CNPJ"
          onChange={(e) => setCNPJ(e.target.value)}
          value={cnpjValue}
          required
          type="text"
          error={errorcnpjValue}
          variant="outlined"
          helperText={errorcnpjValueMessage}
        />

        <Input
          label="CEP"
          onChange={(e) => setCepValue(e.target.value)}
          value={cepValue}
          required
          type="text"
          error={errorcepValue}
          variant="outlined"
          helperText={errorcepValueMessage}
        />

        {Boolean(cepValue) && (
          <>
            <S.InputGroup>
              <Input
                label="Estado"
                onChange={(e) => setEstado(e.target.value)}
                value={estado}
                required
                type="text"
                variant="outlined"
              />

              <div
                style={{
                  marginLeft: 14,
                }}
              />

              <Input
                label="Cidade"
                onChange={(e) => setCidade(e.target.value)}
                value={cidade}
                required
                type="text"
                variant="outlined"
              />
            </S.InputGroup>

            <Input
              label="Rua"
              onChange={(e) => setRua(e.target.value)}
              value={rua}
              required
              type="text"
              variant="outlined"
            />

            <S.InputGroup>
              <Input
                label="Bairro"
                onChange={(e) => setBairro(e.target.value)}
                value={bairro}
                type="text"
                variant="outlined"
              />
              <div
                style={{
                  marginLeft: 14,
                }}
              />
              <Input
                label="Numero"
                onChange={(e) => setNumero(e.target.value)}
                value={numero}
                type="text"
                variant="outlined"
              />
            </S.InputGroup>

            <Input
              label="Complemento"
              onChange={(e) => setComplemento(e.target.value)}
              value={complemento}
              type="text"
              variant="outlined"
            />
          </>
        )}

        <Input
          label="Email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          variant="outlined"
        />

        <Input
          label="Telefone"
          onChange={(e) => setTelefone(e.target.value)}
          value={telefone}
          type="tel"
          variant="outlined"
        />

        <S.InputGroup style={{ marginBottom: 14 }}>
          <Input
            label="Cor"
            onChange={(e) => setCor(e.target.value)}
            value={cor}
            type="text"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">#</InputAdornment>
              ),
            }}
            style={{ marginRight: 20 }}
          />
          <div
            style={{
              backgroundColor: cor ? `#${cor}` : "#fff",
              height: 38,
              width: 80,
              borderRadius: 4,
              borderWidth: cor ? 1.5 : 1,
              borderStyle: "solid",
              borderColor: "#767D85",
              marginTop: 12,
              marginLeft: 14,
            }}
          />
        </S.InputGroup>

        <S.InputGroup style={{ marginBottom: 20, alignItems: "center" }}>
          <img
            src={logoURl.length > 0 ? logoURl : IMAGEM_DEFAULT}
            height={80}
            width={80}
            style={{ objectFit: "cover", marginRight: 20, borderRadius: 8 }}
          />

          {/* https://kontrolapi.s3.sa-east-1.amazonaws.com/logos_enterprise/bf522247d8f5ecafc947-599010.jpg */}

          <Button
            variant="contained"
            component="label"
            style={{ height: 40, width: "100%" }}
          >
            Selecione o logo
            <input
              hidden
              accept="image/*"
              onChange={(e) => setLogo(e.target.files[0])}
              type="file"
            />
          </Button>
        </S.InputGroup>

        <SelectComponent
          itens={["Ativo", "Inativo", "Suspenso"]}
          handleChange={handleChange}
          value={situacaoCadastral}
          label="Selecione o situação cadastral"
        />

        <ButtonComponent
          disabled={onCanSubmit()}
          title="Cadastrar"
          loading={loading}
          onClick={handleSubmit}
        />
      </S.Wrapper>

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </S.Container>
  );
}
