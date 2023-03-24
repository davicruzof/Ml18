import Button from "components/Button";
import InputForm from "components/Input";
import Snack from "components/Snack";
import { useState } from "react";
import { FormType } from "../types";
import * as S from "./styles";

const EnterpriseInfoForm = ({
  setValues,
  values,
  setCurrent,
}: {
  setValues: (val: FormType) => void;
  values: FormType | undefined;
  setCurrent: (current: number) => void;
}) => {
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
    if (canSubmit) {
      setCurrent(1);
    } else {
      handleError("Preencha todos os dados obrigatórios antes de prosseguir!");
    }
  };

  return (
    <S.Container>
      <S.Form>
        <InputForm
          name="nomeempresarial"
          label="Razão social *"
          onChange={handleChange}
          value={values?.nomeempresarial}
          required
        />
        <S.Divider />
        <InputForm
          name="cnpj"
          label="CNPJ *"
          value={values?.cnpj}
          onChange={handleChange}
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
      <Button title="Próximo passo" onClick={nextStep} />

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
