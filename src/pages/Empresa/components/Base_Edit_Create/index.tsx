import { useState } from "react";

import * as S from "./styles";
import EnterpriseAddressForm from "../EnterpriseAddressForm/EnterpriseAddressForm";
import EnterpriseBrandFormCreate from "../../Create/EnterpriseBrandForm/EnterpriseBrandForm";
import EnterpriseBrandFormEdit from "../../Edit/EnterpriseBrandForm/EnterpriseBrandForm";
import { STEPS } from "./constants";
import { baseCreateEditProps } from "./types";
import EnterpriseInfoForm from "../EnterpriseInfoForm/EnterpriseInfoForm";

export default function Base_Edit_Create({
  values,
  setValues,
  title,
  subtitle,
  type,
}: baseCreateEditProps) {
  const [current, setCurrent] = useState(0);

  const EnterpriseBrandForm = () => {
    return type === "create" ? (
      <EnterpriseBrandFormCreate
        setCurrent={setCurrent}
        setValues={setValues}
        values={values}
      />
    ) : (
      <EnterpriseBrandFormEdit
        setCurrent={setCurrent}
        setValues={setValues}
        values={values}
      />
    );
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>{title}</S.Title>
        <S.SubTitle>{subtitle}</S.SubTitle>
      </S.Header>

      <S.ContainerSteps>
        {STEPS.map((step, index) => (
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

      {current === 2 && <EnterpriseBrandForm />}
    </S.Container>
  );
}
