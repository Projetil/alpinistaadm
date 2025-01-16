export interface IRisk {
  id: number;
  companyId: number;
  name: string;
  status: number;
  origin: number;
  riskSeverity: number;
  responsibleCustomerId: number | null;
  assetId: number;
  assetName: string;
  limitDate: string;
  description: string;
  observations: string;
  actionPlan: string;
  evidences: string;
  createdAt: string;
  updatedAt: string;
}

export interface IGroupRiks {
  groupName: string;
  totalRisks: number;
  severityCounts: { [key: string]: number };
  statusCounts: { [key: string]: number };
}

export interface IPagedGroupRisk {
  totalItems: number;
  items: IGroupRiks[];
}

export interface IPagedRisk {
  totalItems: number;
  items: IRisk[];
}

export interface ICreateRisk {
  companyId: number;
  name: string;
  status: number;
  origin: number;
  riskSeverity: number;
  responsibleCustomerId?: number;
  assetId: number;
  limitDate?: string;
  description: string;
  observations: string;
  actionPlan: string;
  evidences: string;
}

export enum riskStatus {
  Pendente = 1,
  "Em progresso" = 2,
  Fixado = 3,
  Aceito = 4,
  Retest = 5,
  Reaberto = 6,
}

export enum riskSeverity {
  Info = 1,
  Baixo = 2,
  Medio = 3,
  Alto = 4,
  Critico = 5,
}

export enum riskOrigin {
  "Superfície de ataque" = 1,
  "Inteligência de ameaças" = 2,
  "Gestão de vulnerabilidade" = 3,
  "Teste de intrusão" = 4,
  "Terceiros" = 5,
  "Conformidade" = 6,
}
