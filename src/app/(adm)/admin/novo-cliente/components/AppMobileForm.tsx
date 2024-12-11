import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanyMobileAppAssetsService from "@/services/CompanyMobileAppAssetsService";
import { ICompanyMobileAppAssets } from "@/types/ICompanyMobileAppAssets";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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

const AppMobileForm = ({
  companyId,
  editId,
}: {
  companyId: number;
  editId: string;
}) => {
  const navigator = useRouter();
  const [appMobile, setAppMobile] = useState(1);
  const [mobileApp, setMobileApp] = useState<ICompanyMobileAppAssets[]>([]);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AppMobileValue>({
    resolver: zodResolver(appMobileSchema),
  });

  const onSubmit = (data: AppMobileValue) => {
    if (editId && editId !== "") {
      try {
        data.mobiles.forEach(async (mobile) => {
          await CompanyMobileAppAssetsService.Put(
            {
              companyId: Number(editId),
              storeAppUrl: mobile.linkApp,
              appName: mobile.appName,
              store: Number(mobile.operationalSystem),
            },
            Number(editId)
          );
        });
        toast.success("Empresa atualizada com sucesso");
        navigator.push("/admin");
      } catch (error) {
        toast.error("Erro ao atualizar endereços IP");
        console.log(error);
      }
    } else {
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
    }
  };

  const fetchMobileApps = async () => {
    try {
      const res = await CompanyMobileAppAssetsService.GetByCompanyId(
        Number(editId)
      );
      setMobileApp(res);
    } catch (erro) {
      console.log(erro);
    }
  };

  useMemo(() => {
    if (editId && editId !== "") {
      fetchMobileApps();
    }
  }, [editId]);

  useMemo(() => {
    if (mobileApp) {
      reset({
        mobiles: mobileApp.map(
          (app) =>
            ({
              appName: app.appName,
              linkApp: app.storeAppUrl,
              operationalSystem: app.store.toString(),
            } as AppMobileValue["mobiles"][0])
        ),
      });
      setAppMobile(mobileApp.length);
    }
  }, [mobileApp]);

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
              Sistema operacional <span className="text-red-500 ">*</span>
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
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Button
          type="button"
          onClick={() => {
            setAppMobile(appMobile + 1);
          }}
          variant={"ghost"}
          className="text-[#1F4C85] font-semibold justify-start"
        >
          <Plus />
          Adicionar outro aplicativo
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (appMobile > 0) setAppMobile(appMobile - 1);
          }}
          variant="ghost"
          className="text-red-500 flex items-center gap-2"
        >
          <Minus />
          Remover aplicativo
        </Button>
      </div>
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
