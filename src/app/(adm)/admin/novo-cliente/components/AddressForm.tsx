import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanyAddressAssetsService from "@/services/CompanyAddressAssetsService";
import CompanyService from "@/services/CompanyService";
import { ICompanyAddressAssets } from "@/types/ICompanyAddressAssets";
import { zodResolver } from "@hookform/resolvers/zod";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const address = z
  .object({
    addressIp: z
      .string({ message: "Endereço IP é obrigatório" })
      .max(45, "Endereço IP deve ter no máximo 200 caracteres"),
    addressBlock: z
      .string({ message: "Endereço IP (Bloco) é obrigatório" })
      .max(45, "Endereço IP (Bloco) deve ter no máximo 200 caracteres"),
  })
  .refine((data) => data.addressIp || data.addressBlock, {
    message: "Pelo menos um dos campos deve ser preenchido",
    path: ["addressIp"],
  });

export const AddressSchema = z.object({
  addresses: z.array(address),
});

export type AddressFormValues = z.infer<typeof AddressSchema>;

const AddressForm = ({
  addStep,
  companyId,
  editId,
  removeStep,
}: {
  addStep: () => void;
  removeStep: () => void;
  companyId: number;
  editId: string;
}) => {
  const [adressRes, setAdressRes] = useState<ICompanyAddressAssets[]>();
  const navigation = useRouter();
  const [addressSize, setAddressSize] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
  });

  const onInactive = async () => {
    try {
      await CompanyService.PutStatus(companyId);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = (data: AddressFormValues) => {
    if (editId && editId !== "") {
      try {
        data.addresses.forEach(async (address, index) => {
          if (adressRes?.[index]) {
            await CompanyAddressAssetsService.Put(
              {
                companyId: Number(editId),
                addressIp: address.addressIp,
                addressIpBlock: address.addressBlock,
              },
              Number(adressRes?.[index].id)
            );
          } else {
            await CompanyAddressAssetsService.Post({
              companyId: Number(editId),
              addressIp: address.addressIp,
              addressIpBlock: address.addressBlock,
            });
          }
        });
        addStep();
      } catch (error) {
        toast.error("Erro ao editar endereços IP");
        console.log(error);
      }
    } else {
      try {
        data.addresses.forEach(async (address) => {
          const res = await CompanyAddressAssetsService.Post({
            companyId: companyId,
            addressIp: address.addressIp,
            addressIpBlock: address.addressBlock,
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

  const onDelete = async (id?: string) => {
    try {
      await CompanyAddressAssetsService.Delete(Number(id));
      fetchCompanyAddres();
    } catch (error) {
      toast.error("Erro ao deletar domínio");
      console.log(error);
    }
  };

  const fetchCompanyAddres = async () => {
    try {
      const res = await CompanyAddressAssetsService.GetByCompanyId(
        Number(editId)
      );
      setAdressRes(res);
    } catch (erro) {
      console.log(erro);
    }
  };

  useMemo(() => {
    if (editId && editId !== "") {
      fetchCompanyAddres();
    }
  }, [editId]);

  useMemo(() => {
    if (adressRes) {
      reset({
        addresses: adressRes.map((address) => ({
          addressIp: address.addressIp,
          addressBlock: address.addressIpBlock,
        })),
      });
      setAddressSize(adressRes.length);
    }
  }, [adressRes]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-5"
    >
      {[...Array(addressSize)].map((_, index) => (
        <div
          className="flex gap-4 md:flex-row flex-col items-center"
          key={index}
        >
          <div className="text-[#050506] w-full">
            <div className="flex justify-between">
              <Label className="font-semibold text-lg">
                Endereço IP <span className="text-red-500 ">*</span>
              </Label>
              <Button
                type="button"
                onClick={() => {
                  if (!editId) {
                    if (addressSize > 0) {
                      setAddressSize(addressSize - 1);
                    }
                    const updatedAddress = getValues("addresses").filter(
                      (_, idx) => idx !== index
                    );
                    setValue("addresses", updatedAddress);
                  } else {
                    if (addressSize > 0) {
                      setAddressSize(addressSize - 1);
                      const updatedAddress = getValues("addresses").filter(
                        (_, idx) => idx !== index
                      );
                      setValue("addresses", updatedAddress);
                      if (adressRes?.[index].id) {
                        onDelete(adressRes?.[index].id);
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
              {...register(`addresses.${index}.addressIp`)}
              placeholder="Endereço IP"
              type="text"
            />
            {errors.addresses && errors.addresses[index]?.addressIp && (
              <p className="text-red-500">
                {errors.addresses[index]?.addressIp?.message}
              </p>
            )}
          </div>
          <div className="w-8 h-1 bg-[#40414A] md:block hidden relative top-3"></div>
          <div className="text-[#050506] w-full">
            <Label className="font-semibold text-lg">
              Endereço IP (Bloco) <span className="text-red-500 ">*</span>
            </Label>
            <Input
              placeholder="Endereço IP (Bloco)"
              {...register(`addresses.${index}.addressBlock`)}
              type="text"
            />
            {errors.addresses && errors.addresses[index]?.addressBlock && (
              <p className="text-red-500">
                {errors.addresses[index]?.addressBlock?.message}
              </p>
            )}
          </div>
        </div>
      ))}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
        <Button
          type="button"
          onClick={() => {
            setAddressSize(addressSize + 1);
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

export default AddressForm;
