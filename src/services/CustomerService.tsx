import { api } from "./api";
import { HttpStatusCode } from "axios";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { ICreateCustomer, ICustomer, IPagedCustomer } from "@/types/ICustomer";

const endpoint = "/Customers";

const CustomerService = {
  GetAllByCompanyId: async (
    pageNumber: number,
    pageSize: number,
    companyId?: number,
    orderByColumn?: string,
    orderByDirection?: string
  ) => {
    try {
      const res = await api.get(
        `${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}${
          companyId ? `&companyId=${companyId}` : ""
        }${orderByColumn ? `&orderByColumn=${orderByColumn}` : ""}${
          orderByDirection ? `&orderByDirection=${orderByDirection}` : ""
        }`
      );
      return res.data as IPagedCustomer;
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
  Put: async (company: ICreateCustomer, id: number) => {
    try {
      const res = await api.put(`${endpoint}/${id}`, company);
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
  Delete: async (id: number) => {
    try {
      await api.delete(`${endpoint}/${id}`);
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
