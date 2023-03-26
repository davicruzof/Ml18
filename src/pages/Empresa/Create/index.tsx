import { useState } from "react";
import EnterpriseInfoForm from "./EnterpriseInfoForm/EnterpriseInfoForm";

import * as S from "./styles";
import EnterpriseAddressForm from "./EnterpriseAddressForm/EnterpriseAddressForm";
import { type FormType } from "./types";
import EnterpriseBrandForm from "./EnterpriseBrandForm/EnterpriseBrandForm";

export default function Create() {
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState<FormType>();

  const steps = [
    "1. Dados da empresa",
    "2. Endereço da empresa",
    "3.Dados de marca",
  ];

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro de Empresa</S.Title>
        <S.SubTitle>Informe os dados da empresa que será cadastrada</S.SubTitle>
      </S.Header>

      <S.ContainerSteps>
        {steps.map((step, index) => (
          <S.StepWrapper key={step}>
            <span>{step}</span>
            <S.StepProgress active={index <= current} />
          </S.StepWrapper>
        ))}
      </S.ContainerSteps>

      {current === 0 && (
        <EnterpriseInfoForm
          setCurrent={setCurrent}
          setValues={setValues}
          values={values}
        />
      )}

      {current === 1 && (
        <EnterpriseAddressForm
          setCurrent={setCurrent}
          setValues={setValues}
          values={values}
        />
      )}

      {current === 2 && (
        <EnterpriseBrandForm
          setCurrent={setCurrent}
          setValues={setValues}
          values={values}
        />
      )}
    </S.Container>
  );
}
