import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React from "react";
import IPInput from "./IpInput";
import { useFieldArray, useFormContext } from "react-hook-form";

interface IPManagerProps {
  selectedActiveOption: string;
}

const IPManager: React.FC<IPManagerProps> = ({ selectedActiveOption }) => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "assetIps",
  });

  const addIpInput = () => {
    append({ ip: "", assetIpPorts: [] });
  };

  const deleteIpInput = (index: number) => {
    remove(index);
  };

  return (
    <div className="flex flex-col w-full mr-16">
      {fields.map((field, index) => (
        <IPInput
          key={field.id}
          index={index}
          selectedActiveOption={selectedActiveOption}
          deleteIpInput={deleteIpInput}
        />
      ))}
      <div className="mt-2">
        <Button
          variant={"ghost"}
          onClick={addIpInput}
          className="text-[#1F4C85] font-semibold justify-start"
          type="button"
        >
          <Plus />
          Adicionar outro IP
        </Button>
      </div>
    </div>
  );
};

export default IPManager;
