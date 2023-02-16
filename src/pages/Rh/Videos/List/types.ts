import * as Yup from "yup";

export interface SearchProps {
  search: string;
}

export interface EnterPriseType {
  id?: number;
  Empresa: string;
  cnpj: string;
  telefone: string | null;
  situacaocadastral: string | null;
  status: number;
  id_empresa: number;
  nomeempresarial: string;
}

export const schemaValidation = Yup.object().shape({
  search: Yup.string().required("O campo de busca deve conter uma valor"),
});
