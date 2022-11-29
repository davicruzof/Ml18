import { GoRequestChanges } from "react-icons/go";
import { HiOutlineDesktopComputer } from "react-icons/hi";

export const MenuItens = [
  {
    title: "Solicitações",
    itemId: "#",
    elemBefore: () => <GoRequestChanges style={{ fontSize: 28 }} />,

    subNav: [
      {
        title: "Monitoramento",
        itemId: "/solicitacoes/monitoramento",
      },
    ],
  },
  {
    title: "TI",
    itemId: "#",
    elemBefore: () => <HiOutlineDesktopComputer style={{ fontSize: 28 }} />,
    subNav: [
      {
        title: "Permissões",
        itemId: "/ti/permissoes",
      },
      {
        title: "Exclusão de conta",
        itemId: "/ti/delete_account",
      },
    ],
  },
  // {
  //   title: "Admin",
  //   subitems: ["Empresas"],
  // },
  // {
  //   title: "BackOffice",
  //   subitems: ["Linha", "Veículos", "Grupos"],
  // },
  // {
  //   title: "TI",
  //   subitems: [
  //     "Usuário",
  //     "Permissões",
  //     "Parâmetro",
  //     "Grupo usuários",
  //     "Exclusão de conta",
  //   ],
  // },
  // {
  //   title: "RH",
  //   subitems: ["Videos", "Treinamento", "Parâmetro", "Avisos"],
  // },
  // {
  //   title: "Ponto Eletronico",
  //   subitems: ["Lançamentos", "Ficha Ponto", "Parâmetro"],
  // },
  // {
  //   title: "Plantão",
  //   subitems: ["Monitoramento", "Parâmetro"],
  // },
  // {
  //   title: "Sair",
  //   subitems: [],
  // },
];
