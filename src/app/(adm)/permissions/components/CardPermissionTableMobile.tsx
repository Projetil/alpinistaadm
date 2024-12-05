// components/CompanyCard.tsx
"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface CompanyCardProps {
  name: string;
  type: string;
  permission: string;
}

const CardPermission: React.FC<CompanyCardProps> = ({
  name,
  type,
  permission,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full px-2 py-4 space-y-2 bg-white rounded-xl text-[#636267]">
      <button
        onClick={toggleCard}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="text-lg font-medium">{name}</span>
        <ChevronDownIcon
          size={20}
          color="#093970"
          className={`w-7 h-7 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className=" mt-2 space-y-2 bg-white py-3 rounded-lg shadow-sm">
          <div>
            <p className="text-[#818086] text-sm">Tipo:</p>
            <span className="font-semibold ">{type}</span>
          </div>
          <div className="flex">
            <div>
              <p className="text-[#818086] text-sm">Permissões:</p>
              <p className="font-semibold ">{permission}</p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-5 font-bold">
            <a href="#" className="text-[#050506]">
              Editar
            </a>
            <a href="#" className="text-[#B3001E]">
              Excluir
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardPermission;
