export interface IRiskHistorical {
  id: number;
  riskId: number;
  createdAt: string;
  text: string;
}

export interface IPagedRisksHistorical {
  items: IRiskHistorical[];
  totalItems: number;
}

export interface ICreateRisksHistorical {
  riskId: number;
  text: string;
}
