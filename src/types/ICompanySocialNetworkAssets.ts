export interface ICompanySocialNetworkAssets {
  id: number;
  companyId: number;
  facebook: string;
  instagram: string;
  linkedIn: string;
  whatsapp: string;
}

export interface ICreateSocialNetworkAssets {
  companyId: number;
  facebook: string;
  instagram: string;
  linkedIn: string;
  whatsapp: string;
}
