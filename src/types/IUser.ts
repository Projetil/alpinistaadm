export interface IUserLogin {
  email: string;
  password: string;
}

export interface IValidationResult {
  tokenBearer: string;
  userID: string;
  userType: number;
  email: string;
}

export interface IUser {
  id: number;
  email: string;
  password: string;
  type: number;
}

export interface IUserPassword {
  userId: number;
  oldPassword: string;
  newPassword: string;
}

export interface ICreateUser {
  email: string;
  password: string;
  type: number;
}
