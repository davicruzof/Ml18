import InputForm from "components/Input";
import * as S from "./styles";
import ButtonComponent from "components/Button";
import { useEffect, useState } from "react";
import { FormType, ValueType } from "../types";
import cep from "cep-promise";
import { Button, FormGroup } from "@mui/material";
import Snack from "components/Snack";

const EnterpriseAddressForm = ({
  setValues,
  values,
  setCurrent,
}: {
  setValues: (val: FormType) => void;
  values: FormType | undefined;
  setCurrent: (current: number) => void;
}) => {
  const [cepValue, setCep] = useState(values?.cep);

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

  useEffect(() => {
    const auxValues = { ...values } as any;

    if (cepValue?.length === 8) {
      cep(cepValue).then(
        (val: { neighborhood: any; city: any; state: any; street: any }) => {
          auxValues.bairro = val.neighborhood;
          auxValues.municipio = val.city;
          auxValues.uf = val.state;
          auxValues.logradouro = val.street;
          auxValues.cep = cepValue;
          setValues(auxValues);
        }
      );
    } else {
      clearAddress();
    }
  }, [cepValue]);

  function clearAddress() {
    const auxValues = { ...values } as any;
    auxValues.bairro = "";
    auxValues.municipio = "";
    auxValues.uf = "";
    auxValues.logradouro = "";
    setValues(auxValues);
  }

  const canSubmit =
    values?.cep &&
    values?.uf &&
    values?.municipio &&
    values?.bairro &&
    values?.numero &&
    values?.logradouro;

  const handleNextStep = () => {
    if (canSubmit) {
      setCurrent(2);
    } else {
      handleError("Preencha todos os dados obrigatórios antes de prosseguir!");
    }
  };

  return (
    <S.Container>
      <S.Form>
        <InputForm
          label="CEP *"
          name="cep"
          onChange={(e: ValueType) => setCep(e.target.value)}
          value={cepValue}
          required
        />
        <S.Divider />
        <InputForm
          label="Estado *"
          value={values?.uf}
          name="uf"
          onChange={handleChange}
          required
        />
        <S.Divider />

        <InputForm
          label="Cidade *"
          value={values?.municipio}
          name="municipio"
          onChange={handleChange}
          required
        />
      </S.Form>

      <InputForm
        label="Logradouro *"
        value={values?.logradouro}
        name="logradouro"
        onChange={handleChange}
        required
      />

      <S.Form>
        <InputForm
          label="Bairro *"
          name="Bairro"
          value={values?.bairro}
          onChange={handleChange}
        />
        <S.Divider />
        <InputForm
          label="Numero *"
          name="numero"
          value={values?.numero}
          onChange={handleChange}
          required
        />
        <S.Divider />
        <InputForm
          name="complemento"
          onChange={handleChange}
          value={values?.complemento}
          label="Complemento"
        />
      </S.Form>

      <FormGroup row>
        <Button
          variant="outlined"
          onClick={() => setCurrent(0)}
          sx={{ mt: 3, mr: 3 }}
        >
          Voltar
        </Button>

        <ButtonComponent title="Próximo passo" onClick={handleNextStep} />
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

export default EnterpriseAddressForm;
