"use client";

import Modal from "@/components/default/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomerService from "@/services/CustomerService";
import PermissionService from "@/services/PermissionService";
import UserService from "@/services/UserService";
import { ICustomer } from "@/types/ICustomer";
import { IPermission } from "@/types/IPermission";
import { formatPhone } from "@/utils/formatString";
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

const ModalCreateCustomer = ({
  open,
  setOpen,
  companyId,
  customerId,
  setCustomerId,
}: {
  open: boolean;
  setOpen: () => void;
  companyId: number;
  customerId?: number;
  setCustomerId: (x: number) => void;
}) => {
  const [customer, setCustomer] = useState<ICustomer>();
  const [permission, setPermission] = useState<IPermission[]>([]);
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
      if (customerId && customerId > 0) {
        await UserService.Put(
          {
            email: data.email,
            password: data.senha,
            type: Number(data.profileType),
          },
          customer?.userId ?? 0
        );

        await CustomerService.Put(
          {
            name: data.userName,
            email: data.email,
            number: Number(data.telefone),
            position: data.cargo,
            password: data.senha,
            profileId: Number(data.profileType),
            userId: customer?.userId ?? 0,
            companyId: companyId,
          },
          customerId
        );
        toast.success("Empresa atualizada com sucesso");
      } else {
        const resUser = await UserService.Post({
          email: data.email,
          password: data.senha,
          type: Number(data.profileType),
        });

        await CustomerService.Post({
          name: data.userName,
          email: data.email,
          number: Number(data.telefone.replace(/\D/g, "")),
          position: data.cargo,
          password: data.senha,
          profileId: Number(data.profileType),
          userId: resUser.id,
          companyId: companyId,
        });
        toast.success("Empresa cadastrada com sucesso");
      }

      setOpen();
    } catch (err) {
      toast.error("Email já cadastrado");
      console.log(err);
    }
  };

  const fetchPermissions = async () => {
    try {
      const res = await PermissionService.GetAll();
      setPermission(res);
    } catch (e) {
      console.log(e);
    }
  };

  const fetchCustomer = async () => {
    try {
      const res = await CustomerService.GetById(customerId || 0);
      setCustomer(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (!open) {
      setCustomerId(0);
      reset({
        userName: "",
        profileType: "",
        email: "",
        telefone: "",
        cargo: "",
        senha: "",
      });
    }
  }, [open]);

  useMemo(() => {
    if (customerId && customerId > 0) {
      fetchCustomer();
    }
  }, [customerId]);

  useMemo(() => {
    if (customer) {
      reset({
        userName: customer.name,
        profileType: customer.profileId.toString(),
        email: customer.email,
        telefone: String(customer.number),
        cargo: customer.position,
        senha: customer.password,
      });
    }
  }, [customer]);

  useEffect(() => {
    fetchPermissions();
  }, []);

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <div className="bg-white py-6 px-6 rounded-lg flex flex-col gap-10 overflow-y-auto max-h-screen h-full md:h-auto md:w-auto w-full max-w-[1000px]">
        <div onClick={setOpen} className="flex w-full justify-start">
          <h3 className="font-semibold text-[#093970] text-3xl">
            {customerId && companyId > 0 ? "Editar" : "Novo"} usuário
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
                className="bg-transparent py-2 rounded-md px-2 border border-[#DFDFE2] mt-2"
                {...register("profileType")}
              >
                {permission.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
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
                type="text"
                placeholder="Telefone"
                className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                {...register("telefone")}
                onChange={(e) => {
                  const formattedValue = formatPhone(e.target.value);
                  e.target.value = formattedValue;
                  register("telefone").onChange(e);
                }}
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
              onClick={setOpen}
              className="text-[#1A69C4] border-[#5CA7FF] font-semibold"
              type="button"
            >
              Cancelar
            </Button>
            <Button
              className="text-white bg-[#3088EE] font-semibold"
              type="submit"
            >
              {customerId && companyId > 0 ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ModalCreateCustomer;
