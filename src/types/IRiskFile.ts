export interface ICreateRiskFile {
  RiskId: number;
  File: File;
  Type: number;
}

export interface IFileRisk {
  File: File;
  Type: number;
}

export interface IRiskFile {
  id: number;
  riskFileUrl: string;
  riskId: number;
  file: File;
  type: number;
  createdAt: string;
}

export interface IPagedRiskFile {
  totalItems: number;
  items: IRiskFile[];
}
