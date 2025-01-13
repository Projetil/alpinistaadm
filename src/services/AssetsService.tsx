import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { GetAssetsResponse } from "@/types/IAssets";


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
};
export default AssetsService;
