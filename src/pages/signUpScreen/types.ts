import * as Yup from "yup";

export const schemaValidation = Yup.object().shape({
  cpf: Yup.string().required("O cpf é obrigatório"),
  id_empresa: Yup.number()
    .typeError("Informe um valor numérico")
    .required("O código da empresa é obrigatório"),
  senha: Yup.string().required("A senha é obrigatório"),
  dt_nascimento: Yup.date().required("Data de nascimento obrigatório"),
});
