import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanySocialNetworkAssetsService from "@/services/CompanySocialNetworkAssetsService";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const socialMediaSchema = z.object({
  linkedin: z.string().optional(),
  whatsapp: z.string().optional(),
  instagram: z.string().optional(),
  facebook: z.string().optional(),
});

export type SocialMediaFormValues = z.infer<typeof socialMediaSchema>;

const SocialMediaForm = ({
  addStep,
  companyId,
}: {
  addStep: () => void;
  companyId: number;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
  });

  const onSubmit = async (data: SocialMediaFormValues) => {
    try {
      await CompanySocialNetworkAssetsService.Post({
        companyId: companyId,
        linkedIn: data.linkedin ?? "",
        whatsapp: data.whatsapp ?? "",
        instagram: data.instagram ?? "",
        facebook: data.facebook ?? "",
      });
      toast.success("Rede sociais adicionadas com sucesso");
      addStep();
    } catch (error) {
      toast.error("Erro ao adicionar rede socias");
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-5"
    >
      <div className="flex gap-4 md:flex-row flex-col items-center">
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            LinkedIn <span className="text-red-500 ">*</span>
          </Label>
          <Input {...register(`linkedin`)} type="text" placeholder="LinkedIn" />
          {errors.linkedin && errors.linkedin && (
            <p className="text-red-500">{errors.linkedin?.message}</p>
          )}
        </div>

        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            WhatsApp <span className="text-red-500 ">*</span>
          </Label>
          <Input {...register(`whatsapp`)} placeholder="WhatsApp" type="text" />
          {errors.whatsapp && errors.whatsapp && (
            <p className="text-red-500">{errors.whatsapp?.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-4 md:flex-row flex-col items-center">
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            Instagram <span className="text-red-500 ">*</span>
          </Label>
          <Input
            {...register(`instagram`)}
            type="text"
            placeholder="Instagram"
          />
          {errors.instagram && errors.instagram && (
            <p className="text-red-500">{errors.instagram?.message}</p>
          )}
        </div>

        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">
            Facebook <span className="text-red-500 ">*</span>
          </Label>
          <Input {...register(`facebook`)} placeholder="Facebook" type="text" />
          {errors.facebook && errors.facebook && (
            <p className="text-red-500">{errors.facebook?.message}</p>
          )}
        </div>
      </div>

      <div className="flex w-full gap-4 justify-end items-center mt-2">
        <Button
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

export default SocialMediaForm;
