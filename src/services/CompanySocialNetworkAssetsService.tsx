import { HttpStatusCode } from "axios";
import { api } from "./api";
import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import {
  ICompanySocialNetworkAssets,
  ICreateSocialNetworkAssets,
} from "@/types/ICompanySocialNetworkAssets";

const endpoint = "/CompanySocialNetworkAssets";

const CompanySocialNetworkAssetsService = {
  Post: async (data: ICreateSocialNetworkAssets) => {
    try {
      const res = await api.post(`${endpoint}`, data);
      return res.data as ICompanySocialNetworkAssets;
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

export default CompanySocialNetworkAssetsService;
