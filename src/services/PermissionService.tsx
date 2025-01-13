import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import {
  ICreatePermission,
  ICreatePermissionFront,
  IPaginatedPermission,
  IPermission,
} from "@/types/IPermission";

const endpoint = "/Profiles";

const PermissionService = {
  GetAll: async (
    pageNumber: number,
    pageSize: number,
    orderByColumn: string,
    orderByDirection: string
  ) => {
    try {
      const res = await api.get(
        `${endpoint}?pageNumber=${pageNumber}&pageSize=${pageSize}${
          orderByColumn ? `&orderByColumn=${orderByColumn}` : ""
        }${orderByDirection ? `&orderByDirection=${orderByDirection}` : ""}`
      );
      return res.data as IPaginatedPermission;
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
      return res.data as IPermission;
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
  Post: async (data: ICreatePermissionFront) => {
    const dataSent: ICreatePermission = {
      name: data.profileName,
      type: data.profileType,
      permissionPages: [
        {
          name: "Dashboard",
          funcs: [
            {
              name: "Alterar Serviços",
              hasAcess: data.dashboardAtt,
            },
          ],
          hasAcess: data.dashboard,
        },
        {
          name: "Ativos",
          funcs: [
            {
              name: "Filtrar",
              hasAcess: data.ativosFilter,
            },
          ],
          hasAcess: data.ativos,
        },
        {
          name: "Pentest",
          funcs: [
            {
              name: "Criar Pentest",
              hasAcess: data.pentestCreate,
            },
            {
              name: "Editar",
              hasAcess: data.pentestEdit,
            },
            {
              name: "Enviar",
              hasAcess: data.pentestSend,
            },
          ],
          hasAcess: data.pentest,
        },
        {
          name: "Issues",
          funcs: [
            {
              name: "Filtrar",
              hasAcess: data.issuesFilter,
            },
            {
              name: "Exportar",
              hasAcess: data.issuesExport,
            },
            {
              name: "Classificar",
              hasAcess: data.issuesClassify,
            },
          ],
          hasAcess: data.issues,
        },
        {
          name: "Questionários",
          funcs: [
            {
              name: "Criar",
              hasAcess: data.questionarioCreate,
            },
            {
              name: "Compartilhar",
              hasAcess: data.questionarioShare,
            },
          ],
          hasAcess: data.questionario,
        },
        {
          name: "Ambientes",
          funcs: [
            {
              name: "Criar Ambientes",
              hasAcess: data.ambienteCreate,
            },
            {
              name: "Editar",
              hasAcess: data.ambienteEdit,
            },
            {
              name: "Excluir",
              hasAcess: data.ambienteDelete,
            },
          ],
          hasAcess: data.ambiente,
        },
      ],
    };

    try {
      const res = await api.post(`${endpoint}`, dataSent);
      return res.data as IPermission;
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
  Put: async (id: number, data?: IPermission) => {
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

export default PermissionService;
