import * as Yup from "yup";

export interface LoginData {
  id_empresa: number;
  cpf: string;
  senha: string;
}

export const schemaValidation = Yup.object().shape({
  cpf: Yup.string().required("O cpf é obrigatório"),
  id_empresa: Yup.number()
    .typeError("Informe um valor numérico")
    .required("O código da empresa é obrigatório"),
  senha: Yup.string().required("A senha é obrigatório"),
});
