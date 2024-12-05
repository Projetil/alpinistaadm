export interface ICompanyMobileAppAssets {
  id: number;
  companyId: number;
  storeAppUrl: string;
  appName: string;
  store: number;
}

export interface ICreateMobileAppAssets {
  companyId: number;
  storeAppUrl: string;
  appName: string;
  store: number;
}
