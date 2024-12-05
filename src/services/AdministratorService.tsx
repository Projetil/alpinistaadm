import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { IAdministrator, ICreateAdministrator } from "@/types/IAdministrator";

const endpoint = "/Administrators";

const AdministratorService = {
  GetAll: async () => {
    try {
      const res = await api.get(`${endpoint}`);
      return res.data as IAdministrator[];
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
  Post: async (data: ICreateAdministrator) => {
    try {
      const res = await api.post(`${endpoint}`, data);
      return res.data as IAdministrator;
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

export default AdministratorService;
