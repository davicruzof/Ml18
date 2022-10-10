import { DptTypes } from "services/Solicitacoes/types";

export function not(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) === -1);
}

export function intersection(a: string[], b: string[]) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

export const handleCheckedToggle = (value: string, checked: string[]) => () => {
  const currentIndex = checked.indexOf(value);
  const newChecked = [...checked];

  if (currentIndex === -1) {
    newChecked.push(value);
  } else {
    newChecked.splice(currentIndex, 1);
  }

  return newChecked;
};

export const handleChecked = (Checked: string[], departamentos: DptTypes[]) => {
  const sendItens = departamentos.filter((item) => {
    return Checked.includes(item.area) && item;
  });

  const oldItens = departamentos.filter((item) => {
    return !Checked.includes(item.area) && item;
  });

  return { sendItens, oldItens };
};
