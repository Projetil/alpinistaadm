import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Minus, Plus } from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const domainSchema = z.object({
  domains: z.array(z.string().min(1, "Campo obrigatório")),
});

type DomainFormValues = z.infer<typeof domainSchema>;

const DominiosForm = ({
  addStep,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  editId,
}: {
  addStep: () => void;
  editId: string;
}) => {
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
