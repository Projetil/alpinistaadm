export interface GetAssetsRequest {
  companyId: number;
  pageNumber: number;
  pageSize: number;
  domainName?: string;
  severityType?: number;
}

export interface GetAssetsResponse {
  totalItems: number;
  items: GetAssetsItem[];
}

export interface GetAssetsItem {
  id: number;
  hostname: string;
  ip: string;
  description: string;
}

export const severityType = ["Info", "Baixo", "Médio", "Alto", "Crítico"];
export const activeTypes = ["Infra / Web", "Mobile", "Domínio", "Pessoa"];

export interface ICreateAssets {
  companyId: number;
  hostname: string;
  activetype: number;
  emailAddress?: string;
  severityType?: number;
  createdBy: number;
  description?: string;
  assetIps: ICreateAssetsIps[];
}

export interface ICreateAssetsIps {
  ip: string;
  assetIpPorts: {
    port: string;
  }[];
}

export interface IAssetsAdm {
  id: number;
  hostname: string;
  companyId: number;
  description?: string;
  activetype: number;
  severityType?: number;
  emailAddress?: string;
  modifiedBy: number;
  isIgnored: boolean;
  ips: IAssetsIpsAdm[];
}

export interface IUpdateAssetsAdm {
  id: number;
  hostname: string;
  companyId: number;
  description?: string;
  activetype: number;
  severityType?: number;
  emailAddress?: string;
  modifiedBy: number;
  isIgnored: boolean;
  assetIps: IUpdateAssetsIpsAdm[];
}

export interface IUpdateAssetsIpsAdm {
  id: number;
  ip: string;
  assetIpPorts: {
    id: number;
    port: string;
  }[];
}

export interface IAssetsIpsAdm {
  id: number;
  ip: string;
  ports: {
    id: number;
    port: string;
  }[];
}
