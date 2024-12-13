export interface ICompanyAddressAssets {
  id: string;
  companyId: number;
  addressIp: string;
  addressIpBlock: string;
}

export interface ICreateCompanyAddressAssets {
  companyId: number;
  addressIp: string;
  addressIpBlock: string;
}
