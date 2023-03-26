import { useEffect, useState } from "react";
import EnterpriseInfoForm from "./EnterpriseInfoForm/EnterpriseInfoForm";

import * as S from "./styles";
import EnterpriseAddressForm from "./EnterpriseAddressForm/EnterpriseAddressForm";
import EnterpriseBrandForm from "./EnterpriseBrandForm/EnterpriseBrandForm";
import { useMutation } from "react-query";
import { getEnterpriseById } from "services/Enterprises/enterprises";
import { useLocation } from "react-router-dom";
import { EnterpriseResponse } from "services/Enterprises/types";
import Loading from "components/Loading/Loading";

export default function EditEnterprise() {
  const { state } = useLocation();

  const id = state?.idEnterprise;
  const [current, setCurrent] = useState(0);
  const [values, setValues] = useState<EnterpriseResponse>();

  const steps = [
    "1. Editar dados da empresa",
    "2. Editar endereço da empresa",
    "3. Editar dados de marca",
  ];

  const { mutate: getEnterprise, isLoading } = useMutation(
    "getEnterpriseById",
    {
      mutationFn: (idEnterprise: number) => getEnterpriseById(idEnterprise),
      onSuccess: ({ data }) => {
        console.log(data);
        setValues(data);
      },
    }
  );

  useEffect(() => {
    getEnterprise(id);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Editar em Empresa</S.Title>
        <S.SubTitle>Informe os dados da empresa que serão editado</S.SubTitle>
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
