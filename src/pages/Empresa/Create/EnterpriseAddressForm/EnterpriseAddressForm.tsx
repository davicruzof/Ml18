import InputForm from "components/Input";
import * as S from "./styles";
import Button from "components/Button";
import { useEffect, useState } from "react";
import { FormType, ValueType } from "../types";
import cep from "cep-promise";

const EnterpriseAddressForm = ({
  setValues,
  values,
  setCurrent,
}: {
  setValues: (val: FormType) => void;
  values: FormType | undefined;
  setCurrent: (current: number) => void;
}) => {
  const [cepValue, setCep] = useState("");

  const handleChange = (event: any) => {
    const auxValues = { ...values } as any;
    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  useEffect(() => {
    const auxValues = { ...values } as any;
    if (cepValue.length === 8) {
      cep(cepValue)
        .then(
          (val: { neighborhood: any; city: any; state: any; street: any }) => {
            auxValues.bairro = val.neighborhood;
            auxValues.municipio = val.city;
            auxValues.uf = val.state;
            auxValues.logradouro = val.street;
          }
        )
        .catch(() => {
          auxValues.bairro = "";
          auxValues.municipio = "";
          auxValues.uf = "";
          auxValues.logradouro = "";
        });
    }
    setValues(auxValues);
  }, [cepValue]);

  console.log(values);

  return (
    <S.Container>
      <S.Form>
        <InputForm
          label="CEP"
          name="cep"
          onChange={(e: ValueType) => setCep(e.target.value)}
          value={cepValue}
          required
        />
        <S.Divider />
        <InputForm
          label="Estado"
          value={values?.uf}
          name="uf"
          onChange={handleChange}
          required
        />
        <S.Divider />

        <InputForm
          label="Cidade"
          value={values?.municipio}
          name="municipio"
          onChange={handleChange}
          required
        />
      </S.Form>

      <InputForm
        label="Rua"
        value={values?.logradouro}
        name="logradouro"
        onChange={handleChange}
        required
      />

      <S.Form>
        <InputForm
          label="Bairro"
          name="Bairro"
          value={values?.bairro}
          onChange={handleChange}
        />
        <S.Divider />
        <InputForm
          label="Numero"
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

      <Button title="Enviar" onClick={() => setCurrent(2)} />
    </S.Container>
  );
};

export default EnterpriseAddressForm;
