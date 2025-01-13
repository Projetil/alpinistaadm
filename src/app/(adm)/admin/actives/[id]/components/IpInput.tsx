import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { IoClose } from "react-icons/io5";

interface IPInputProps {
  ipData: { ip: string; ports: string[] };
  index: number;
  selectedActiveOption: string;
  updateIp: (index: number, value: string) => void;
  addPort: (ipIndex: number) => void;
  updatePort: (ipIndex: number, portIndex: number, value: string) => void;
  deletePort: (ipIndex: number, portIndex: number) => void;
  deleteIpInput: (index: number) => void;
}

const IPInput: React.FC<IPInputProps> = ({
  ipData,
  index,
  selectedActiveOption,
  updateIp,
  addPort,
  updatePort,
  deletePort,
  deleteIpInput,
}) => {
  
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
            name={`ip-${index}`}
            className="placeholder:text-[#636267] w-full"
            value={ipData.ip}
            onChange={(e) => updateIp(index, e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-4/6">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Porta(s)</label>
            <Button
              className="bg-[#3088EE] text-white w-6 h-6 p-0"
              onClick={() => addPort(index)}
            >
              +
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 max-h-[90px] overflow-y-auto">
            {ipData.ports.map((port, portIndex) => (
              <div key={portIndex} className="relative w-30">
                {selectedActiveOption === "Web" ? (
                    <div className="flex gap-2 items-center">
                  <select
                    name={`port-${index}-${portIndex}`}
                    className="w-full h-10 rounded-md border border-neutral-200"
                    value={port}
                    onChange={(e) => updatePort(index, portIndex, e.target.value)}
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
                        onClick={() => deletePort(index, portIndex)}
                      />
                    )}
                  
                    </div>
                  
                ) : (
                  <>
                    <Input
                      placeholder="Porta"
                      name={`port-${index}-${portIndex}`}
                      className="placeholder:text-[#636267] w-full"
                      value={port}
                      onChange={(e) =>
                        updatePort(index, portIndex, e.target.value)
                      }
                    />
                    {portIndex > 0 && (
                      <IoClose
                        color="#D9232B"
                        className="absolute top-3 right-2 cursor-pointer"
                        onClick={() => deletePort(index, portIndex)}
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
