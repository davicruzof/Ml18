import { Button, FormGroup } from "@mui/material";
import ButtonComponent from "components/Button";
import InputForm from "components/Input";
import { InputFile } from "components/InputControl/inputFile";
import { useState } from "react";
import { IMAGEM_DEFAULT } from "utils/constants";
import * as S from "./styles";
import { useMutation } from "react-query";
import { updateEnterprise } from "services/Enterprises/enterprises";
import Snack from "components/Snack";
import { useNavigate } from "react-router-dom";
import { EnterpriseResponse } from "services/Enterprises/types";
import Loading from "components/Loading/Loading";

const EnterpriseBrandForm = ({
  setValues,
  values,
  setCurrent,
}: {
  setValues: (val: EnterpriseResponse) => void;
  values: EnterpriseResponse | undefined;
  setCurrent: (current: number) => void;
}) => {
  const navigate = useNavigate();
  const [logoURl, setLogoURL] = useState<string>(values?.logo || "");

  const [snackMessage, setSnackMessage] = useState("");
  const [snackStatus, setSnackStatus] = useState(false);
  const [snackType, setSnackType] = useState<"error" | "success">("success");

  const handleChange = (event: any) => {
    const auxValues = { ...values } as any;
    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  const handleError = (text: string) => {
    setSnackStatus(true);
    setSnackType("error");
    setSnackMessage(text);
  };

  const handleLogo = (arg0: File) => {
    const auxValues = { ...values } as any;
    auxValues["logo"] = arg0;
    setValues(auxValues);
    setLogoURL(URL.createObjectURL(arg0));
  };

  const createObjectEnterprise = () => {
    const form = new FormData();

    values?.logo &&
      !values.logo.includes("https://") &&
      form.append("logo", values.logo, "logo.jpg");
    form.append("id_empresa", values!.id_empresa!);
    form.append("nomeempresarial", values!.nomeempresarial!);
    form.append("cnpj", values!.cnpj!);
    form.append("logradouro", values!.logradouro!);
    form.append("numero", values!.numero!);
    values?.complemento && form.append("complemento", values.complemento);
    form.append("cep", values!.cep!);
    form.append("bairro", values!.bairro!);
    form.append("municipio", values!.municipio!);
    form.append("uf", values!.uf!);
    form.append("situacaocadastral", "Ativo");
    values?.primary_color &&
      form.append("primary_color", values!.primary_color);
    values?.telefone && form.append("telefone", values!.telefone);
    values?.email && form.append("email", values!.email);
    form.append("id_grupo", "1");

    return form;
  };

  const results = (data: any, text: string) => {
    if (data.status === 200) {
      if (data.data.sucess) {
        setSnackStatus(true);
        setSnackType("success");
        setSnackMessage(text);
        setTimeout(() => {
          navigate("/Admin/Empresas", { replace: true });
        }, 1000);
      }

      if (data.data.error) {
        handleError(data.data.error);
      }
    }
  };

  const { mutate: registerEnterprise, isLoading } = useMutation({
    mutationFn: (formData: FormData) => updateEnterprise(formData),
    onSuccess: (data) => {
      results(data, "Editado com sucesso!");
    },
    onError: (err) => {
      handleError("Ocorreu um erro ao tentar editar!");
    },
  });

  const handleEditEnterprise = async () => {
    const dataSend = createObjectEnterprise();

    registerEnterprise(dataSend);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <FormGroup>
        <InputForm
          type="color"
          name="primary_color"
          label="Cor Principal da marca"
          style={{ width: 200, height: 40 }}
          onChange={handleChange}
          value={values!.primary_color || "#fff"}
        />

        <label>LogoMarca</label>
        <FormGroup row>
          <S.Logo
            src={logoURl.length > 0 ? logoURl : IMAGEM_DEFAULT}
            height={200}
            width={200}
          />

          <FormGroup>
            <Button
              variant="contained"
              component="label"
              style={{ height: 42, marginBottom: 16, width: 200 }}
            >
              Selecione o logo
              <InputFile name="logo" handleLogo={handleLogo} />
            </Button>

            {logoURl && (
              <Button
                variant="contained"
                component="label"
                style={{ height: 42, width: 200 }}
                onClick={() => setLogoURL("")}
              >
                Remover logo
              </Button>
            )}
          </FormGroup>
        </FormGroup>
      </FormGroup>

      <FormGroup row sx={{ mt: 5 }}>
        <Button
          variant="outlined"
          onClick={() => setCurrent(1)}
          sx={{ mt: 3, mr: 3 }}
        >
          Voltar
        </Button>

        <ButtonComponent
          title="Finalizar edição"
          onClick={handleEditEnterprise}
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
};

export default EnterpriseBrandForm;
