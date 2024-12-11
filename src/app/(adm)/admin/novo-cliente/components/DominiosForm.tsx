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

const domainSchema = z.object({
  domains: z.array(z.string().min(1, "Campo obrigatório")),
});

type DomainFormValues = z.infer<typeof domainSchema>;

const DominiosForm = ({
  addStep,
  companyId,
  editId,
}: {
  addStep: () => void;
  editId: string;
  companyId: number;
}) => {
  const navigation = useRouter();
  const [domainSize, setDomainSize] = useState(1);
  const [domainsData, setDomainsData] = useState<ICompanyDomainAssets[]>();
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DomainFormValues>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domains: [""],
    },
  });

  const onSubmit = (data: DomainFormValues) => {
    if (editId && editId !== "") {
      try {
        data.domains.forEach(async (domain) => {
          await CompanyDomainAssetsService.Put(
            {
              companyId: Number(editId),
              domain: domain,
            },
            Number(editId)
          );
        });
        toast.success("Domínios cadastrados com sucesso");
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
          if (!res) throw new Error("Erro ao adicionar endereço IP");
        });
        toast.success("Endereços IP adicionados com sucesso");
        addStep();
      } catch (error) {
        toast.error("Erro ao adicionar endereços IP");
        console.log(error);
      }
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
      {[...Array(domainSize)].map((field, index) => (
        <div className="text-[#050506] w-full" key={index}>
          <Label className="font-semibold text-lg">
            Dominio <span className="text-red-500 ">*</span>
          </Label>
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
      ))}
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
          Adicionar outro aplicativo
        </Button>
        <Button
          type="button"
          onClick={() => {
            if (domainSize > 0) setDomainSize(domainSize - 1);
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
          onClick={() => navigation.push("/admin")}
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

export default DominiosForm;
