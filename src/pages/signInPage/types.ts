import { trim_cpf_cnpj } from "utils/format";
import { cpf } from "cpf-cnpj-validator";
import * as Yup from "yup";

export interface LoginData {
  id_empresa: number;
  cpf: string;
  senha: string;
}

export const schemaValidation = Yup.object().shape({
  cpf: Yup.string()
    .required("O cpf é obrigatório")
    .test(
      "test valid cpf",
      "cpf inválido",
      (val) => Boolean(val) && cpf.isValid(trim_cpf_cnpj(val!))
    ),
  id_empresa: Yup.number()
    .typeError("Informe um valor numérico")
    .required("O código da empresa é obrigatório"),
  senha: Yup.string().required("A senha é obrigatório"),
});
