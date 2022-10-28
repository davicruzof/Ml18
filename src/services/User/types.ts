export type RegisterProps = {
  id_empresa: string;
  senha: string;
  cpf: string;
  dt_nascimento: string;
};

type DPT = {
  id_area: number;
  area: string;
};

export type UserResponse = {
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
  departamentos: DPT[];
};
