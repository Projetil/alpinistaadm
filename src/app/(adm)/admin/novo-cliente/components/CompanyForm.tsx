"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import CompanyService from "@/services/CompanyService";

const schemaCompany = z.object({
  razaoSocial: z
    .string()
    .min(3, "Razão social é obrigatória")
    .max(300, "Razão social deve ter no máximo 300 caracteres"),
  cnpj: z
    .string()
    .min(3, "CNPJ é obrigatório")
    .max(14, "CNPJ deve ter no máximo 14 caracteres"),
  status: z.string(),
  contatoComercialNome: z
    .string()
    .min(3, "Nome do contato comercial é obrigatório")
    .max(300, "Nome do contato comercial deve ter no máximo 300 caracteres"),
  contatoComercialEmail: z
    .string()
    .email("E-mail inválido")
    .min(3, "E-mail do contato comercial é obrigatório"),
  contatoTecnicoNome: z
    .string()
    .min(3, "Nome do contato técnico é obrigatório")
    .max(300, "Nome do contato técnico deve ter no máximo 300 caracteres"),
  contatoTecnicoEmail: z
    .string()
    .email("E-mail inválido")
    .min(3, "E-mail do contato técnico é obrigatório"),
});

export type DataCompany = z.infer<typeof schemaCompany>;

const CompanyForm = ({
  addStep,
  setCompany,
}: {
  addStep: () => void;
  setCompany: (x: number) => void;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataCompany>({
    resolver: zodResolver(schemaCompany),
  });

  const onSubmit = async (data: DataCompany) => {
    try {
      const res = await CompanyService.Post({
        name: data.razaoSocial,
        cnpj: data.cnpj,
        status: Number(data.status),
        commercialContactName: data.contatoComercialNome,
        commercialContactEmail: data.contatoComercialEmail,
        technicalContactName: data.contatoTecnicoNome,
        technicalContactEmail: data.contatoTecnicoEmail,
      });
      setCompany(res.id);
      toast.success("Empresa cadastrada com sucesso");
      addStep();
    } catch (err) {
      toast.error("Erro ao cadastrar empresa");
      console.log(err);
    }
  };

  return (
    <form
      className="mt-6 w-full flex flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            Razão social <span className="text-red-500 ">*</span>
          </Label>
          <Input
            placeholder="Razão social"
            type="text"
            className="font-normal border-[#D7D7DA] bg-transparent mt-2"
            {...register("razaoSocial")}
          />
          {errors.razaoSocial && (
            <span className="text-red-500">{errors.razaoSocial.message}</span>
          )}
        </div>
        <div className="text-[#050506] w-full md:w-1/3">
          <Label className="font-semibold text-lg">
            CNPJ <span className="text-red-500 ">*</span>
          </Label>
          <Input
            placeholder="CNPJ"
            type="text"
            className="font-normal border-[#D7D7DA] bg-transparent mt-2"
            {...register("cnpj")}
          />
          {errors.cnpj && (
            <span className="text-red-500">{errors.cnpj.message}</span>
          )}
        </div>
        <div className="text-[#050506] w-full md:w-1/3 flex flex-col">
          <Label className="font-semibold text-lg">
            Status <span className="text-red-500 ">*</span>
          </Label>
          <select
            className="bg-transparent py-2 rounded-md px-2 border border-[#DFDFE2] mt-2"
            {...register("status")}
          >
            <option value="1">Ativo</option>
            <option value="2">Inativo</option>
          </select>
          {errors.status && (
            <span className="text-red-500">{errors.status.message}</span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            Nome do contato comercial <span className="text-red-500 ">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Nome do contato comercial"
            className="font-normal border-[#D7D7DA] bg-transparent mt-2"
            {...register("contatoComercialNome")}
          />
          {errors.contatoComercialNome && (
            <span className="text-red-500">
              {errors.contatoComercialNome.message}
            </span>
          )}
        </div>
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            E-mail do contato comercial <span className="text-red-500 ">*</span>
          </Label>
          <Input
            type="text"
            placeholder="E-mail do contato comercial"
            className="font-normal border-[#D7D7DA] bg-transparent mt-2"
            {...register("contatoComercialEmail")}
          />
          {errors.contatoComercialEmail && (
            <span className="text-red-500">
              {errors.contatoComercialEmail.message}
            </span>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-4 w-full">
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            Nome do contato técnico <span className="text-red-500 ">*</span>
          </Label>
          <Input
            type="text"
            placeholder="Nome do contato técnico"
            className="font-normal border-[#D7D7DA] bg-transparent mt-2"
            {...register("contatoTecnicoNome")}
          />
          {errors.contatoTecnicoNome && (
            <span className="text-red-500">
              {errors.contatoTecnicoNome.message}
            </span>
          )}
        </div>
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            E-mail do contato técnico <span className="text-red-500 ">*</span>
          </Label>
          <Input
            type="text"
            placeholder="E-mail do contato técnico"
            className="font-normal border-[#D7D7DA] bg-transparent mt-2"
            {...register("contatoTecnicoEmail")}
          />
          {errors.contatoTecnicoEmail && (
            <span className="text-red-500">
              {errors.contatoTecnicoEmail.message}
            </span>
          )}
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
        <Button className="text-white bg-[#3088EE] font-semibold" type="submit">
          Avançar
        </Button>
      </div>
    </form>
  );
};

export default CompanyForm;
