import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanyAddressAssetsService from "@/services/CompanyAddressAssetsService";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const address = z
  .object({
    addressIp: z
      .string()
      .max(200, "Endereço IP deve ter no máximo 200 caracteres"),
    addressBlock: z
      .string()
      .max(200, "Endereço IP (Bloco) deve ter no máximo 200 caracteres"),
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
}: {
  addStep: () => void;
  companyId: number;
}) => {
  const navigation = useRouter();
  const [addressSize, setAddressSize] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AddressFormValues>({
    resolver: zodResolver(AddressSchema),
  });

  const onSubmit = (data: AddressFormValues) => {
    try {
      data.addresses.forEach(async (address) => {
        const res = await CompanyAddressAssetsService.Post({
          companyId: companyId,
          addressIp: address.addressIp,
          addressBlock: address.addressBlock,
        });
        if (!res) throw new Error("Erro ao adicionar endereço IP");
      });
      toast.success("Endereços IP adicionados com sucesso");
      addStep();
    } catch (error) {
      toast.error("Erro ao adicionar endereços IP");
      console.log(error);
    }
    /* addStep(); */
  };

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
            <Label className="font-semibold text-lg">
              Endereço IP <span className="text-red-500 ">*</span>
            </Label>
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
      <Button
        type="button"
        onClick={() => {
          setAddressSize(addressSize + 1);
        }}
        variant={"ghost"}
        className="text-[#1F4C85] font-semibold justify-start"
      >
        <Plus />
        Adicionar outro IP
      </Button>
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

export default AddressForm;
