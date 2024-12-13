"use client";

import Modal from "@/components/default/Modal";
import { LoadingSpinner } from "@/components/default/Spinner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import PermissionService from "@/services/PermissionService";
import { IPermission } from "@/types/IPermission";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schemaCompany = z.object({
  profileName: z
    .string()
    .min(3, "Nome do perfil é obrigatório")
    .max(300, "Nome do perfil deve ter no máximo 300 caracteres"),
  dashboard: z.preprocess((val) => val === "true", z.boolean()),
  dashboardAtt: z.preprocess((val) => val === "true", z.boolean()),
  ativos: z.preprocess((val) => val === "true", z.boolean()),
  ativosFilter: z.preprocess((val) => val === "true", z.boolean()),
  pentest: z.preprocess((val) => val === "true", z.boolean()),
  pentestCreate: z.preprocess((val) => val === "true", z.boolean()),
  pentestEdit: z.preprocess((val) => val === "true", z.boolean()),
  pentestSend: z.preprocess((val) => val === "true", z.boolean()),
  issues: z.preprocess((val) => val === "true", z.boolean()),
  issuesFilter: z.preprocess((val) => val === "true", z.boolean()),
  issuesExport: z.preprocess((val) => val === "true", z.boolean()),
  issuesClassify: z.preprocess((val) => val === "true", z.boolean()),
  questionario: z.preprocess((val) => val === "true", z.boolean()),
  questionarioCreate: z.preprocess((val) => val === "true", z.boolean()),
  questionarioShare: z.preprocess((val) => val === "true", z.boolean()),
  ambiente: z.preprocess((val) => val === "true", z.boolean()),
  ambienteCreate: z.preprocess((val) => val === "true", z.boolean()),
  ambienteEdit: z.preprocess((val) => val === "true", z.boolean()),
  ambienteDelete: z.preprocess((val) => val === "true", z.boolean()),
});

export type DataCompany = z.infer<typeof schemaCompany>;

