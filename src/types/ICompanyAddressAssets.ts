export interface ICompanyAddressAssets {
  id: string;
  companyId: number;
  addressIp: string;
  addressBlock: string;
}

export interface ICreateCompanyAddressAssets {
  companyId: number;
  addressIp: string;
  addressBlock: string;
}
