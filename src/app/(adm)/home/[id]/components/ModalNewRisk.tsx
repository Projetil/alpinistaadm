"use client";
import { DatePicker } from "@/components/default/DatePicker";
import Modal from "@/components/default/Modal";
import Editor from "@/components/default/TextAreaInput";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CustomerService from "@/services/CustomerService";
import RisksService from "@/services/RisksService";
import { ICustomer } from "@/types/ICustomer";
import { IRisk } from "@/types/IRisk";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { z } from "zod";

const riskForm1Schema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, "Name é obrigatorio"),
  state: z.string().min(1, "Estado é obrigatorio"),
  severity: z.string().min(1, "Severidade é obrigatorio"),
  responsible: z.string().optional(),
  isActive: z.string().min(1, "Ativo é obrigatorio"),
  description: z.string().min(1, "Descrição é obrigatorio"),
});

const riskForm2Schema = z.object({
  observations: z.string().min(1, "Observações é obrigatorio"),
  actionPlan: z.string().min(1, "Plano de ação é obrigatorio"),
  evidences: z.string().min(1, "Evidências é obrigatorio"),
});

type RiskFormInputs1 = z.infer<typeof riskForm1Schema>;
type RiskFormInputs2 = z.infer<typeof riskForm2Schema>;

const ModalNewRisk = ({
  riskId,
  open,
  setOpen,
  setRiskId,
}: {
  riskId?: number;
  open: boolean;
  setOpen: () => void;
  setRiskId?: (x: number) => void;
}) => {
  const { id } = useParams();
  const [limitDate, setLimitDate] = useState<string>();
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [loading, setLoading] = useState(false);
  const [steps, setSteps] = useState(1);
  const [risk, setRisk] = useState<RiskFormInputs1>();
  const [resetRisk, setResetRisk] = useState<IRisk>();
  const {
    register: register1,
    reset: reset1,
    control: control2,
    handleSubmit: handleSubmit1,
    formState: { errors: errors1 },
  } = useForm<RiskFormInputs1>({
    resolver: zodResolver(riskForm1Schema),
  });

  const {
    reset: reset2,
    handleSubmit: handleSubmit2,
    control,
    formState: { errors: errors2 },
  } = useForm<RiskFormInputs2>({
    resolver: zodResolver(riskForm2Schema),
  });

  const onSubmit1 = (data: RiskFormInputs1) => {
    setRisk(data);
    setSteps(2);
  };

  const onSubmit2 = async (data: RiskFormInputs2) => {
    try {
      if (riskId && riskId > 0) {
        await RisksService.Put(
          {
            companyId: resetRisk?.companyId ?? 0,
            status: Number(risk?.state) ?? 0,
            riskSeverity: risk ? Number(risk.severity) : 0,
            active: risk ? risk.isActive : "",
            limitDate: limitDate ? limitDate : "",
            name: risk ? risk.name : "",
            description: risk ? risk.description : "",
            observations: data.observations,
            actionPlan: data.actionPlan,
            evidences: data.evidences,
          },
          riskId
        );
      } else {
        await RisksService.Post({
          companyId: Number(id) ?? 0,
          status: Number(risk?.state) ?? 0,
          riskSeverity: risk ? Number(risk.severity) : 0,
          active: risk ? risk.isActive : "",
          limitDate: limitDate ? limitDate : undefined,
          name: risk ? risk.name : "",
          description: risk ? risk.description : "",
          observations: data.observations,
          actionPlan: data.actionPlan,
          evidences: data.evidences,
        });
        toast.success("Risco criado com sucesso");
      }
      setOpen();
    } catch (e) {
      console.log(e);
      toast.error("Erro ao criar risco");
    }
  };

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const res = await CustomerService.GetAllByCompanyId(0, 0, Number(id));
      setCustomers(res.items);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const fetchRisk = async () => {
    try {
      const res = await RisksService.GetById(riskId || 0);
      setResetRisk(res);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  useEffect(() => {
    if (!open) {
      if (setRiskId) {
        setRiskId(0);
        setSteps(1);
      }
      reset1({
        name: "",
        state: "",
        severity: "",
        responsible: "",
        isActive: "",
        description: "",
      });
      setLimitDate("");

      reset2({
        observations: "",
        actionPlan: "",
        evidences: "",
      });
    }
  }, [open]);

  useMemo(() => {
    if (riskId && riskId > 0) {
      fetchRisk();
    }
  }, [riskId]);

  useMemo(() => {
    if (resetRisk) {
      reset1({
        id: resetRisk.id.toString(),
        name: resetRisk.name,
        state: resetRisk.status.toString(),
        severity: resetRisk.riskSeverity.toString(),
        responsible: resetRisk.responsibleCustomerId?.toString(),
        isActive: resetRisk.active,
        description: resetRisk.description,
      });
      const dateLimit = new Date(resetRisk.limitDate);
      setLimitDate(dateLimit?.toISOString().split("T")[0] ?? "");
      reset2({
        observations: resetRisk.observations,
        actionPlan: resetRisk.actionPlan,
        evidences: resetRisk.evidences,
      });
    }
  }, [resetRisk]);

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <div className="bg-white py-3 px-5 rounded-lg flex flex-col gap-10 overflow-auto max-h-screen w-full md:w-[1000px]">
        <h3 className="font-bold text-2xl text-[#0D3C73]">Novo Risco</h3>
        <div className="flex flex-col md:flex-row gap-4">
          <button
            className={`flex items-center gap-3 font-semibold ${
              steps == 1 ? "text-[#1573B6]" : "text-[#B9B8BF]"
            }`}
          >
            <span
              className={`p-2 rounded-full border-[2px] w-10 h-10 flex items-center justify-center ${
                steps == 1 ? "border-[#1573B6]" : "border-[#B9B8BF]"
              }`}
            >
              01
            </span>
            <p>Informações</p>
          </button>
          <button
            className={`flex gap-3 font-semibold items-center ${
              steps == 2 ? "text-[#1573B6]" : "text-[#B9B8BF]"
            }`}
          >
            <span
              className={`p-2 rounded-full border-[2px] w-10 h-10 flex items-center justify-center ${
                steps == 2 ? "border-[#1573B6]" : "border-[#B9B8BF]"
              }`}
            >
              02
            </span>
            <p>Detalhamento</p>
          </button>
        </div>
        {steps == 1 && (
          <form
            onSubmit={handleSubmit1(onSubmit1)}
            className="text-[#050506] flex flex-col gap-6"
          >
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2 w-fit">
                <Label className="">
                  ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  disabled
                  defaultValue={"2343"}
                  {...register1("id")}
                  type="number"
                  className="placeholder:text-[#8C8B91] text-[#636267]"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <Label className="">
                  Nome <span className="text-red-500">*</span>
                </Label>
                <Input
                  {...register1("name")}
                  type="text"
                  className="placeholder:text-[#8C8B91] text-[#636267]"
                />
                {errors1.name && errors1.name && (
                  <p className="text-red-500">{errors1.name?.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">
                  Estado <span className="text-red-500">*</span>
                </Label>
                <select
                  {...register1("state")}
                  className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]"
                >
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  <option value="1">Pendente</option>
                  <option value="2">Em progresso</option>
                  <option value="3">Fixado</option>
                  <option value="4">Aceito</option>
                  <option value="5">Retest</option>
                  <option value="6">Reopened</option>
                </select>
              </div>
              {errors1.state && errors1.state && (
                <p className="text-red-500">{errors1.state?.message}</p>
              )}
              <div className="flex flex-col gap-2">
                <Label className="">
                  Severidade <span className="text-red-500">*</span>
                </Label>
                <select
                  {...register1("severity")}
                  className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]"
                >
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  <option value="1">Info</option>
                  <option value="2">Low</option>
                  <option value="3">Medium</option>
                  <option value="4">High</option>
                  <option value="5">Critical</option>
                </select>
                {errors1.severity && errors1.severity && (
                  <p className="text-red-500">{errors1.severity?.message}</p>
                )}
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label className="">Responsável</Label>
                <select
                  {...register1("responsible")}
                  className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]"
                >
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  {!loading &&
                    customers.map((customer, index) => (
                      <option key={index} value={customer.id}>
                        {customer.name}
                      </option>
                    ))}
                </select>
                {errors1.responsible && errors1.responsible && (
                  <p className="text-red-500">{errors1.responsible?.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">
                  Ativo <span className="text-red-500">*</span>
                </Label>
                <select
                  {...register1("isActive")}
                  className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]"
                >
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  <option value="pending">Info</option>
                </select>
                {errors1.isActive && errors1.isActive && (
                  <p className="text-red-500">{errors1.isActive?.message}</p>
                )}
              </div>
              <div className="flex flex-col gap-2 md:w-1/3">
                <Label className="">Data limite</Label>
                <DatePicker
                  date={limitDate}
                  setDate={(date: Date) =>
                    setLimitDate(date?.toISOString().split("T")[0] ?? "")
                  }
                />
              </div>
            </div>
            <div>
              <Label className="">
                Descrição <span className="text-red-500">*</span>
              </Label>
              {/*               <Textarea
                {...register1("description")}
                placeholder="Descrição"
                className="placeholder:text-[#8C8B91] text-[#636267] w-full"
              /> */}
              <Controller
                name="description"
                control={control2}
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field: { value, onChange } }) => (
                  <Editor
                    styling="30rem"
                    contentDescription={value}
                    setContentDescription={onChange}
                  />
                )}
              />
              {errors1.description && errors1.description && (
                <p className="text-red-500">{errors1.description?.message}</p>
              )}
            </div>
            <div className="flex flex-col-reverse md:flex-row w-full items-center justify-end gap-4">
              <Button
                variant={"outline"}
                className="md:w-fit w-full border-[#3088EE] text-[#3088EE] "
                onClick={setOpen}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="md:w-fit w-full bg-[#3088EE] border-none"
              >
                Avançar
              </Button>
            </div>
          </form>
        )}
        {steps == 2 && (
          <form
            onSubmit={handleSubmit2(onSubmit2)}
            className="text-[#050506] flex flex-col gap-6"
          >
            <div>
              <Label className="">
                Observações <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="observations"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field: { value, onChange } }) => (
                  <Editor
                    styling="30rem"
                    contentDescription={value}
                    setContentDescription={onChange}
                  />
                )}
              />
              {errors2.observations && errors2.observations && (
                <p className="text-red-500">{errors2.observations?.message}</p>
              )}
            </div>
            <div className="">
              <Label className="">
                Plano de ação <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="actionPlan"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field: { value, onChange } }) => (
                  <Editor
                    styling="30rem"
                    contentDescription={value}
                    setContentDescription={onChange}
                  />
                )}
              />
              {errors2.actionPlan && errors2.actionPlan && (
                <p className="text-red-500">{errors2.actionPlan?.message}</p>
              )}
            </div>
            <div>
              <Label className="">
                Evidências <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="evidences"
                control={control}
                rules={{
                  required: "Campo obrigatório",
                }}
                render={({ field: { value, onChange } }) => (
                  <Editor
                    styling="30rem"
                    contentDescription={value}
                    setContentDescription={onChange}
                  />
                )}
              />
              {errors2.evidences && errors2.evidences && (
                <p className="text-red-500">{errors2.evidences?.message}</p>
              )}
            </div>
            <div className="flex flex-col-reverse md:flex-row w-full items-center justify-end gap-4">
              <Button
                variant={"outline"}
                className="md:w-fit w-full border-[#3088EE] text-[#3088EE] "
                onClick={setOpen}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                className="md:w-fit w-full bg-[#3088EE] border-none"
              >
                Adicionar
              </Button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export default ModalNewRisk;
