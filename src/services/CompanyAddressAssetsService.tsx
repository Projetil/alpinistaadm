import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import {
  ICompanyAddressAssets,
  ICreateCompanyAddressAssets,
} from "@/types/ICompanyAddressAssets";
import { HttpStatusCode } from "axios";
import { api } from "./api";

const endpoint = "/CompanyAddressAssets";

const CompanyAddressAssetsService = {
  Post: async (data: ICreateCompanyAddressAssets) => {
    try {
      const res = await api.post(`${endpoint}`, data);
      return res.data as ICompanyAddressAssets;
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
  GetByCompanyId: async (id: number) => {
    try {
      const res = await api.get(`${endpoint}/Company/${id}`);
      return res.data as ICompanyAddressAssets[];
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
  Put: async (data: ICreateCompanyAddressAssets, id: number) => {
    try {
      await api.put(`${endpoint}/${id}`, data);
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

export default CompanyAddressAssetsService;
