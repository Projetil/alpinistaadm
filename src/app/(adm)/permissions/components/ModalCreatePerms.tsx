"use client";

import Modal from "@/components/default/Modal";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import PermissionService from "@/services/PermissionService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schemaCompany = z.object({
  profileName: z
    .string()
    .min(3, "Nome do perfil é obrigatório")
    .max(300, "Nome do perfil deve ter no máximo 300 caracteres"),
  profileType: z.string().min(1, "Tipo de perfil é obrigatório"),
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
}: {
  open: boolean;
  setOpen: () => void;
}) => {
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
    console.log(data);
    try {
      await PermissionService.Post({
        profileName: data.profileName,
        profileType: Number(data.profileType),
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
    } catch (err) {
      toast.error("Erro ao cadastrar empresa");
      console.log(err);
    }
  };

  useEffect(() => {
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
  }, [open]);

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
            <div className="text-[#050506] w-full flex flex-col">
              <Label className="font-semibold text-base">
                Tipo de perfil <span className="text-red-500 ">*</span>
              </Label>
              <select
                className="bg-transparent py-2 rounded-md px-2 border border-[#DFDFE2] mt-2"
                {...register("profileType")}
              >
                <option value="1">Comum</option>
                <option value="2">Moderador</option>
              </select>
              {errors.profileType && (
                <span className="text-red-500">
                  {errors.profileType.message}
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
                  {...register("dashboard")}
                  onClick={() => {
                    setValue("dashboard", !dashboardField);
                    setValue("dashboardAtt", false);
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
                  {...register("ativos")}
                  onClick={() => {
                    setValue("ativos", !ativosField);
                    setValue("ativosFilter", false);
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
                  {...register("pentest")}
                  onClick={() => {
                    setValue("pentest", !pentestField);
                    setValue("pentestCreate", false);
                    setValue("pentestEdit", false);
                    setValue("pentestSend", false);
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
                  {...register("issues")}
                  onClick={() => {
                    setValue("issues", !issuesField);
                    setValue("issuesFilter", false);
                    setValue("issuesExport", false);
                    setValue("issuesClassify", false);
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
                  {...register("questionario")}
                  onClick={() => {
                    setValue("questionario", !questionarioField);
                    setValue("questionarioCreate", false);
                    setValue("questionarioShare", false);
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
                  {...register("ambiente")}
                  onClick={() => {
                    setValue("ambiente", !ambienteField);
                    setValue("ambienteCreate", false);
                    setValue("ambienteEdit", false);
                    setValue("ambienteDelete", false);
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
              variant={"outline"}
              className="text-[#1A69C4] border-[#5CA7FF] font-semibold"
              type="button"
            >
              Cancelar
            </Button>
            <Button
              className="text-white bg-[#3088EE] font-semibold"
              type="submit"
            >
              Adicionar
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreatePerms;
