// components/CardAccountMobile.tsx

"use client";

import { ITableAtivos } from "@/data/tableAtivos";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const CardAtivosMobile = ({
  name,
  items,
  status,
  severity,
  severityBgColor,
  severiyTextColor,
  statusBgColor,
  statusTextColor,
}: ITableAtivos) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-white rounded-xl text-[#636267]">
      <button
        onClick={toggleCard}
        className="flex justify-between items-center w-full text-left "
      >
        <div className="flex flex-col gap-3">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-[#8C8B91]">ID: {items}</p>
        </div>
        <ChevronDownIcon
          size={20}
          color="#093970"
          className={`w-7 h-7 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="pt-4 space-y-2 bg-white rounded-lg shadow-sm text-sm">
          <div className="flex flex-col">
            <p className="text-[#818086] ">Grau de severidade:</p>
            <span
              className={`font-semibold ${severityBgColor} ${severiyTextColor} p-2 w-12 flex items-center justify-center rounded `}
            >
              {severity}
            </span>
          </div>
          <div className="flex flex-col">
            <p className="text-[#818086] ">Status:</p>
            <p
              className={`font-semibold ${statusBgColor} ${statusTextColor} p-2 w-8 h-8 rounded-full flex items-center justify-center`}
            >
              {status}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAtivosMobile;
