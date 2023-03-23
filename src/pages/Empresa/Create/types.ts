import React from "react";

export type ValueType = {
  target: { value: React.SetStateAction<any> };
};

export type FormType = {
  nomeempresarial?: string;
  cnpj?: string;
  email?: string;
  telefone?: string;
  cep?: string;
  municipio?: string;
  uf?: string;
  numero?: string;
  bairro?: string;
  complemento?: string;
  logradouro?: string;
};
