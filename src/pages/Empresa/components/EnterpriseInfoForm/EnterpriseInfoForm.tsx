import ButtonComponent from "components/Button";
import InputForm from "components/Input";
import Snack from "components/Snack";
import { useState } from "react";
import { FormType } from "../../types";
import * as S from "./styles";
import { cnpj } from "cpf-cnpj-validator";
import { Button, FormGroup } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { EnterpriseResponse } from "services/Enterprises/types";

const EnterpriseInfoForm = ({
  setValues,
  values,
  setCurrent,
}: {
  setValues: (val: any) => void;
  values: FormType | EnterpriseResponse | undefined;
  setCurrent: (current: number) => void;
}) => {
  const navigate = useNavigate();
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

  const canSubmit = values?.cnpj && values.nomeempresarial;

  const nextStep = () => {
    console.log(values);
    if (canSubmit) {
      if (!cnpj.isValid(values.cnpj!)) {
        return handleError("Informe um cnpj valido para prosseguir!");
      }
      setCurrent(1);
    } else {
      handleError("Preencha todos os dados obrigatórios antes de prosseguir!");
    }
  };

  return (
    <S.Container>
      <S.Form>
        <InputForm
          name="cnpj"
          label="CNPJ *"
          value={values?.cnpj}
          onChange={handleChange}
          required
        />

        <S.Divider />

        <InputForm
          name="nomeempresarial"
          label="Razão social *"
          onChange={handleChange}
          value={values?.nomeempresarial}
          required
        />
      </S.Form>
      <S.Form>
        <InputForm
          name="email"
          value={values?.email}
          label="Email"
          onChange={handleChange}
        />
        <S.Divider />
        <InputForm
          name="telefone"
          value={values?.telefone}
          label="Telefone"
          onChange={handleChange}
        />
      </S.Form>

      <FormGroup row sx={{ mt: 5 }}>
        <Button
          variant="outlined"
          onClick={() => navigate("/Admin/Empresas", { replace: true })}
          sx={{ mt: 3, mr: 3 }}
        >
          Cancelar
        </Button>

        <ButtonComponent title="Próximo passo" onClick={nextStep} />
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

export default EnterpriseInfoForm;
