export interface IRisk {
  id: number;
  companyId: number;
  name: string;
  status: number;
  riskSeverity: number;
  responsibleCustomerId: number | null;
  active: string;
  limitDate: string;
  description: string;
  observations: string;
  actionPlan: string;
  evidences: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPagedRisk {
  totalItems: number;
  items: IRisk[];
}

export interface ICreateRisk {
  companyId: number;
  name: string;
  status: number;
  riskSeverity: number;
  responsibleCustomerId?: number;
  active: string;
  limitDate?: string;
  description: string;
  observations: string;
  actionPlan: string;
  evidences: string;
}

export enum riskStatus {
  Pendente = 1,
  EmProgresso = 2,
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
