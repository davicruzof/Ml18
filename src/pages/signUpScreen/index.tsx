import { useState } from "react";

import * as S from "./styles";

import LOGO from "assets/logo.png";
import Snack from "components/Snack";
import { Checkbox } from "@mui/material";
import Button from "@mui/material/Button";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { schemaValidation } from "./types";
import BG from "assets/background-login.png";
import { useNavigate } from "react-router-dom";
import { createUser } from "services/User/user";
import { InputForm } from "components/InputControl";
import { RegisterProps } from "services/User/types";
import { yupResolver } from "@hookform/resolvers/yup";
import ButtonComponent from "components/Buttons/Button";
import InputPassword from "components/InputControl/inputPassword";
import { formatData, trim_cpf_cnpj } from "utils/format";

export default function SignupScreen() {
  const navigation = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };
  const [check, setCheck] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterProps>({
    resolver: yupResolver(schemaValidation),
  });

  const { mutate: registerUser, isLoading } = useMutation({
    mutationFn: (formData: RegisterProps) => createUser(formData),
    onSuccess: () => {
      setSnackStatus(true);
      setSnackType("success");
      setSnackMessage("Cadastrado com sucesso!");
      setTimeout(() => {
        navigation("/", { replace: true });
      }, 3000);
    },
    onError: () => {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage("Ocorreu um erro ao tentar cadastrar!");
    },
  });

  const handleSendFormRegister = async (formData: RegisterProps) => {
    formData.dt_nascimento = formatData(new Date(formData.dt_nascimento));
    formData.cpf = trim_cpf_cnpj(formData.cpf);
    if (check) {
      registerUser(formData);
    } else {
      if (!check) {
        setSnackStatus(true);
        setSnackType("error");
        setSnackMessage("Você deve aceitar as políticas de privacidade!");
      } else {
        setSnackStatus(true);
        setSnackType("error");
        setSnackMessage("Dados inválidos!");
      }
    }
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.BG src={BG} />
      </S.Wrapper>
      <S.Form>
        <S.Logo data-testid="logo_login" src={LOGO} />

        <InputForm
          data-testid="input_cpf"
          control={control}
          name="cpf"
          label="CPF"
          error={Boolean(errors.cpf)}
          helperText={errors?.cpf?.message}
        />

        <InputForm
          data-testid="input_cod_empresa"
          control={control}
          name="id_empresa"
          label="Código da empresa"
          error={Boolean(errors.id_empresa)}
          helperText={errors?.id_empresa?.message}
        />

        <InputForm
          data-testid="input_data_nascimento"
          control={control}
          name="dt_nascimento"
          label=""
          type="date"
        />

        <InputPassword
          data-testid="input_senha"
          control={control}
          setShowPassword={setShowPassword}
          showPassword={showPassword}
          name="senha"
        />

        {Boolean(errors.senha) && (
          <p
            className="MuiFormHelperText-root Mui-error 
        MuiFormHelperText-sizeMedium MuiFormHelperText-contained 
        css-1wc848c-MuiFormHelperText-root"
          >
            A senha é obrigatório
          </p>
        )}

        <S.InputGroup>
          <Checkbox
            {...label}
            onChange={() => setCheck(!check)}
            checked={check}
          />
          <S.Terms target="_blank" href="https://google.com.br">
            Aceito os termos e condições
          </S.Terms>
        </S.InputGroup>

        <ButtonComponent
          onClick={handleSubmit(handleSendFormRegister)}
          loading={isLoading}
          title="Cadastrar"
          active={!check}
        />

        <Button
          sx={{ mt: 4 }}
          variant="text"
          onClick={() => navigation("/", { replace: true })}
        >
          Voltar
        </Button>
      </S.Form>
      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
      ;
    </S.Container>
  );
}
