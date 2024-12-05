import { ICompany, ICreateCompany } from "@/types/ICompany";
import { api } from "./api";
import { HttpStatusCode } from "axios";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";

const endpoint = "/Companies";

const CompanyService = {
  GetAll: async () => {
    try {
      const res = await api.get(`${endpoint}`);
      return res.data as ICompany[];
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
      const res = await api.get(`${endpoint}/${id}`);
      return res.data as ICompany;
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
  Post: async (company: ICreateCompany) => {
    try {
      const res = await api.post(`${endpoint}`, company);
      return res.data as ICompany;
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

export default CompanyService;
