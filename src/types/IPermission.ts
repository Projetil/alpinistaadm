export interface IPermission {
  id: number;
  name: string;
  type: number;
  permissionPages: IPermissionPage[];
}

export interface IPaginatedPermission {
  items: IPermission[];
  totalItems: number;
}

export interface IPagedPermission {
  totalItems: number;
  items: IPermission[];
}

export interface IPermissionPage {
  id: number;
  profileId: number;
  name: string;
  funcs: IFunc[];
  hasAcess: boolean;
}

export interface IFunc {
  id: number;
  profilePermissionPagesId: number;
  name: string;
  hasAcess: boolean;
}

export interface ICreatePermission {
  name: string;
  type: number;
  permissionPages: ICreatePermissionPage[];
}

export interface ICreatePermissionPage {
  name: string;
  funcs: ICreateFunc[];
  hasAcess: boolean;
}

export interface ICreateFunc {
  name: string;
  hasAcess: boolean;
}

export interface ICreatePermissionFront {
  profileName: string;
  profileType: number;
  dashboard: boolean;
  dashboardAtt: boolean;
  ativos: boolean;
  ativosFilter: boolean;
  ativosEdit: boolean;
  pentest: boolean;
  pentestCreate: boolean;
  pentestEdit: boolean;
  pentestSend: boolean;
  issues: boolean;
  issuesFilter: boolean;
  issuesExport: boolean;
  issuesClassify: boolean;
  questionario: boolean;
  questionarioCreate: boolean;
  questionarioShare: boolean;
  ambiente: boolean;
  ambienteCreate: boolean;
  ambienteEdit: boolean;
  ambienteDelete: boolean;
}
