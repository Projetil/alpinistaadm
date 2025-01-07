import React, { useState } from "react";
import Container from "../Container";
import Header from "../Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import UserService from "@/services/UserService";
import { LoadingSpinner } from "@/components/default/Spinner";

const resetPasswordSchema = z.object({
  email: z.string().email("Por favor, insira um email válido."),
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

export default function ResetPassword({
  onClose,
  nextPage,
}: {
  onClose: () => void;
  nextPage: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      setLoading(true);
      await UserService.PasswordRecovery(data.email ?? "");
      onClose();
      nextPage();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao enviar código de recuperação");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <Header title="Recuperar Senha" onClose={onClose} />
      <p className="p-4">
        Para recuperar sua senha, digite o e-mail cadastrado.
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
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/*  <div className="w-full flex justify-between items-center">
          <div className="w-full h-[2px] bg-gray-100" />
          <p className="mx-2 text-gray-200">Ou</p>
          <div className="w-full h-[2px] bg-gray-100" />
        </div> */}

        {/* <div className="space-y-1">
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
        </div> */}

        <Button type="submit" className="w-full bg-[#3088EE]">
          {loading ? <LoadingSpinner /> : "Enviar"}
        </Button>
      </form>
    </Container>
  );
}
