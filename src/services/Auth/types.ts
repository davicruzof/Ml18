import { LoginData } from "pages/signInPage/types";

export type LoginResponse = {
  result: {
    type: string;
    token: string;
    error?: string;
  };
  empresa: LoginData;
};

export type UserData = {
  user: {
    id_usuario: string;
    id_status: number;
    id_funcionario: string;
    id_grupo: number;
    id_empresa: number;
    nome: string;
    cpf: string;
    celular: string;
    email: string;
    cnh_validade: string;
    dt_nascimento: string;
  };
  departamentos: Departamento[];
};

type Departamento = {
  id_area: number;
  area: string;
};

type Employee = {
  id_funcionario: string;
  nome: "FELIPE DANIEL DOS SANTOS";
  funcao: null;
};
