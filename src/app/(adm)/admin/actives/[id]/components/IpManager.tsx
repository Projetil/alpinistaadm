import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import IPInput from "./IpInput";

interface IPManagerProps {
  selectedActiveOption: string
}

const IPManager: React.FC<IPManagerProps> = ({selectedActiveOption}) => {
  const [ipInputs, setIpInputs] = useState<{ ip: string; ports: string[] }[]>(
    []
  );

  const addIpInput = () => {
    setIpInputs((prev) => [...prev, { ip: "", ports: [""] }]);
  };

  const deleteIpInput = (index: number) => {
    setIpInputs((prev) => prev.filter((_, i) => i !== index));
  };

  const updateIp = (index: number, value: string) => {
    setIpInputs((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ip: value } : item))
    );
  };

  const updatePort = (ipIndex: number, portIndex: number, value: string) => {
    setIpInputs((prev) =>
      prev.map((item, i) =>
        i === ipIndex
          ? {
              ...item,
              ports: item.ports.map((port, j) =>
                j === portIndex ? value : port
              ),
            }
          : item
      )
    );
  };

  const addPort = (ipIndex: number) => {
    setIpInputs((prev) =>
      prev.map((item, i) =>
        i === ipIndex ? { ...item, ports: [...item.ports, ""] } : item
      )
    );
  };

  const deletePort = (ipIndex: number, portIndex: number) => {
    setIpInputs((prev) =>
      prev.map((item, i) =>
        i === ipIndex
          ? {
              ...item,
              ports: item.ports.filter((_, j) => j !== portIndex),
            }
          : item
      )
    );
  };

  return (
    <div className="flex flex-col w-full mr-16">
      {ipInputs.map((field, index) => (
        <IPInput
        selectedActiveOption={selectedActiveOption}
          key={index}
          index={index}
          ipData={field}
          updateIp={updateIp}
          addPort={addPort}
          updatePort={updatePort}
          deletePort={deletePort}
          deleteIpInput={deleteIpInput}
        />
      ))}
      <div className="mt-2">
        <Button
          variant={"ghost"}
          onClick={addIpInput}
          className=" text-[#1F4C85] font-semibold justify-start"
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
