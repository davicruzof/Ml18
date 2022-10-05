export interface EmployeeType {
  id_funcionario: string;
  nome: string;
}

export interface EmployeeAreasType {
  id_funcionario: string;
  area: string[];
}

export interface EmployeeByIdType {
  id_funcionario: string;
  id_grupo: number;
  id_empresa: number;
  nome: string;
  registro: string;
  id_funcionario_erp: number;
  cpf: string;
  celular: string;
  email: string;
  rfid: string;
  dt_admissao: string;
  dt_demissao: string;
  cnh_emissao: string;
  cnh_validade: string;
  id_funcionario_alteracao: string;
  dt_alteracao: string;
  dt_nascimento: string;
  pis: string;
  cnh: string;
  funcao: string;
  sexo: string;
  situacao: {
    id_situacao: number;
    situacao: string;
  };
}
