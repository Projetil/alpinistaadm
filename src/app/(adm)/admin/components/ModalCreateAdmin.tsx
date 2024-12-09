"use client";

import Modal from "@/components/default/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AdministratorService from "@/services/AdministratorService";
import UserService from "@/services/UserService";
import { IAdministrator } from "@/types/IAdministrator";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@radix-ui/react-label";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const schemaCompany = z.object({
  userName: z
    .string()
    .min(3, "Nome de usuário é obrigatório")
    .max(300, "Razão social deve ter no máximo 300 caracteres"),
  profileType: z.string().min(1, "Tipo de perfil é obrigatório"),
  email: z.string().email("E-mail inválido").min(3, "E-mail é obrigatório"),
  telefone: z
    .string()
    .min(3, "Telefone é obrigatório")
    .max(20, "Telefone deve ter no máximo 20 caracteres"),
  cargo: z
    .string()
    .min(3, "Cargo é obrigatório")
    .max(300, "Cargo deve ter no máximo 300 caracteres"),
  senha: z
    .string()
    .min(3, "Senha é obrigatório")
    .max(300, "Senha deve ter no máximo 300 caracteres"),
});

export type DataCompany = z.infer<typeof schemaCompany>;

const ModalCreateAdmin = ({
  open,
  setOpen,
  admId,
  setAdmId,
}: {
  open: boolean;
  setOpen: () => void;
  admId?: number;
  setAdmId: (x: number) => void;
}) => {
  const [adm, setAdm] = useState<IAdministrator>();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DataCompany>({
    resolver: zodResolver(schemaCompany),
  });

  const onSubmit = async (data: DataCompany) => {
    try {
      if (admId && admId > 0) {
        await UserService.Put(
          {
            email: data.email,
            password: data.senha,
            type: 2,
          },
          adm?.userId ?? 0
        );

        await AdministratorService.Put(
          {
            name: data.userName,
            email: data.email,
            phone: Number(data.telefone),
            position: data.cargo,
            password: data.senha,
            userId: adm?.userId ?? 0,
          },
          admId
        );
        toast.success("Administrador atualizado com sucesso");
      } else {
        const resUser = await UserService.Post({
          email: data.email,
          password: data.senha,
          type: 2,
        });

        await AdministratorService.Post({
          name: data.userName,
          email: data.email,
          phone: Number(data.telefone),
          position: data.cargo,
          password: data.senha,
          userId: resUser.id,
        });
        toast.success("Administrador criado com sucesso");
      }
      setOpen();
    } catch (err) {
      toast.error("Erro ao Administrador empresa");
      console.log(err);
    }
  };

  const fetchAdm = async () => {
    try {
      const res = await AdministratorService.GetById(admId || 0);
      setAdm(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!open) {
      setAdmId(0);
      reset({
        userName: "",
        profileType: "2",
        email: "",
        telefone: "",
        cargo: "",
        senha: "",
      });
    }
  }, [open]);

  useMemo(() => {
    if (admId && admId > 0) {
      fetchAdm();
    }
  }, [admId]);

  useMemo(() => {
    if (adm) {
      reset({
        userName: adm.name,
        profileType: "2",
        email: adm.email,
        telefone: String(adm.phone),
        cargo: adm.position,
        senha: adm.password,
      });
    }
  }, [adm]);

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <div className="bg-white py-6 px-6 rounded-lg flex flex-col gap-10 overflow-y-auto max-h-screen h-full md:h-auto md:w-auto w-full max-w-[1000px]">
        <div onClick={setOpen} className="flex w-full justify-start">
          <h3 className="font-semibold text-[#093970] text-3xl">
            {admId && admId > 0 ? "Editar" : "Novo"} Administrador
          </h3>
        </div>
        <form
          className="mt-6 w-full flex flex-col gap-5"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="text-[#050506] w-full">
              <Label className="font-semibold text-lg">
                Nome do usuário <span className="text-red-500 ">*</span>
              </Label>
              <Input
                placeholder="Nome do usuário"
                type="text"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("userName")}
              />
              {errors.userName && (
                <span className="text-red-500">{errors.userName.message}</span>
              )}
            </div>
            <div className="text-[#050506] w-full flex flex-col">
              <Label className="font-semibold text-lg">
                Tipo de perfil <span className="text-red-500 ">*</span>
              </Label>
              <select
                defaultValue={2}
                className="bg-transparent py-2 rounded-md px-2 border border-[#DFDFE2] mt-2"
                {...register("profileType")}
              >
                <option value="2">Administrador</option>
              </select>
              {errors.profileType && (
                <span className="text-red-500">
                  {errors.profileType.message}
                </span>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="text-[#050506] w-full flex flex-col">
              <Label className="font-semibold text-lg">
                E-mail <span className="text-red-500 ">*</span>
              </Label>
              <Input
                type="text"
                placeholder="E-mail"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("email")}
              />
              {errors.email && (
                <span className="text-red-500">{errors.email.message}</span>
              )}
            </div>
            <div className="text-[#050506] w-full">
              <Label className="font-semibold text-lg">
                Telefone
                <span className="text-red-500 ">*</span>
              </Label>
              <Input
                type="number"
                placeholder="Telefone"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("telefone")}
              />
              {errors.telefone && (
                <span className="text-red-500">{errors.telefone.message}</span>
              )}
            </div>
            <div className="text-[#050506] w-full">
              <Label className="font-semibold text-lg">
                Cargo
                <span className="text-red-500 ">*</span>
              </Label>
              <Input
                type="text"
                placeholder="Cargo"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("cargo")}
              />
              {errors.cargo && (
                <span className="text-red-500">{errors.cargo.message}</span>
              )}
            </div>
          </div>
          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="text-[#050506] w-full">
              <Label className="font-semibold text-lg">
                Senha de acesso <span className="text-red-500 ">*</span>
              </Label>
              <Input
                type="password"
                placeholder="Senha de acesso"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("senha")}
              />
              {errors.senha && (
                <span className="text-red-500">{errors.senha.message}</span>
              )}
            </div>
          </div>
          <div className="flex w-full gap-4 justify-end items-center mt-2">
            <Button
              variant={"outline"}
              onClick={() => setOpen()}
              className="text-[#1A69C4] border-[#5CA7FF] font-semibold"
              type="button"
            >
              Cancelar
            </Button>
            <Button
              className="text-white bg-[#3088EE] font-semibold"
              type="submit"
            >
              {admId && admId > 0 ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateAdmin;
