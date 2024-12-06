/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICompany {
  id: number;
  name: string;
  cnpj: string;
  status: number;
  createdAt: string;
  commercialContactName: string;
  commercialContactEmail: string;
  technicalContactName: string;
  technicalContactEmail: string;
  domains: string[];
  addresses: any[];
  socialNetwork: any | null;
  companySocialNetworkId: any | null;
  mobileApp: any[];
  customers: any[];
}

export interface ICreateCompany {
  name: string;
  cnpj: string;
  status: number;
  commercialContactName: string;
  commercialContactEmail: string;
  technicalContactName: string;
  technicalContactEmail: string;
}

export interface IPagedCompany {
  totalItems: number;
  items: ICompany[];
}
