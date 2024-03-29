export interface EnterPriseType {
  id_empresa: number;
  nomeempresarial: string;
  cnpj: string;
  telefone: string | null;
  situacaocadastral: string | null;
  status: number;
}

export interface EnterpriseResponse {
  background: string | null;
  bairro: string | null;
  bucket: string | null;
  cep: string;
  cnpj: string;
  complemento: string;
  contato: string | null;
  dt_cadastro: string;
  dt_situacaocadastral: string;
  email: string | null;
  id_empresa: string;
  id_grupo: number;
  id_usuario: string;
  logo: string;
  logradouro: string;
  municipio: string;
  nomeempresarial: string;
  numero: string;
  primary_color: string | null;
  situacaocadastral: string;
  status: number;
  telefone: string | null;
  uf: string;
  updatedat: string;
}

export type cnpjType = {
  uf: string;
  cep: string;
  pais: string;
  email: string;
  bairro: string;
  numero: string;
  municipio: string;
  logradouro: string;
  complemento: string;
  razao_social: string;
  nome_fantasia: string;
  ddd_telefone_1: string;
  cnpj: string;
};
