import InputForm from "components/Input";
import * as S from "./styles";
import Button from "components/Button";
import { FormType } from "../types";

const EnterpriseInfoForm = ({
  setValues,
  values,
  setCurrent,
}: {
  setValues: (val: FormType) => void;
  values: FormType | undefined;
  setCurrent: (current: number) => void;
}) => {
  const handleChange = (event: any) => {
    const auxValues = { ...values } as any;
    auxValues[event.target.name] = event.target.value;
    setValues(auxValues);
  };

  return (
    <S.Container>
      <S.Form>
        <InputForm
          name="nomeempresarial"
          label="Razão social *"
          onChange={handleChange}
          required
        />
        <S.Divider />
        <InputForm
          name="cnpj"
          label="CNPJ *"
          onChange={handleChange}
          required
        />
      </S.Form>
      <S.Form>
        <InputForm name="email" label="Email" onChange={handleChange} />
        <S.Divider />
        <InputForm name="telefone" label="Telefone" onChange={handleChange} />
      </S.Form>
      <Button title="Enviar" onClick={() => setCurrent(1)} />
    </S.Container>
  );
};

export default EnterpriseInfoForm;
