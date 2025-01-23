export const severityType = ["Info", "Baixo", "Médio", "Alto", "Crítico"];
export const activeTypes = ["Infra / Web", "Mobile", "Domínio", "Pessoa"];

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

export interface ICreateAssets {
  companyId: number;
  hostname: string;
  activetype: number;
  ip: string;
  createdBy: number;
  emailAddress?: string;
  severityType?: number;
  description?: string;
  ports?: ICreateAssetPorts[];
}

export interface ICreateAssetPorts {
  port: string;
}

export interface IAssetsAdm {
  id: number;
  hostname: string;
  ip: string;
  activetype: number;
  modifiedBy: number;
  isIgnored: boolean;
  companyId?: number;
  description?: string;
  severityType?: number;
  emailAddress?: string;
  ports: IAssetsAdmPorts[];
}

export interface IUpdateAssetsAdm {
  id: number;
  hostname: string;
  activetype: number;
  modifiedBy: number;
  isIgnored: boolean;
  description?: string;
  severityType?: number;
  emailAddress?: string;
  assetIpPorts: IUpdateAssetsPortsAdm[];
}

export interface IUpdateAssetsPortsAdm {
  id: number;
  port: string;
}

export interface IAssetsAdmPorts {
  id: number;
  assetId?: number;
  port: string;
}
