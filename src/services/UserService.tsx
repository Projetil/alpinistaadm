import { HttpStatusCode } from "axios";
import { api } from "./api";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import {
  ICreateUser,
  IUser,
  IUserLogin,
  IUserPassword,
  IValidationResult,
} from "@/types/IUser";

const UserService = {
  Post: async (data: ICreateUser) => {
    try {
      const res = await api.post("/User", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      return res.data as IUser;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  Put: async (data: Partial<ICreateUser>, id: number) => {
    try {
      await api.put(`/User/${id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  Login: async (data: IUserLogin) => {
    try {
      await api.post("/User/Login", data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  ValidationCode: async (value: string, codeValidationType: string) => {
    try {
      const res = await api.post(
        `/User/CodeValidation/${value}/${codeValidationType}`
      );
      return res.data as IValidationResult;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  PasswordRecovery: async (email: string) => {
    try {
      const response = await api.post(`/User/PasswordRecovery/${email}`);
      return response.data;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  PasswordRecoveryNewPassword: async (id: string, password: string) => {
    try {
      const res = await api.patch(
        `/User/PasswordRecovery/NewPassword/${id}/${password}`
      );
      return res.data as boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  ChangePassword: async (data: IUserPassword) => {
    try {
      const res = await api.patch(`/User/ChangePassword`, data);
      return res.data as boolean;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
  GetById: async (id: number) => {
    try {
      const response = await api.get(`/User/${id}`);
      return response.data as IUser;

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.body.erros);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          throw new UnexpectedError();
      }
    }
  },
};

export default UserService;
