import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const domainSchema = z.object({
  domains: z.array(z.string().min(1, "Campo obrigatório").url("URL inválida")),
});

type DomainFormValues = z.infer<typeof domainSchema>;

const DominiosForm = ({ addStep }: { addStep: () => void }) => {
  const navigation = useRouter();
  const [domainSize, setDomainSize] = useState(1);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DomainFormValues>({
    resolver: zodResolver(domainSchema),
    defaultValues: {
      domains: [""],
    },
  });

  const onSubmit = (data: DomainFormValues) => {
    console.log(data);
    toast.success("Domínios cadastrados com sucesso");
    addStep();
  };

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
