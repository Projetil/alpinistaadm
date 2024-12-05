export interface IAdministrator {
  id: number;
  userId: number;
  name: string;
  email: string;
  phone: number;
  position: string;
  password: string;
}

export interface ICreateAdministrator {
  userId: number;
  name: string;
  email: string;
  phone: number;
  position: string;
  password: string;
}
