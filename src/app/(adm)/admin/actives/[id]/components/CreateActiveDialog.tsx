import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import IPManager from "./IpManager";
import { Button } from "@/components/ui/button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { activeTypes, IAssetsAdm, severityType } from "@/types/IAssets";
import {
  newActiveSchema,
  NewActiveValues,
} from "@/utils/schemas/NewActiveSchema";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import AssetsService from "@/services/AssetsService";
import { useSession } from "next-auth/react";

const CreteActiveDialog = ({
  newActiveOpen,
  setNewActiveOpen,
  companyId,
  editFocus,
}: {
  newActiveOpen: boolean;
  setNewActiveOpen: Dispatch<SetStateAction<boolean>>;
  companyId: number;
  editFocus: number;
}) => {
  const [selectedActiveOption, setSelectedActiveOption] = useState("");
  const [editType, setEditType] = useState("");
  const methods = useForm<NewActiveValues>({
    resolver: zodResolver(newActiveSchema),
  });
  const { data: session } = useSession();
  const [assetsAdm, setAssetsAdm] = useState<IAssetsAdm[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: NewActiveValues) => {
    if (editFocus > 0) {
      try {
        await Promise.all(
          data.assetIps.map(async (ip) => {
            await AssetsService.Put(
              {
                id: editFocus,
                hostname: data.domain,
                activetype:
                  data.type == selectedActiveOption
                    ? Number(editType)
                    : Number(data.type),
                emailAddress: data.email,
                severityType: data.severity ? Number(data.severity) : undefined,
                description: data.description,
                assetIpPorts: ip.assetIpPorts.map((port) => ({
                  id: port.id ? Number(port.id) : 0,
                  port: port.port,
                })),
                modifiedBy: Number(session?.user.id),
                isIgnored: false,
              },
              editFocus
            );
          })
        );
        toast.success("Ativo editado com sucesso");
        setNewActiveOpen(false);
        reset();
      } catch (error) {
        console.log(error);
        toast.error("Erro ao editar ativo");
      }
    } else {
      try {
        await Promise.all(
          data.assetIps.map(async (ip) => {
            await AssetsService.Post({
              companyId: companyId,
              hostname: data.domain,
              activetype: Number(data.type),
              emailAddress: data.email,
              severityType: data.severity ? Number(data.severity) : undefined,
              createdBy: Number(session?.user.id),
              description: data.description,
              ports: ip.assetIpPorts.map((port) => port),
              ip: ip.ip,
            });
          })
        );
        toast.success("Ativo adicionado com sucesso");
        setNewActiveOpen(false);
        reset();
      } catch (error) {
        console.log(error);
      }
    }
  };

  const fetchDataEdit = async (id: number) => {
    const response = await AssetsService.GetByHostname(id);
    if (response) {
      setAssetsAdm(response);
    }
  };

  useEffect(() => {
    if (assetsAdm.length > 0) {
      reset({
        domain: assetsAdm[0].hostname,
        severity: assetsAdm[0].severityType
          ? assetsAdm[0].severityType.toString()
          : "",
        type:
          assetsAdm[0].activetype == 1 ||
          assetsAdm[0].activetype == 2 ||
          assetsAdm[0].activetype == 3
            ? "1"
            : (assetsAdm[0].activetype - 2).toString(),
        email: assetsAdm[0].emailAddress,
        description: assetsAdm[0].description,
        assetIps: assetsAdm?.map((ip) => ({
          id: ip.id?.toString(),
          ip: ip.ip,
          assetIpPorts: ip.ports.map((port) => ({
            port: port.port,
            id: port.id?.toString(),
          })),
        })),
      });
      setSelectedActiveOption(
        assetsAdm[0].activetype == 1 || assetsAdm[0].activetype == 2
          ? "1"
          : (assetsAdm[0].activetype - 1).toString()
      );
      setEditType(assetsAdm[0].activetype.toString());
    }
  }, [assetsAdm]);

  useEffect(() => {
    if (editFocus > 0) {
      fetchDataEdit(editFocus);
    }
    if (editFocus === 0) {
      setAssetsAdm([]);
      reset({
        domain: "",
        severity: "",
        type: "",
        email: "",
        description: "",
        assetIps: [
          {
            id: "",
            ip: "",
            assetIpPorts: [{ port: "", id: "" }],
          },
        ],
      });
    }
  }, [editFocus]);

  useEffect(() => {
    if (errors.assetIps) {
      toast.warn("As portas deve ser um número entre 1 e 65535");
    }
  }, [errors]);

  return (
    <Dialog open={newActiveOpen} onOpenChange={setNewActiveOpen}>
      <DialogContent className="w-full max-w-screen h-full rounded-none flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-[#093970] font-bold text-xl ">
            Novo ativo
          </DialogTitle>
        </DialogHeader>
        <FormProvider {...methods}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-y-auto flex flex-col gap-2"
          >
            <div className="w-full gap-3 flex flex-col md:flex-row ">
              <div className="flex flex-col w-full md:w-2/4 mx-1">
                <label htmlFor="domain" className="font-semibold">
                  {selectedActiveOption == "4"
                    ? "E-mail"
                    : selectedActiveOption == "2"
                    ? "URL"
                    : "Domínio"}
                  <span className="text-red-700 font-semibold">*</span>
                </label>
                <Input
                  {...register("domain")}
                  placeholder={
                    selectedActiveOption == "4"
                      ? "E-mail"
                      : selectedActiveOption == "2"
                      ? "URL"
                      : "Domínio"
                  }
                  className="placeholder:text-[#636267]"
                />
                {errors.domain && (
                  <span className="text-red-700">{errors.domain.message}</span>
                )}
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="severity" className="font-semibold">
                  Severidade
                </label>
                <select
                  className="h-10 rounded-md border pl-3"
                  defaultValue={"selectValue"}
                  {...register("severity")}
                >
                  <option disabled value="selectValue">
                    Selecione uma opção
                  </option>
                  {severityType.map((item, index) => (
                    <option key={index} value={index + 1}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.severity && (
                  <span className="text-red-700">
                    {errors.severity.message}
                  </span>
                )}
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="type" className="font-semibold">
                  Tipo<span className="text-red-700">*</span>
                </label>
                <select
                  className="h-10 rounded-md border pl-3"
                  defaultValue={"selectValue"}
                  {...register("type")}
                  onChange={(e) => {
                    setSelectedActiveOption(e.target.value);
                  }}
                >
                  <option disabled value="selectValue">
                    Selecione uma opção
                  </option>
                  {activeTypes.map((item, index) => (
                    <option key={index} value={index + 1}>
                      {item}
                    </option>
                  ))}
                </select>
                {errors.type && (
                  <span className="text-red-700">{errors.type.message}</span>
                )}
              </div>
            </div>
            <div className="w-full gap-4 flex flex-col md:flex-row">
              <IPManager selectedActiveOption={selectedActiveOption} />
            </div>
            <div className="w-full gap-4 flex">
              <div className="flex flex-col w-full">
                <label htmlFor="description">Descrição</label>
                <textarea
                  {...register("description")}
                  placeholder="Default"
                  name="description"
                  className="h-[168px] border p-3 rounded-md w-full border-[#D7D7DA] placeholder:text-[#636267]"
                ></textarea>
                {errors.description && (
                  <span className="text-red-700">
                    {errors.description.message}
                  </span>
                )}
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant={"outline"}
                type="button"
                onClick={() => setNewActiveOpen(false)}
                className="px-4 py-2 rounded-md text-[#5CA7FF] border-[#5CA7FF] hover:bg-gray-300"
              >
                Cancelar
              </Button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md bg-[#3088EE] text-white hover:bg-[#2a76ce]"
              >
                {editFocus > 0 ? "Editar" : "Adicionar"}
              </button>
            </DialogFooter>
          </form>
        </FormProvider>
      </DialogContent>
    </Dialog>
  );
};

export default CreteActiveDialog;
