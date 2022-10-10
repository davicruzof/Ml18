export type DptTypes = {
  id_area: string;
  area: string;
  dt_cadastro: string;
  id_usuario: number;
  solicitacao: boolean;
};

export type TypeSolicitations = {
  id_modulo: string;
  modulo: string;
  id_area: number;
  dt_cadastro: number;
  id_usuario: number;
  solicitacao: boolean;
};

export type TypeRequest = {
  id_area: string;
  id_modulo: string;
  justificativa: string;
};

export type TypeListRequest = {
  status?: string;
  departamento?: number[];
};

export type Status = "ATENDIDA" | "PENDENTE" | "ANDAMENTO";

export type Time = {
  days?: number;
  hours?: number;
  minutes?: number;
  seconds?: number;
  milliseconds?: number;
};

export type listRequestResponse = {
  id?: string;
  id_solicitacao: string;
  id_empresa: number;
  id_funcionario: number;
  id_area: number;
  id_modulo: number;
  id_evento: number;
  status: Status;
  parecer: string;
  justificativa: string;
  dt_analise: string;
  id_funcionario_analise: number;
  dt_finalizada: string;
  id_funcionario_finalizada: number;
  dt_cadastro: string;
  area: string;
  modulo: string;
  cadastrado_a: Time;
};
