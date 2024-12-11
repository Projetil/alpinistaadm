export interface ICompanyDomainAssets {
  id: string;
  companyId: number;
  domain: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateCompanyDomainAssets {
  companyId: number;
  domain: string;
}
