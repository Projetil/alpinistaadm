import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { ICompanyDomainAssets } from "@/types/ICompanyDomainAssets";
import CompanyDomainAssetsService from "@/services/CompanyDomainService";
import CompanyService from "@/services/CompanyService";

const domainSchema = z.object({
  domains: z.array(
    z
      .string({ message: "Apenas domínio root" })
      .min(3, "Apenas domínio root")
      .max(300, "Apenas domínio root")
  ),
});

type DomainFormValues = z.infer<typeof domainSchema>;

const DominiosForm = ({
  addStep,
  removeStep,
  companyId,
  editId,
}: {
  addStep: () => void;
  removeStep: () => void;
  editId: string;
  companyId: number;
}) => {
  const navigation = useRouter();
  const [domainSize, setDomainSize] = useState(1);
  const [domainsData, setDomainsData] = useState<ICompanyDomainAssets[]>();
  const {
    control,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<DomainFormValues>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domains: [""],
    },
  });

  const onInactive = async () => {
    try {
      await CompanyService.PutStatus(companyId);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: DomainFormValues) => {
    if (editId && editId !== "") {
      try {
        data.domains.forEach(async (domain, index) => {
          if (domainsData?.[index]) {
            await CompanyDomainAssetsService.Put(
              {
                companyId: Number(editId),
                domain: domain,
              },
              Number(domainsData?.[index].id)
            );
          } else {
            await CompanyDomainAssetsService.Post({
              companyId: Number(editId),
              domain: domain,
            });
          }
        });
        addStep();
      } catch (error) {
        toast.error("Erro ao editar domínios");
        console.log(error);
      }
    } else {
      try {
        data.domains.forEach(async (domain) => {
          const res = await CompanyDomainAssetsService.Post({
            companyId: companyId,
            domain: domain,
          });
          if (!res) throw new Error("Erro ao adicionar domínios");
        });
        toast.success("Domínios adicionados com sucesso");
        addStep();
      } catch (error) {
        toast.error("Erro ao adicionar domínios");
        console.log(error);
      }
    }
  };

  const onDelete = async (id?: string) => {
    try {
      await CompanyDomainAssetsService.Delete(Number(id));
      fetchDomains();
    } catch (error) {
      toast.error("Erro ao deletar domínio");
      console.log(error);
    }
  };

  const fetchDomains = async () => {
    try {
      const res = await CompanyDomainAssetsService.GetByCompanyId(
        Number(editId)
      );
      setDomainsData(res);
    } catch (erro) {
      console.log(erro);
    }
  };

  useMemo(() => {
    if (editId && editId !== "") {
      fetchDomains();
    }
  }, [editId]);

  useMemo(() => {
    if (domainsData) {
      reset({
        domains: domainsData.map((domain) => domain.domain),
      });
      setDomainSize(domainsData.length);
    }
  }, [domainsData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 gap-3"
    >
      {[...Array(domainSize)].map((field, index) => {
        return (
          <div className="text-[#050506] w-full" key={index}>
            <div className="flex justify-between">
              <Label className="font-semibold text-lg">
                Domínio <span className="text-red-500 ">*</span>
              </Label>
              <Button
                type="button"
                onClick={() => {
                  if (!editId) {
                    if (domainSize > 0) {
                      setDomainSize(domainSize - 1);
                      const updatedDomains = getValues("domains").filter(
                        (_, idx) => idx !== index
                      );
                      setValue("domains", updatedDomains);
                    }
                  } else {
                    if (domainSize > 0) {
                      const updatedDomains = getValues("domains").filter(
                        (_, idx) => idx !== index
                      );
                      setValue("domains", updatedDomains);
                      setDomainSize(domainSize - 1);
                      if (domainsData?.[index].id) {
                        onDelete(domainsData?.[index].id);
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
            <Controller
              name={`domains.${index}`}
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="projetil.com"
                  type="text"
                  className="font-normal border-[#D7D7DA] bg-transparent mt-2"
                />
              )}
            />
            {errors.domains && errors.domains[index] && (
              <p className="text-red-500">{errors.domains[index]?.message}</p>
            )}
          </div>
        );
      })}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Button
          type="button"
          onClick={() => {
            setDomainSize(domainSize + 1);
          }}
          variant={"ghost"}
          className="text-[#1F4C85] font-semibold justify-start"
        >
          <Plus />
          Adicionar outro domínio
        </Button>
      </div>
      <div className="flex w-full gap-4 justify-end items-center mt-2">
        <Button
          onClick={async () => {
            if (!editId) {
              await onInactive();
              navigation.push("/admin");
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

export default DominiosForm;
