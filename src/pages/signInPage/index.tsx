import { yupResolver } from "@hookform/resolvers/yup";

import { InputForm } from "components/InputControl";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { LoginData, schemaValidation } from "./types";
import InputPassword from "components/InputControl/inputPassword";
import ButtonComponent from "components/Buttons/Button";
import * as S from "./styles";
import BG from "../../assets/background-login.png";
import LOGO from "../../assets/logo.png";
import { Button } from "@mui/material";
import Snack from "components/Snack";
import { login } from "services/Auth/auth";
import { AuthContext } from "contexts/auth";
import { useNavigate } from "react-router-dom";
import api from "services/api";
import { useMutation } from "react-query";
import { LoginResponse } from "services/Auth/types";
import { trim_cpf_cnpj } from "utils/format";

const LoginScreen = () => {
  const navigation = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(schemaValidation),
  });

  const { setAuthValues } = useContext(AuthContext);

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signIn, isLoading } = useMutation({
    mutationFn: (formData: LoginData) => login(formData),
    onSuccess: ({ result, empresa }: LoginResponse) => {
      if (!result.error) {
        setAuthValues({
          id_empresa: empresa.id_empresa,
          token: result.token,
          signed: true,
        });

        api.defaults.headers.common["Authorization"] = `Bearer ${result.token}`;

        localStorage.setItem("logado", "true");
        localStorage.setItem(
          "authValues",
          JSON.stringify({
            id_empresa: empresa.id_empresa,
            token: result.token,
            signed: true,
          })
        );

        navigation("/", { replace: true });
      }
    },
    onError: (error: Error) => {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage(error.message);
    },
  });

  useEffect(() => {
    (() => {
      localStorage.clear();
    })();
  }, []);

  const handleSendFormLogin = (formData: LoginData) => {
    if (Boolean(errors)) {
      formData.cpf = trim_cpf_cnpj(formData.cpf);
      signIn(formData);
    } else {
      setSnackStatus(true);
      setSnackType("error");
      setSnackMessage("Preencha os dados!");
    }
  };

  return (
    <S.Container>
      <S.Wrapper data-testid="bg_login">
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

        <ButtonComponent
          onClick={handleSubmit(handleSendFormLogin)}
          loading={isLoading}
          title="Entrar"
          active={false}
        />

        <Button
          sx={{ mt: 4 }}
          variant="text"
          onClick={() => navigation("Signup", { replace: true })}
        >
          Criar Conta
        </Button>
      </S.Form>

      <Snack
        handleClose={() => setSnackStatus(false)}
        message={snackMessage}
        open={snackStatus}
        type={snackType}
      />
    </S.Container>
  );
};

export default LoginScreen;
