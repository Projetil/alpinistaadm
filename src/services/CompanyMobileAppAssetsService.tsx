import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import {
  ICompanyMobileAppAssets,
  ICreateMobileAppAssets,
} from "@/types/ICompanyMobileAppAssets";

const endpoint = "/CompanyMobileAppAssets";

const CompanyMobileAppAssetsService = {
  Post: async (data: ICreateMobileAppAssets) => {
    try {
      const res = await api.post(`${endpoint}`, data);
      return res.data as ICompanyMobileAppAssets;
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

export default CompanyMobileAppAssetsService;
