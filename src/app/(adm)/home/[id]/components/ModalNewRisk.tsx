"use client";
import { DatePicker } from "@/components/default/DatePicker";
import Modal from "@/components/default/Modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ModalNewRisk = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: () => void;
}) => {
  const [steps, setSteps] = useState(1);

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <div className="bg-white py-3 px-5 rounded-lg flex flex-col gap-10 overflow-auto max-h-screen md:w-auto w-full">
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
          <form className="text-[#050506] flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label className="">
                  ID <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="number"
                  className="placeholder:text-[#8C8B91] text-[#636267]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">
                  Nome <span className="text-red-500">*</span>
                </Label>
                <Input
                  type="text"
                  className="placeholder:text-[#8C8B91] text-[#636267]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">
                  Estado <span className="text-red-500">*</span>
                </Label>
                <select className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]">
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  <option value="pending">Pendente</option>
                  <option value="active">Ativo</option>
                  <option value="unactive">Desativado</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">
                  Severidade <span className="text-red-500">*</span>
                </Label>
                <select className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]">
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  <option value="pending">Info</option>
                </select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex flex-col gap-2">
                <Label className="">
                  Responsável <span className="text-red-500">*</span>
                </Label>
                <select className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]">
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  <option value="pending">Pendente</option>
                  <option value="active">Ativo</option>
                  <option value="unactive">Desativado</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">
                  Ativo <span className="text-red-500">*</span>
                </Label>
                <select className="h-10 flex border rounded-md placeholder:text-[#8C8B91] text-[#8C8B91]">
                  <option disabled value="">
                    Selecione uma opção
                  </option>
                  <option value="pending">Info</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <Label className="">
                  Data limite <span className="text-red-500">*</span>
                </Label>
                <DatePicker />
              </div>
            </div>
            <div>
              <Label className="">
                Descrição <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Descrição"
                className="placeholder:text-[#8C8B91] text-[#636267] w-full"
              />
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
                onClick={() => setSteps(2)}
                className="md:w-fit w-full bg-[#3088EE] border-none"
              >
                Avançar
              </Button>
            </div>
          </form>
        )}
        {steps == 2 && (
          <form className="text-[#050506] flex flex-col gap-6">
            <div>
              <Label className="">
                Observações <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Observações"
                className="placeholder:text-[#8C8B91] text-[#636267] w-full"
              />
            </div>
            <div>
              <Label className="">
                Plano de ação <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Plano de ação"
                className="placeholder:text-[#8C8B91] text-[#636267] w-full"
              />
            </div>
            <div>
              <Label className="">
                Evidências <span className="text-red-500">*</span>
              </Label>
              <Textarea
                placeholder="Evidências"
                className="placeholder:text-[#8C8B91] text-[#636267] w-full "
              />
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
                onClick={() => {
                  setOpen();
                  setSteps(1);
                }}
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
