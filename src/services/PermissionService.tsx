import { NotFoundError, UnexpectedError, ValidationError } from "@/errors";
import { HttpStatusCode } from "axios";
import { api } from "./api";
import {
  ICreatePermission,
  ICreatePermissionFront,
  IPermission,
} from "@/types/IPermission";

const endpoint = "/Profiles";

const PermissionService = {
  GetAll: async () => {
    try {
      const res = await api.get(`${endpoint}`);
      return res.data as IPermission[];
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
          name: "Questionário",
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
          name: "Ambiente",
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
              hasAcess: false,
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
};

export default PermissionService;
