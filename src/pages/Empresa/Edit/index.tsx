/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";

import { useMutation } from "react-query";
import { getEnterpriseById } from "services/Enterprises/enterprises";
import { useLocation } from "react-router-dom";
import { EnterpriseResponse } from "services/Enterprises/types";
import Loading from "components/Loading/Loading";
import Base_Edit_Create from "../components/Base_Edit_Create";

export default function EditEnterprise() {
  const { state } = useLocation();

  const id = state?.idEnterprise;
  const [values, setValues] = useState<EnterpriseResponse>();

  const { mutate: getEnterprise, isLoading } = useMutation(
    "getEnterpriseById",
    {
      mutationFn: (idEnterprise: number) => getEnterpriseById(idEnterprise),
      onSuccess: ({ data }) => {
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
    <Base_Edit_Create
      title="Editar Empresa"
      subtitle="Informe os dados da empresa que serão editados"
      type="edit"
      setValues={setValues}
      values={values}
    />
  );
}
