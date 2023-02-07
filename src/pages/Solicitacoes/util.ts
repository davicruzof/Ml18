import { listRequestResponse } from "./../../services/FichaPonto/types";
export const statusUtil: any = {
  PENDENTE: {
    title: "Pendente",
    color: "rgba(68, 94, 234, 1)",
    bg: "rgba(68, 94, 234, 0.4)",
  },
  ATENDIDA: {
    title: "Atendida",
    color: "rgba(53, 212, 151, 1)",
    bg: "rgba(53, 212, 151, 0.4)",
  },
  ANDAMENTO: {
    title: "Andamento",
    color: "rgba(255, 76, 0, 1)",
    bg: "rgba(255, 76, 0, 0.4)",
  },
};

export const formatRequests = (data: listRequestResponse[], idFunc: number) => {
  const send: listRequestResponse[] = [];
  data.map((item) => {
    if (
      item.id_funcionario_analise === idFunc ||
      item.modulo !== "Exclusão de conta"
    ) {
      send.push({
        id: item.id_solicitacao,
        ...item,
      });
    }
  });
  return send;
};
