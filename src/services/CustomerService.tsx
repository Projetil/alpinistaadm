import { api } from "./api";
import { HttpStatusCode } from "axios";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { ICreateCustomer, ICustomer } from "@/types/ICustomer";

const endpoint = "/Customers";

const CustomerService = {
  GetByCompanyId: async (companyId: number) => {
    try {
      const res = await api.get(`${endpoint}?companyId=${companyId}`);
      return res.data as ICustomer[];
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
  Post: async (company: ICreateCustomer) => {
    try {
      const res = await api.post(`${endpoint}`, company);
      return res.data as ICustomer;
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

export default CustomerService;
