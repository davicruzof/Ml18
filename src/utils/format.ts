import { Time } from "services/Solicitacoes/types";

export const trim_cpf_cnpj = (value: string) => {
  return value.replaceAll(".", "").replace("-", "");
};

export const formatDate = (date: Date) => {
  const data = new Date(date);

  return `${data.getUTCFullYear()}`;
};
export const formatData = (date: Date) => {
  const data = new Date(date);

  const month =
    data.getUTCMonth() + 1 < 10
      ? `0${data.getUTCMonth() + 1}`
      : data.getUTCMonth() + 1;

  const day =
    data.getUTCDate() + 1 < 10
      ? `0${data.getUTCDate() + 1}`
      : data.getUTCDate() + 1;

  return `${data.getUTCFullYear()}-${month}-${day}`;
};

export const formatDataMonth = (date: string) => {
  const data = new Date(date);

  const month =
    data.getUTCMonth() + 1 < 10
      ? `0${data.getUTCMonth() + 1}`
      : data.getUTCMonth() + 1;

  return `${month}-${data.getUTCFullYear()}`;
};

export const returnTime = (time: Time) => {
  if (time?.days) {
    const timeSingle = time.days > 1 ? "dias" : "dia";
    return `${time.days} ${timeSingle}`;
  }
  if (time?.hours) {
    const timeSingle = time.hours > 1 ? "horas" : "hora";
    return `${time.hours} ${timeSingle}`;
  }
  if (time?.minutes) {
    const timeSingle = time.minutes > 1 ? "minutos" : "minuto";
    return `${time.minutes} ${timeSingle}`;
  }
};
