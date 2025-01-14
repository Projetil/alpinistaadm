import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import {
  GetAssetsResponse,
  IAssetsAdm,
  ICreateAssets,
  IUpdateAssetsAdm,
} from "@/types/IAssets";
import { toast } from "react-toastify";

const endpoint = "/Assets";

const AssetsService = {
  GetAll: async (
    companyId: number,
    pageNumber: number,
    pageSize: number,
    domainName?: string,
    severityType?: number
  ) => {
    try {
      const params = new URLSearchParams({
        CompanyId: companyId.toString(),
        PageNumber: pageNumber.toString(),
        PageSize: pageSize.toString(),
      });

      if (domainName) {
        params.append("DomainName", domainName);
      }

      if (severityType) {
        params.append("SeverityType", severityType.toString());
      }

      const res = await api.get(`${endpoint}/Adm?${params.toString()}`);
      return res.data as GetAssetsResponse;

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
  Get: async (id: number) => {
    try {
      const res = await api.get(`${endpoint}/Adm/${id}`);
      return res.data as IAssetsAdm;
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
  Post: async (data: ICreateAssets) => {
    try {
      const res = await api.post(`${endpoint}/Adm`, data);
      return res.data as IAssetsAdm;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      switch (error.statusCode) {
        case HttpStatusCode.BadRequest:
          throw new ValidationError(error.data);
        case HttpStatusCode.NotFound:
          throw new NotFoundError();
        default:
          const errorMessage = error.response.data
            .split("System.Exception: ")[1]
            .split(" at ")[0];
          if (
            errorMessage.toString().trim() ==
            "Não é possivel adicionar o IPs duplicados"
          ) {
            toast.error("Não é possivel adicionar o IPs duplicados");
          }
          if (
            errorMessage.toString().trim() ==
            "Já existe um ativo com esse email cadastrado."
          ) {
            toast.error("Já existe um ativo com esse email cadastrado.");
          }
          throw new UnexpectedError();
      }
    }
  },
  Put: async (data: IUpdateAssetsAdm, id: number) => {
    try {
      const res = await api.put(`${endpoint}/Adm/${id}`, data);
      return res.data;
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
      const res = await api.delete(`${endpoint}/Adm/${id}`);
      return res;
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
export default AssetsService;
