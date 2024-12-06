export interface IRiskComment {
  id: number;
  riskId: number;
  userId: number;
  customerName: string;
  createdAt: string;
  text: string;
}

export interface IPagedRisksComment {
  items: IRiskComment[];
  totalItems: number;
}

export interface ICreateRisksComment {
  riskId: number;
  userId: number;
  text: string;
}
