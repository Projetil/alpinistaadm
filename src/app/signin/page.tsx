"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ResetPassword from "./password-fluxo/components/pass-1/ResetPassword";
import InsertCode from "./password-fluxo/components/pass-2/InsertCode";
import NewPassword from "./password-fluxo/components/pass-3/NewPassword";
import InsertCodeLogin from "./login-fluxo/components/InsertCodeLogin";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { DataSchemaSignIn, schemaSignIn } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import UserService from "@/services/UserService";

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [resetPassword, setResetPassword] = useState(false);
  const [insertCode, setInsertCode] = useState(false);
  const [newPassword, setNewPassword] = useState(false);
  const router = useRouter();
  const [insertCodeLogin, setInsertCodeLogin] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DataSchemaSignIn>({
    resolver: zodResolver(schemaSignIn),
  });

  const onSubmit = async (data: DataSchemaSignIn) => {
    try {
      console.log(data);
      await UserService.Login(data);
      setInsertCodeLogin(true);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen justify-center h-screen overflow-hidden">
      {/* Reset Password Flow */}
      {resetPassword && (
        <ResetPassword
          onClose={() => setResetPassword(false)}
          nextPage={() => setInsertCode(true)}
        />
      )}
      {insertCode && (
        <InsertCode
          onClose={() => setInsertCode(false)}
          nextPage={() => setNewPassword(true)}
        />
      )}
      {newPassword && (
        <NewPassword
          onClose={() => setNewPassword(false)}
          nextPage={() => {}}
        />
      )}

      {/* Login Flow */}
      {insertCodeLogin && (
        <InsertCodeLogin
          onClose={() => setInsertCodeLogin(false)}
          nextPage={() => {
            router.push("/home");
          }}
        />
      )}

      <div className="flex flex-col justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24 w-full lg:w-1/2">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <h1 className="text-xl font-bold text-[#FF8041] w-48 h-auto mb-10">
              <Image
                src="/logo.png"
                alt=""
                className="w-full h-full"
                width={400}
                height={400}
              />
            </h1>
            <p className="mt-2 text-2xl text-[#1F4C85] font-bold">
              Fazer login
            </p>
          </div>

          <div className="mt-8">
            <div className="mt-6">
              <form
                className="space-y-6 text-[#050506]"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div>
                  <Label className="block font-semibold ">
                    Email <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-1">
                    <Input
                      {...register("email")}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#E0F3FF] focus:outline-none focus:ring-[#E0F3FF] sm:text-sm"
                    />
                  </div>
                  {errors.email && <p>{errors.email.message}</p>}
                </div>

                <div>
                  <Label htmlFor="password" className="block font-semibold ">
                    Senha <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-1 relative">
                    <Input
                      {...register("password")}
                      type={showPassword ? "text" : "password"}
                      className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-[#E0F3FF] focus:outline-none focus:ring-[#E0F3FF] sm:text-sm"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 text-gray-400" />
                      ) : (
                        <Eye className="h-5 w-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && <p>{errors.password.message}</p>}
                </div>
                <div>
                  <Button
                    type="submit"
                    className="flex w-full justify-center rounded-md border border-transparent bg-[#3088EE] py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-[#E0F3FF] focus:outline-none focus:ring-2 hover:text-[#050506] focus:ring-[#E0F3FF] focus:ring-offset-2"
                  >
                    Entrar
                  </Button>
                </div>
                <div>
                  <a
                    href="#"
                    className="font-semibold text-[#3088EE]"
                    onClick={() => setResetPassword(!resetPassword)}
                  >
                    Esqueci minha senha
                  </a>
                </div>
                <div className="flex gap-1">
                  <p className="text-sm text-[#636267]">Não tem conta ainda?</p>
                  <a href="#" className="font-semibold text-sm text-[#3088EE]">
                    Cadastre-se
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 items-center justify-center bg-[#E0F3FF]">
        <Image
          src="/banner.png"
          alt="Banner"
          width={500}
          height={500}
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
}
