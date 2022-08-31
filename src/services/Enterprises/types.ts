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
  id_empresa: number;
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
