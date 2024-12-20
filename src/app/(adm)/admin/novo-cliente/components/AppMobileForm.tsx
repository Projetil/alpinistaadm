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
  appName: z.string().optional(),
  linkApp: z.string().optional(),
  operationalSystem: z.string().optional(),
});

export const appMobileSchema = z.object({
  mobiles: z.array(appMobile),
});

export type AppMobileValue = z.infer<typeof appMobileSchema>;

const AppMobileForm = ({
  companyId,
  removeStep,
  editId,
}: {
  companyId: number;
  editId: string;
  removeStep: () => void;
}) => {
  const navigator = useRouter();
  const [appMobile, setAppMobile] = useState<number>(1);
  const [mobileApp, setMobileApp] = useState<ICompanyMobileAppAssets[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AppMobileValue>({
    resolver: zodResolver(appMobileSchema),
    defaultValues: {
      mobiles: [{ appName: "", linkApp: "", operationalSystem: "1" }],
    },
  });

  const onSubmit = (data: AppMobileValue) => {
    if (editId && editId !== "" && mobileApp.length > 0) {
      try {
        data.mobiles.forEach(async (mobile, index) => {
          if (mobileApp?.[index]) {
            await CompanyMobileAppAssetsService.Put(
              {
                companyId: Number(editId),
                storeAppUrl: mobile.linkApp ?? "",
                appName: mobile.appName ?? "",
                store: Number(mobile.operationalSystem),
              },
              Number(mobileApp?.[index].id)
            );
          } else {
            await CompanyMobileAppAssetsService.Post({
              companyId: Number(editId),
              storeAppUrl: mobile.linkApp ?? "",
              appName: mobile.appName ?? "",
              store: Number(mobile.operationalSystem),
            });
          }
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
            companyId: companyId == 0 ? Number(editId) : companyId,
            storeAppUrl: mobile.linkApp ?? "",
            appName: mobile.appName ?? "",
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

  const onDelete = async (id?: number) => {
    try {
      await CompanyMobileAppAssetsService.Delete(Number(id));
    } catch (error) {
      toast.error("Erro ao deletar domínio");
      console.log(error);
    }
  };

  const fetchMobileApps = async () => {
    try {
      const res = await CompanyMobileAppAssetsService.GetByCompanyId(
        Number(editId)
      );
      setMobileApp(res);
      setAppMobile(res.length == 0 ? 1 : res.length);
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
    if (mobileApp.length > 0) {
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
              <div className="flex justify-between items-center">
                <Label className="font-semibold text-lg">
                  Nome do aplicativo
                </Label>
                <Button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    if (!editId) {
                      if (appMobile > 0) {
                        setAppMobile(appMobile - 1);
                        const updatedApps = getValues("mobiles").filter(
                          (_, idx) => idx !== index
                        );
                        setValue("mobiles", updatedApps);
                      }
                    } else {
                      if (appMobile > 0) {
                        setAppMobile(appMobile - 1);
                        const updatedApps = getValues("mobiles").filter(
                          (_, idx) => idx !== index
                        );
                        setValue("mobiles", updatedApps);

                        if (mobileApp?.[index].id) {
                          onDelete(mobileApp?.[index].id);
                        }
                      }
                    }
                  }}
                  variant="ghost"
                  className="text-red-500 flex items-center gap-2"
                >
                  <Minus /> Remover
                </Button>
              </div>
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
            <Label className="font-semibold text-lg">Sistema operacional</Label>
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
          onClick={(e) => {
            e.preventDefault();
            setAppMobile(appMobile + 1);
          }}
          variant={"ghost"}
          className="text-[#1F4C85] font-semibold justify-start"
        >
          <Plus />
          Adicionar outro aplicativo
        </Button>
      </div>
      <div className="flex w-full gap-4 justify-end items-center mt-2">
        <Button
          onClick={() => {
            if (!editId) {
              navigator.push("/admin");
            } else {
              removeStep();
            }
          }}
          variant={"outline"}
          className="text-[#1A69C4] border-[#5CA7FF] font-semibold"
          type="button"
        >
          Voltar
        </Button>
        <Button className="text-white bg-[#3088EE] font-semibold" type="submit">
          Avançar
        </Button>
      </div>
    </form>
  );
};

export default AppMobileForm;
