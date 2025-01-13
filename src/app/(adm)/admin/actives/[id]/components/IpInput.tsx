import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoClose } from "react-icons/io5";
import { useFieldArray, useFormContext } from "react-hook-form";

interface IPInputProps {
  index: number;
  selectedActiveOption: string;
  deleteIpInput: (index: number) => void;
}

const IPInput: React.FC<IPInputProps> = ({
  index,
  selectedActiveOption,
  deleteIpInput,
}) => {
  const { register, control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: `assetIps.${index}.assetIpPorts`,
  });

  const webOptions = [
    "80",
    "8080",
    "8081",
    "8082",
    "8000",
    "81",
    "82",
    "8888",
    "5000",
    "3000",
    "9000",
    "7000",
    "8889",
    "443",
    "8443",
    "8444",
    "9443",
    "4433",
    "10443",
    "10444",
  ];

  return (
    <div>
      <div className="w-full flex justify-end">
        <Button
          variant={"ghost"}
          type="button"
          onClick={() => deleteIpInput(index)}
          className="p-0 m-0"
        >
          <IoClose color="#D9232B" />
        </Button>
      </div>
      <div className="flex flex-col md:flex-row items-start gap-2 mt-2 bg-[#FBFBFB] p-4 max-h-[200px]">
        <div className="flex flex-col gap-2 w-2/6">
          <label htmlFor={`ip-${index}`} className="font-semibold">
            IP
          </label>
          <Input
            placeholder="IP"
            {...register(`assetIps.${index}.ip`, {
              required: "O IP é obrigatório",
            })}
            className="placeholder:text-[#636267] w-full m-1"
          />
        </div>
        <div className="flex flex-col gap-2 w-4/6">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Porta(s)</label>
            <Button
              type="button"
              className="bg-[#3088EE] text-white w-6 h-6 p-0"
              onClick={() => append("")}
            >
              +
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-[90px] overflow-y-auto">
            {fields.map((field, portIndex) => (
              <div key={field.id} className="relative w-30">
                {selectedActiveOption === "Web" ? (
                  <div className="flex gap-2 items-center">
                    <select
                      {...register(
                        `assetIps.${index}.assetIpPorts.${portIndex}`,
                        { required: "A porta é obrigatória" }
                      )}
                      className="w-full h-10 rounded-md border border-neutral-200"
                    >
                      {webOptions.map((item, idx) => (
                        <option key={idx} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                    {portIndex > 0 && (
                      <IoClose
                        size={20}
                        color="#D9232B"
                        className="cursor-pointer"
                        onClick={() => remove(portIndex)}
                      />
                    )}
                  </div>
                ) : (
                  <>
                    <Input
                      placeholder="Porta"
                      {...register(
                        `assetIps.${index}.assetIpPorts.${portIndex}.port`,
                        { required: "A porta é obrigatória" }
                      )}
                      className="placeholder:text-[#636267] w-full m-1"
                    />
                    {portIndex > 0 && (
                      <IoClose
                        color="#D9232B"
                        className="absolute top-3 right-2 cursor-pointer"
                        onClick={() => remove(portIndex)}
                      />
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default IPInput;