const ModalCreatePerms = ({
  open,
  setOpen,
  permissionId,
  setPermissionId,
}: {
  open: boolean;
  setOpen: () => void;
  permissionId?: number;
  setPermissionId: (x: number) => void;
}) => {
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState<IPermission>();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<DataCompany>({
    resolver: zodResolver(schemaCompany),
  });
  const dashboardField = watch("dashboard");
  const dashboardAttField = watch("dashboardAtt");
  const ativosField = watch("ativos");
  const ativosFilterField = watch("ativosFilter");
  const pentestField = watch("pentest");
  const pentestCreateField = watch("pentestCreate");
  const pentestEditField = watch("pentestEdit");
  const pentestSendField = watch("pentestSend");
  const issuesField = watch("issues");
  const issuesFilterField = watch("issuesFilter");
  const issuesExportField = watch("issuesExport");
  const issuesClassifyField = watch("issuesClassify");
  const questionarioField = watch("questionario");
  const questionarioCreateField = watch("questionarioCreate");
  const questionarioShareField = watch("questionarioShare");
  const ambienteField = watch("ambiente");
  const ambienteCreateField = watch("ambienteCreate");
  const ambienteEditField = watch("ambienteEdit");
  const ambienteDeleteField = watch("ambienteDelete");

  const onSubmit = async (data: DataCompany) => {
    try {
      setLoading(true);
      if (permissionId && permissionId > 0) {
        const newPermission: IPermission = {
          id: permissionId,
          name: data.profileName,
          type: 1,
          permissionPages: [
            {
              id:
                permission?.permissionPages?.find((x) => x.name == "Dashboard")
                  ?.id || 0,
              name: "Dashboard",
              profileId:
                permission?.permissionPages?.find((x) => x.name == "Dashboard")
                  ?.profileId || 0,
              funcs: [
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Dashboard")
                      ?.funcs?.find((x) => x.name == "Alterar Serviços")?.id ||
                    0,
                  name: "Alterar Serviços",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Dashboard"
                    )?.id || 0,
                  hasAcess: dashboardAttField,
                },
              ],
              hasAcess: dashboardField,
            },
            {
              id:
                permission?.permissionPages?.find((x) => x.name == "Ativos")
                  ?.id || 0,
              name: "Ativos",
              profileId:
                permission?.permissionPages?.find((x) => x.name == "Ativos")
                  ?.profileId || 0,
              funcs: [
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Ativos")
                      ?.funcs?.find((x) => x.name == "Filtrar")?.id || 0,
                  name: "Filtrar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find((x) => x.name == "Ativos")
                      ?.id || 0,
                  hasAcess: ativosFilterField,
                },
              ],
              hasAcess: ativosField,
            },
            {
              id:
                permission?.permissionPages?.find((x) => x.name == "Pentest")
                  ?.id || 0,
              name: "Pentest",
              profileId:
                permission?.permissionPages?.find((x) => x.name == "Pentest")
                  ?.profileId || 0,
              funcs: [
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Pentest")
                      ?.funcs?.find((x) => x.name == "Criar Pentest")?.id || 0,
                  name: "Criar Pentest",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Pentest"
                    )?.id || 0,
                  hasAcess: pentestCreateField,
                },
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Pentest")
                      ?.funcs?.find((x) => x.name == "Editar")?.id || 0,
                  name: "Editar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Pentest"
                    )?.id || 0,
                  hasAcess: pentestEditField,
                },
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Pentest")
                      ?.funcs?.find((x) => x.name == "Enviar")?.id || 0,
                  name: "Enviar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Pentest"
                    )?.id || 0,
                  hasAcess: pentestSendField,
                },
              ],
              hasAcess: pentestField,
            },
            {
              id:
                permission?.permissionPages?.find((x) => x.name == "Issues")
                  ?.id || 0,
              name: "Issues",
              profileId:
                permission?.permissionPages?.find((x) => x.name == "Issues")
                  ?.profileId || 0,
              funcs: [
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Issues")
                      ?.funcs?.find((x) => x.name == "Filtrar")?.id || 0,
                  name: "Filtrar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find((x) => x.name == "Issues")
                      ?.id || 0,
                  hasAcess: issuesFilterField,
                },
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Issues")
                      ?.funcs?.find((x) => x.name == "Exportar")?.id || 0,
                  name: "Exportar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find((x) => x.name == "Issues")
                      ?.id || 0,
                  hasAcess: issuesExportField,
                },
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Issues")
                      ?.funcs?.find((x) => x.name == "Classificar")?.id || 0,
                  name: "Classificar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find((x) => x.name == "Issues")
                      ?.id || 0,
                  hasAcess: issuesClassifyField,
                },
              ],
              hasAcess: issuesField,
            },
            {
              id:
                permission?.permissionPages?.find(
                  (x) => x.name == "Questionários"
                )?.id || 0,
              name: "Questionários",
              profileId:
                permission?.permissionPages?.find(
                  (x) => x.name == "Questionários"
                )?.profileId || 0,
              funcs: [
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Questionários")
                      ?.funcs?.find((x) => x.name == "Criar")?.id || 0,
                  name: "Criar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Questionários"
                    )?.id || 0,
                  hasAcess: questionarioCreateField,
                },
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Questionários")
                      ?.funcs?.find((x) => x.name == "Compartilhar")?.id || 0,
                  name: "Compartilhar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Questionários"
                    )?.id || 0,
                  hasAcess: questionarioShareField,
                },
              ],
              hasAcess: questionarioField,
            },
            {
              id:
                permission?.permissionPages?.find((x) => x.name == "Ambientes")
                  ?.id || 0,
              name: "Ambientes",
              profileId:
                permission?.permissionPages?.find((x) => x.name == "Ambientes")
                  ?.profileId || 0,
              funcs: [
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Ambientes")
                      ?.funcs?.find((x) => x.name == "Criar Ambientes")?.id ||
                    0,
                  name: "Criar Ambientes",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Ambientes"
                    )?.id || 0,
                  hasAcess: ambienteCreateField,
                },
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Ambientes")
                      ?.funcs?.find((x) => x.name == "Editar")?.id || 0,
                  name: "Editar",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Ambientes"
                    )?.id || 0,
                  hasAcess: ambienteEditField,
                },
                {
                  id:
                    permission?.permissionPages
                      ?.find((x) => x.name == "Ambientes")
                      ?.funcs?.find((x) => x.name == "Excluir")?.id || 0,
                  name: "Excluir",
                  profilePermissionPagesId:
                    permission?.permissionPages?.find(
                      (x) => x.name == "Ambientes"
                    )?.id || 0,
                  hasAcess: ambienteDeleteField,
                },
              ],
              hasAcess: ambienteField,
            },
          ],
        };

        await PermissionService.Put(permissionId, newPermission);
        toast.success("Empresa atualizada com sucesso");
        setOpen();
      } else {
        await PermissionService.Post({
          profileName: data.profileName,
          profileType: 1,
          dashboard: dashboardField,
          dashboardAtt: dashboardAttField,
          ativos: ativosField,
          ativosFilter: ativosFilterField,
          pentest: pentestField,
          pentestCreate: pentestCreateField,
          pentestEdit: pentestEditField,
          pentestSend: pentestSendField,
          issues: issuesField,
          issuesFilter: issuesFilterField,
          issuesExport: issuesExportField,
          issuesClassify: issuesClassifyField,
          questionario: questionarioField,
          questionarioCreate: questionarioCreateField,
          questionarioShare: questionarioShareField,
          ambiente: ambienteField,
          ambienteCreate: ambienteCreateField,
          ambienteEdit: ambienteEditField,
          ambienteDelete: ambienteDeleteField,
        });
        toast.success("Empresa cadastrada com sucesso");
        setOpen();
      }
    } catch (err) {
      toast.error("Erro ao cadastrar empresa");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPermission = async () => {
    try {
      const res = await PermissionService.GetById(permissionId || 0);
      setPermission(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!open) {
      setPermissionId(0);
      reset({
        dashboard: false,
        dashboardAtt: false,
        ativos: false,
        ativosFilter: false,
        pentest: false,
        pentestCreate: false,
        pentestEdit: false,
        pentestSend: false,
        issues: false,
        issuesFilter: false,
        issuesExport: false,
        issuesClassify: false,
        questionario: false,
        questionarioCreate: false,
        questionarioShare: false,
        ambiente: false,
        ambienteCreate: false,
        ambienteEdit: false,
        ambienteDelete: false,
      });
    }
  }, [open]);

  useMemo(() => {
    if (permissionId && permissionId > 0) {
      fetchPermission();
    }
  }, [permissionId]);

  useMemo(() => {
    if (permission) {
      reset({
        profileName: permission.name,
      });
      setValue(
        "dashboard",
        permission.permissionPages.find((x) => x.name == "Dashboard")
          ?.hasAcess || false
      );
      setValue(
        "dashboardAtt",
        permission.permissionPages
          .find((x) => x.name == "Dashboard")
          ?.funcs.find((x) => x.name == "Alterar Serviços")?.hasAcess || false
      );
      setValue(
        "ativos",
        permission.permissionPages.find((x) => x.name == "Ativos")?.hasAcess ||
          false
      );
      setValue(
        "ativosFilter",
        permission.permissionPages
          .find((x) => x.name == "Ativos")
          ?.funcs.find((x) => x.name == "Filtrar")?.hasAcess || false
      );
      setValue(
        "pentest",
        permission.permissionPages.find((x) => x.name == "Pentest")?.hasAcess ||
          false
      );
      setValue(
        "pentestCreate",
        permission.permissionPages
          .find((x) => x.name == "Pentest")
          ?.funcs.find((x) => x.name == "Criar Pentest")?.hasAcess || false
      );
      setValue(
        "pentestEdit",
        permission.permissionPages
          .find((x) => x.name == "Pentest")
          ?.funcs.find((x) => x.name == "Editar")?.hasAcess || false
      );
      setValue(
        "pentestSend",
        permission.permissionPages
          .find((x) => x.name == "Pentest")
          ?.funcs.find((x) => x.name == "Enviar")?.hasAcess || false
      );
      setValue(
        "issues",
        permission.permissionPages.find((x) => x.name == "Issues")?.hasAcess ||
          false
      );
      setValue(
        "issuesFilter",
        permission.permissionPages
          .find((x) => x.name == "Issues")
          ?.funcs.find((x) => x.name == "Filtrar")?.hasAcess || false
      );
      setValue(
        "issuesExport",
        permission.permissionPages
          .find((x) => x.name == "Issues")
          ?.funcs.find((x) => x.name == "Exportar")?.hasAcess || false
      );
      setValue(
        "issuesClassify",
        permission.permissionPages
          .find((x) => x.name == "Issues")
          ?.funcs.find((x) => x.name == "Classificar")?.hasAcess || false
      );
      setValue(
        "questionario",
        permission.permissionPages.find((x) => x.name == "Questionários")
          ?.hasAcess || false
      );
      setValue(
        "questionarioCreate",
        permission.permissionPages
          .find((x) => x.name == "Questionários")
          ?.funcs.find((x) => x.name == "Criar")?.hasAcess || false
      );
      setValue(
        "questionarioShare",
        permission.permissionPages
          .find((x) => x.name == "Questionários")
          ?.funcs.find((x) => x.name == "Compartilhar")?.hasAcess || false
      );
      setValue(
        "ambiente",
        permission.permissionPages.find((x) => x.name == "Ambientes")
          ?.hasAcess || false
      );
      setValue(
        "ambienteCreate",
        permission.permissionPages
          .find((x) => x.name == "Ambientes")
          ?.funcs.find((x) => x.name == "Criar Ambientes")?.hasAcess || false
      );
      setValue(
        "ambienteEdit",
        permission.permissionPages
          .find((x) => x.name == "Ambientes")
          ?.funcs.find((x) => x.name == "Editar")?.hasAcess || false
      );
      setValue(
        "ambienteDelete",
        permission.permissionPages
          .find((x) => x.name == "Ambientes")
          ?.funcs.find((x) => x.name == "Excluir")?.hasAcess || false
      );
    }
  }, [permission]);

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <div className="bg-white py-3 px-6 rounded-lg flex flex-col gap-10 overflow-y-auto max-h-screen h-full md:h-auto md:w-auto w-full max-w-[1000px]">
        <div onClick={setOpen} className="flex w-full justify-start">
          <h3 className="font-semibold text-[#093970] text-3xl">Novo Perfil</h3>
        </div>
        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="text-[#050506] w-full">
              <Label className="font-semibold text-base">
                Nome do perfil <span className="text-red-500 ">*</span>
              </Label>
              <Input
                placeholder="Nome do perfil"
                type="text"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("profileName")}
              />
              {errors.profileName && (
                <span className="text-red-500">
                  {errors.profileName.message}
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div
              className={`text-[#050506] w-full flex flex-col p-2 bg-[#F8F7F9] rounded-lg border border-[#E6E6E8] min-h-[200px] ${
                !dashboardField ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <Label htmlFor="dashboard" className="font-semibold text-base">
                  Dashboard
                </Label>
                <Switch
                  checked={dashboardField}
                  {...register("dashboard")}
                  onClick={() => {
                    setValue("dashboard", !dashboardField);
                    if (!dashboardField) {
                      setValue("dashboardAtt", true);
                    }
                    if (dashboardField) {
                      setValue("dashboardAtt", false);
                    }
                  }}
                  id="dashboard"
                />
              </div>
              <div className="flex mt-2 items-center space-x-2">
                <Checkbox
                  checked={dashboardAttField}
                  onClick={() => setValue("dashboardAtt", !dashboardAttField)}
                  disabled={!dashboardField}
                  {...register("dashboardAtt")}
                  id="service-dashboard"
                />
                <Label className="text-[#636267]" htmlFor="service-dashboard">
                  Atualizar serviços
                </Label>
              </div>
            </div>

            <div
              className={`text-[#050506] w-full flex flex-col p-2 bg-[#F8F7F9] rounded-lg border border-[#E6E6E8] min-h-[200px] ${
                !ativosField ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <Label htmlFor="ativos" className="font-semibold text-base">
                  Ativos
                </Label>
                <Switch
                  checked={ativosField}
                  {...register("ativos")}
                  onClick={() => {
                    setValue("ativos", !ativosField);
                    if (!ativosField) {
                      setValue("ativosFilter", true);
                    }
                    if (ativosField) {
                      setValue("ativosFilter", false);
                    }
                  }}
                  id="ativos"
                />
              </div>
              <div className="flex mt-2 items-center space-x-2">
                <Checkbox
                  checked={ativosFilterField}
                  onClick={() => setValue("ativosFilter", !ativosFilterField)}
                  disabled={!ativosField}
                  {...register("ativos")}
                  id="filtrar-ativos"
                />
                <Label className="text-[#636267]" htmlFor="filtrar-ativos">
                  Filtrar
                </Label>
              </div>
            </div>
            <div
              className={`text-[#050506] w-full flex flex-col p-2 bg-[#F8F7F9] rounded-lg border border-[#E6E6E8] min-h-[200px] ${
                !pentestField ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <Label htmlFor="pentest" className="font-semibold text-base">
                  Pentest
                </Label>
                <Switch
                  checked={pentestField}
                  {...register("pentest")}
                  onClick={() => {
                    setValue("pentest", !pentestField);
                    if (!pentestField) {
                      setValue("pentestCreate", true);
                      setValue("pentestEdit", true);
                      setValue("pentestSend", true);
                    }
                    if (pentestField) {
                      setValue("pentestCreate", false);
                      setValue("pentestEdit", false);
                      setValue("pentestSend", false);
                    }
                  }}
                  id="pentest"
                />
              </div>
              <div className="flex gap-3 mt-2 items-start flex-col">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={pentestCreateField}
                    onClick={() =>
                      setValue("pentestCreate", !pentestCreateField)
                    }
                    disabled={!pentestField}
                    {...register("pentestCreate")}
                    id="criar-pentest"
                  />
                  <Label className="text-[#636267]" htmlFor="criar-pentest">
                    Criar Pentest
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={pentestEditField}
                    onClick={() => setValue("pentestEdit", !pentestEditField)}
                    disabled={!pentestField}
                    {...register("pentestEdit")}
                    id="editar-pentest"
                  />
                  <Label className="text-[#636267]" htmlFor="editar-pentest">
                    Editar
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={pentestSendField}
                    onClick={() => setValue("pentestSend", !pentestSendField)}
                    disabled={!pentestField}
                    {...register("pentestSend")}
                    id="enviar-pentest"
                  />
                  <Label className="text-[#636267]" htmlFor="enviar-pentest">
                    Enviar
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div
              className={`text-[#050506] w-full flex flex-col p-2 bg-[#F8F7F9] rounded-lg border border-[#E6E6E8] min-h-[200px] ${
                !issuesField ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <Label htmlFor="issues" className="font-semibold text-base">
                  Issues/Riscos
                </Label>
                <Switch
                  checked={issuesField}
                  {...register("issues")}
                  onClick={() => {
                    setValue("issues", !issuesField);
                    if (!issuesField) {
                      setValue("issuesFilter", true);
                      setValue("issuesExport", true);
                      setValue("issuesClassify", true);
                    }
                    if (issuesField) {
                      setValue("issuesFilter", false);
                      setValue("issuesExport", false);
                      setValue("issuesClassify", false);
                    }
                  }}
                  id="issues"
                />
              </div>
              <div className="flex gap-3 mt-2 items-start flex-col">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={issuesFilterField}
                    onClick={() => setValue("issuesFilter", !issuesFilterField)}
                    disabled={!issuesField}
                    {...register("issuesFilter")}
                    id="filtrar-issues"
                  />
                  <Label className="text-[#636267]" htmlFor="filtrar-issues">
                    Filtrar
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={issuesExportField}
                    onClick={() => setValue("issuesExport", !issuesExportField)}
                    disabled={!issuesField}
                    {...register("issuesExport")}
                    id="exportar-issues"
                  />
                  <Label className="text-[#636267]" htmlFor="exportar-issues">
                    Exportar
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={issuesClassifyField}
                    onClick={() =>
                      setValue("issuesClassify", !issuesClassifyField)
                    }
                    disabled={!issuesField}
                    {...register("issuesClassify")}
                    id="classificar-issues"
                  />
                  <Label
                    className="text-[#636267]"
                    htmlFor="classificar-issues"
                  >
                    Classificar
                  </Label>
                </div>
              </div>
            </div>

            <div
              className={`text-[#050506] w-full flex flex-col p-2 bg-[#F8F7F9] rounded-lg border border-[#E6E6E8] min-h-[200px] ${
                !questionarioField ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="questionario"
                  className="font-semibold text-base"
                >
                  Questionários
                </Label>
                <Switch
                  checked={questionarioField}
                  {...register("questionario")}
                  onClick={() => {
                    setValue("questionario", !questionarioField);
                    if (!questionarioField) {
                      setValue("questionarioCreate", true);
                      setValue("questionarioShare", true);
                    }
                    if (questionarioField) {
                      setValue("questionarioCreate", false);
                      setValue("questionarioShare", false);
                    }
                  }}
                  id="questionario"
                />
              </div>
              <div className="flex gap-3 mt-2 items-start flex-col">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={questionarioCreateField}
                    onClick={() =>
                      setValue("questionarioCreate", !questionarioCreateField)
                    }
                    disabled={!questionarioField}
                    {...register("questionarioCreate")}
                    id="criar-questionario"
                  />
                  <Label
                    className="text-[#636267]"
                    htmlFor="criar-questionario"
                  >
                    Criar
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={questionarioShareField}
                    onClick={() =>
                      setValue("questionarioShare", !questionarioShareField)
                    }
                    disabled={!questionarioField}
                    {...register("questionarioShare")}
                    id="compartilhar-questionario"
                  />
                  <Label
                    className="text-[#636267]"
                    htmlFor="compartilhar-questionario"
                  >
                    Compartilhar
                  </Label>
                </div>
              </div>
            </div>

            <div
              className={`text-[#050506] w-full flex flex-col p-2 bg-[#F8F7F9] rounded-lg border border-[#E6E6E8] min-h-[200px] ${
                !ambienteField ? "opacity-50" : ""
              }`}
            >
              <div className="flex justify-between items-center">
                <Label htmlFor="ambiente" className="font-semibold text-base">
                  Ambientes (Detalhamento)
                </Label>
                <Switch
                  checked={ambienteField}
                  {...register("ambiente")}
                  onClick={() => {
                    setValue("ambiente", !ambienteField);
                    if (ambienteField) {
                      setValue("ambienteCreate", false);
                      setValue("ambienteEdit", false);
                      setValue("ambienteDelete", false);
                    }
                    if (!ambienteField) {
                      setValue("ambienteCreate", true);
                      setValue("ambienteEdit", true);
                      setValue("ambienteDelete", true);
                    }
                  }}
                  id="ambiente"
                />
              </div>
              <div className="flex gap-3 mt-2 items-start flex-col">
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={ambienteCreateField}
                    onClick={() =>
                      setValue("ambienteCreate", !ambienteCreateField)
                    }
                    disabled={!ambienteField}
                    {...register("ambienteCreate")}
                    id="criar-ambiente"
                  />
                  <Label className="text-[#636267]" htmlFor="criar-ambiente">
                    Criar Ambientes
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={ambienteEditField}
                    onClick={() => setValue("ambienteEdit", !ambienteEditField)}
                    disabled={!ambienteField}
                    {...register("ambienteEdit")}
                    id="editar-ambiente"
                  />
                  <Label className="text-[#636267]" htmlFor="editar-ambiente">
                    Editar
                  </Label>
                </div>
                <div className="flex gap-2 items-center">
                  <Checkbox
                    checked={ambienteDeleteField}
                    onClick={() =>
                      setValue("ambienteDelete", !ambienteDeleteField)
                    }
                    disabled={!ambienteField}
                    {...register("ambienteDelete")}
                    id="excluir-ambiente"
                  />
                  <Label className="text-[#636267]" htmlFor="excluir-ambiente">
                    Excluir
                  </Label>
                </div>
              </div>
            </div>
          </div>

          <div className="flex w-full gap-4 justify-end items-center mt-2">
            <Button
              onClick={() => setOpen()}
              variant={"outline"}
              className="text-[#1A69C4] border-[#5CA7FF] font-semibold"
              type="button"
            >
              Cancelar
            </Button>
            <Button
              className="text-white bg-[#3088EE] font-semibold"
              type="submit"
              disabled={loading}
            >
              {loading ? <LoadingSpinner /> : "Salvar"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreatePerms;
