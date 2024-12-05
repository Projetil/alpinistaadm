export interface IRisk {
  id: number;
  name: string;
  status: string;
  severity: string;
  responsible: string;
  active: string;
  limitDate: string;
  description: string;
  notes: string;
  actionPlan: string;
  evidence: string;
  releaseDate: string;
}

export const riskData: IRisk[] = [
  {
    id: 1,
    name: "Risco 1",
    status: "Ativo",
    severity: "Alto",
    responsible: "someone@example.com",
    active: "Ativo",
    limitDate: "31/12/2022",
    description: "Descrição do risco 1",
    notes: "Notas sobre o risco 1",
    actionPlan: "Plano de ação para o risco 1",
    evidence: "Evidências relacionadas ao risco 1",
    releaseDate: "01/01/2023",
  },
  {
    id: 1,
    name: "Risco 1",
    status: "Ativo",
    severity: "Alto",
    responsible: "someone@example.com",
    active: "Ativo",
    limitDate: "31/12/2022",
    description: "Descrição do risco 1",
    notes: "Notas sobre o risco 1",
    actionPlan: "Plano de ação para o risco 1",
    evidence: "Evidências relacionadas ao risco 1",
    releaseDate: "01/01/2023",
  },
  {
    id: 1,
    name: "Risco 1",
    status: "Ativo",
    severity: "Alto",
    responsible: "someone@example.com",
    active: "Ativo",
    limitDate: "31/12/2022",
    description: "Descrição do risco 1",
    notes: "Notas sobre o risco 1",
    actionPlan: "Plano de ação para o risco 1",
    evidence: "Evidências relacionadas ao risco 1",
    releaseDate: "01/01/2023",
  },
];
