"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Container from "../Container";
import Header from "../Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import UserService from "@/services/UserService";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

const passwordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não são iguais.",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

export default function NewPassword({
  onClose,
  nextPage,
}: {
  onClose: () => void;
  nextPage: () => void;
}) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const { data: session } = useSession();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
  });

  const onSubmit = async (data: PasswordFormData) => {
    try {
      await UserService.PasswordRecoveryNewPassword(
        session?.user.id ?? "",
        data.password
      );

      toast.success("Senha alterada com sucesso");
      onClose();
      nextPage();
      router.push("/signin");
    } catch (error) {
      console.log(error);
      toast.error("Erro ao alterar senha");
    }
  };

  return (
    <Container>
      <Header title="Recuperar Senha" onClose={onClose} />
      <p className="text-sm text-gray-600 mb-4 mt-8">Insira sua nova senha</p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4 text-[#050506]"
      >
        <div className="flex flex-col">
          <label htmlFor="password" className="text-sm font-semibold mb-1">
            Crie uma nova senha <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        <div className="flex flex-col">
          <label htmlFor="confirmPassword" className="text-sm font-medium mb-1">
            Repita a nova senha<span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <Input
              id="confirmPassword"
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className="pr-10"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              {showConfirmPassword ? (
                <EyeOff className="h-4 w-4 text-gray-400" />
              ) : (
                <Eye className="h-4 w-4 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full mt-6 bg-[#3088EE] hover:bg-[#308DFF]"
        >
          Confirmar
        </Button>
      </form>
    </Container>
  );
}
