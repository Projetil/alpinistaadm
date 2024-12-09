export interface ICustomer {
  id: number;
  userId: number;
  companyId: number;
  name: string;
  email: string;
  number: number;
  position: string;
  password: string;
  profileId: number;
}

export interface ICreateCustomer {
  userId: number;
  companyId: number;
  name: string;
  email: string;
  number: number;
  position: string;
  password: string;
  profileId: number;
}

export interface IPagedCustomer {
  totalItems: number;
  items: ICustomer[];
}
