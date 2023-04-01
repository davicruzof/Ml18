/* eslint-disable react/jsx-pascal-case */
import { useEffect, useState } from "react";

import { type FormType } from "./types";
import { useMutation } from "react-query";
import { getCNPJ } from "services/Enterprises/enterprises";
import { cnpjType } from "services/Enterprises/types";
import Base_Edit_Create from "../components/Base_Edit_Create";

export default function Create() {
  const [values, setValues] = useState<FormType>();

  const { mutate: getCnpj } = useMutation({
    mutationFn: (cnpj: string) => getCNPJ(cnpj),
    onSuccess: ({ data }: { data: cnpjType }) => {
      if (data) {
        const enterprise = {
          telefone: data.ddd_telefone_1,
          nomeempresarial: data.nome_fantasia,
          uf: data.uf,
          cep: data.cep,
          email: data.email,
          bairro: data.bairro,
          numero: data.numero,
          municipio: data.municipio,
          logradouro: data.logradouro,
          complemento: data.complemento,
          cnpj: data.cnpj,
        };
        setValues(enterprise);
      }
    },
    onError: (err) => {
      console.log(err);
    },
  });

  useEffect(() => {
    if (values?.cnpj) {
      getCnpj(values.cnpj);
    }
  }, [values?.cnpj]);

  return (
    <Base_Edit_Create
      title="Cadastro de Empresa"
      subtitle="Informe os dados da empresa que será cadastrada"
      type="create"
      setValues={setValues}
      values={values}
    />
  );
}
