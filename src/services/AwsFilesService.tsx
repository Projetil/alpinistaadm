import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import { ICreateRiskFile, IRiskFile } from "@/types/IRiskFile";

const endpoint = "/AwsFiles";

const AwsFilesService = {
  GetById: async (fileName: string) => {
    try {
      const res = await api.get(`${endpoint}/${fileName}`);
      return res.data as IRiskFile;
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
  Post: async (data: ICreateRiskFile) => {
    try {
      const formData = new FormData();
      formData.append("File", data.File);
      const res = await api.post(
        `${endpoint}?RiskId=${data.RiskId}&Type=${data.Type}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data as IRiskFile;
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

export default AwsFilesService;
