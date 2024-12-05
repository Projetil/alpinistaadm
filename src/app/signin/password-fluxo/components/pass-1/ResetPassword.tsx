import React from "react";
import Container from "../Container";
import Header from "../Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import UserService from "@/services/UserService";

const resetPasswordSchema = z
  .object({
    email: z
      .string()
      .email("Por favor, insira um email válido.")
      .optional()
      .or(z.literal("")),
    phone: z
      .string()
      .regex(
        /^\d{2}\s\d{1}\s\d{4}\s\d{4}$/,
        "Por favor, insira um número de telefone válido."
      )
      .optional()
      .or(z.literal("")),
  })
  .refine((data) => data.email || data.phone, {
    message: "Por favor, insira um email ou um número de telefone válido.",
    path: ["email"],
  });

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword({
  onClose,
  nextPage,
}: {
  onClose: () => void;
  nextPage: () => void;
}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      await UserService.PasswordRecovery(data.email ?? "");
      onClose();
      nextPage();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar código de recuperação");
    }
  };

  const formatPhoneNumber = (input: string) => {
    const cleaned = input.replace(/\D/g, "");
    if (cleaned.length <= 2) return cleaned;
    if (cleaned.length <= 3)
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2)}`;
    if (cleaned.length <= 7)
      return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(
        3
      )}`;
    return `${cleaned.slice(0, 2)} ${cleaned.slice(2, 3)} ${cleaned.slice(
      3,
      7
    )} ${cleaned.slice(7, 11)}`;
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setValue("phone", formattedPhone);
  };

  return (
    <Container>
      <Header title="Recuperar Senha" onClose={onClose} />
      <p className="p-4">
        Para recuperar sua senha, digite o e-mail ou telefone cadastrado.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4 p-4 text-[#40414A]"
      >
        <div className="space-y-1">
          <label className="block font-semibold">Email:</label>
          <Input
            type="email"
            {...register("email")}
            placeholder="mail.example@gmail.com"
            disabled={Boolean(errors.phone)}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full flex justify-between items-center">
          <div className="w-full h-[2px] bg-gray-100" />
          <p className="mx-2 text-gray-200">Ou</p>
          <div className="w-full h-[2px] bg-gray-100" />
        </div>

        <div className="space-y-1">
          <label className="block font-semibold">SMS:</label>
          <Input
            type="text"
            {...register("phone")}
            onChange={handlePhoneChange}
            placeholder="71 9 9999 9999"
            maxLength={14}
            disabled={Boolean(errors.email)}
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        <Button type="submit" className="w-full bg-[#3088EE]">
          Enviar
        </Button>
      </form>
    </Container>
  );
}
