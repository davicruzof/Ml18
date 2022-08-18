export interface SiderItensProps {
  itens: ItensProps;
  modulo: string;
}

type ItensProps = {
  [key: string]: string;
};
