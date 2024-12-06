import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanyMobileAppAssetsService from "@/services/CompanyMobileAppAssetsService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const appMobile = z.object({
  appName: z.string().max(200, "Nome do app deve ter no máximo 200 caracteres"),
  linkApp: z
    .string()
    .max(200, "O link da loja deve ter no máximo 200 caracteres"),
  operationalSystem: z.string(),
});

export const appMobileSchema = z.object({
  mobiles: z.array(appMobile),
});

export type AppMobileValue = z.infer<typeof appMobileSchema>;

const AppMobileForm = ({ companyId }: { companyId: number }) => {
  const navigator = useRouter();
  const [appMobile, setAppMobile] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppMobileValue>({
    resolver: zodResolver(appMobileSchema),
  });

  const onSubmit = (data: AppMobileValue) => {
    try {
      data.mobiles.forEach(async (mobile) => {
        const res = await CompanyMobileAppAssetsService.Post({
          companyId: companyId,
          storeAppUrl: mobile.linkApp,
          appName: mobile.appName,
          store: Number(mobile.operationalSystem),
        });
        if (!res) throw new Error("Erro ao adicionar endereço IP");
      });
      toast.success("Endereços IP adicionados com sucesso");
      navigator.push("/admin");
    } catch (error) {
      toast.error("Erro ao adicionar endereços IP");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-5"
    >
      {[...Array(appMobile)].map((_, index) => (
        <div key={index} className="flex flex-col gap-4">
          <div className="flex gap-4 md:flex-row flex-col items-center">
            <div className="text-[#050506] w-full">
              <Label className="font-semibold text-lg">
                Link da loja de aplicativos{" "}
                <span className="text-red-500 ">*</span>
              </Label>
              <Input
                {...register(`mobiles.${index}.linkApp`)}
                placeholder="Link da loja de aplicativos"
                type="text"
              />
              {errors.mobiles && errors.mobiles[index]?.linkApp && (
                <p className="text-red-500">
                  {errors.mobiles[index]?.linkApp?.message}
                </p>
              )}
            </div>
            <div className="text-[#050506] w-full">
              <Label className="font-semibold text-lg">
                Nome do aplicativo <span className="text-red-500 ">*</span>
              </Label>
              <Input
                placeholder="Nome do aplicativo"
                {...register(`mobiles.${index}.appName`)}
                type="text"
              />
              {errors.mobiles && errors.mobiles[index]?.appName && (
                <p className="text-red-500">
                  {errors.mobiles[index]?.appName?.message}
                </p>
              )}
            </div>
          </div>
          <div className="text-[#050506] w-full md:w-1/3 flex flex-col">
            <Label className="font-semibold text-lg">
              Status <span className="text-red-500 ">*</span>
            </Label>
            <select
              className="bg-transparent py-2 rounded-md px-2 border border-[#DFDFE2] mt-2"
              {...register(`mobiles.${index}.operationalSystem`)}
            >
              <option value="1">Apple Store</option>
              <option value="2">Google PlayStore</option>
            </select>
            {errors.mobiles && errors.mobiles[index]?.operationalSystem && (
              <p className="text-red-500">
                {errors.mobiles[index]?.operationalSystem?.message}
              </p>
            )}
          </div>
        </div>
      ))}
      <Button
        type="button"
        onClick={() => {
          setAppMobile(appMobile + 1);
        }}
        variant={"ghost"}
        className="text-[#1F4C85] font-semibold justify-start"
      >
        <Plus />
        Adicionar outro IP
      </Button>
      <div className="flex w-full gap-4 justify-end items-center mt-2">
        <Button
          onClick={() => navigator.push("/admin")}
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

export default AppMobileForm;
