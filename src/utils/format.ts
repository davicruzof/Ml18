export const trim_cpf_cnpj = (value: string) => {
  return value.replaceAll(".", "").replace("-", "");
};

export const formatData = (date: Date) => {
  const data = new Date(date);

  const month =
    data.getUTCMonth() + 1 < 10
      ? `0${data.getUTCMonth() + 1}`
      : data.getUTCMonth() + 1;

  return `${data.getUTCFullYear()}-${month}-${data.getUTCDate()}`;
};
