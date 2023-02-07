import React from "react";

export type ValueType = {
  target: { value: React.SetStateAction<any> };
};

export interface DialogProps {
  setOpen: (v: boolean) => void;
  setStatus: (v: string) => void;
  open: boolean;
  status: string;
  id_solicitacao: string | number;
  updateStatusRequest: ({}) => void;
  justificativa: string | undefined;
}

type Atualizado = {
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
};
type Cadastrado = {
  days: number;
  hours: number;
  milliseconds: number;
  minutes: number;
  seconds: number;
};

export type RowType = {
  atualizado_a: Atualizado;
  cadastrado_a: Cadastrado;
  dt_analise: string;
  dt_cadastro: string;
  dt_finalizada: string;
  id: string;
  id_area: number;
  id_empresa: number;
  id_evento: number;
  id_funcionario: number;
  id_funcionario_analise: number;
  id_funcionario_finalizada: number;
  id_modulo: number;
  id_solicitacao: string;
  justificativa: string;
  modulo: string;
  nome: string;
  parecer: string;
  status: string;
};
