import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CompanySocialNetworkAssetsService from "@/services/CompanySocialNetworkAssetsService";
import { ICompanySocialNetworkAssets } from "@/types/ICompanySocialNetworkAssets";
import { formatPhone } from "@/utils/formatString";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
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
  editId,
}: {
  addStep: () => void;
  companyId: number;
  editId: string;
}) => {
  const [socialMediaData, setSocialMediaData] =
    useState<ICompanySocialNetworkAssets>();
  const navigation = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SocialMediaFormValues>({
    resolver: zodResolver(socialMediaSchema),
  });

  const onSubmit = async (data: SocialMediaFormValues) => {
    if (editId && editId !== "") {
      try {
        await CompanySocialNetworkAssetsService.Put(
          {
            companyId: Number(editId),
            linkedIn: data.linkedin ?? "",
            whatsapp: data.whatsapp ?? "",
            instagram: data.instagram ?? "",
            facebook: data.facebook ?? "",
          },
          Number(editId)
        );
        toast.success("Rede sociais editado com sucesso");
        addStep();
      } catch (error) {
        toast.error("Erro ao adicionar rede socias");
        console.log(error);
      }
    } else {
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
    }
  };

  const fetchSocialMedia = async () => {
    try {
      const res = await CompanySocialNetworkAssetsService.GetByCompanyId(
        Number(editId)
      );
      setSocialMediaData(res);
    } catch (erro) {
      console.log(erro);
    }
  };

  useMemo(() => {
    if (editId && editId !== "") {
      fetchSocialMedia();
    }
  }, [editId]);

  useMemo(() => {
    if (socialMediaData) {
      reset({
        linkedin: socialMediaData.linkedIn ?? "",
        whatsapp: socialMediaData.whatsapp ?? "",
        instagram: socialMediaData.instagram ?? "",
        facebook: socialMediaData.facebook ?? "",
      });
    }
  }, [socialMediaData]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-6 flex flex-col gap-5"
    >
      <div className="flex gap-4 md:flex-row flex-col items-center">
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">LinkedIn</Label>
          <Input {...register(`linkedin`)} type="text" placeholder="LinkedIn" />
          {errors.linkedin && errors.linkedin && (
            <p className="text-red-500">{errors.linkedin?.message}</p>
          )}
        </div>

        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">WhatsApp</Label>
          <Input
            {...register(`whatsapp`)}
            placeholder="WhatsApp"
            type="text"
            onChange={(e) => {
              const formattedValue = formatPhone(e.target.value);
              e.target.value = formattedValue;
              register("whatsapp").onChange(e);
            }}
          />
          {errors.whatsapp && errors.whatsapp && (
            <p className="text-red-500">{errors.whatsapp?.message}</p>
          )}
        </div>
      </div>
      <div className="flex gap-4 md:flex-row flex-col items-center">
        <div className="text-[#050506] w-full">
          <Label className="font-semibold text-lg">Instagram</Label>
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
          <Label className="font-semibold text-lg">Facebook</Label>
          <Input {...register(`facebook`)} placeholder="Facebook" type="text" />
          {errors.facebook && errors.facebook && (
            <p className="text-red-500">{errors.facebook?.message}</p>
          )}
        </div>
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

export default SocialMediaForm;
