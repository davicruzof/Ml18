export type videoType = {
  descricao: string;
  dt_criacao: string;
  dt_expiracao: string;
  id_empresa: number;
  id_video: number;
  link: string;
  titulo: string;
};

export type videoTypeEdit = {
  id_video: string;
  descricao: string;
  titulo: string;
  dt_expiracao: string;
};
