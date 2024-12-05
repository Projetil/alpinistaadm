// components/CompanyCard.tsx
"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface CompanyCardProps {
  companyName: string;
  cnpj: string;
  status: string;
  registrationDate: string;
}

const CardClientMobile: React.FC<CompanyCardProps> = ({
  companyName,
  cnpj,
  status,
  registrationDate,
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
        <span className="text-lg font-medium">{companyName}</span>
        <ChevronDownIcon
          size={20}
          color="#093970"
          className={`w-7 h-7 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className=" mt-2 space-y-2 bg-white rounded-lg shadow-sm">
          <div>
            <p className="text-[#818086] text-sm">CNPJ:</p>
            <span className="font-semibold ">{cnpj}</span>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[#818086] text-sm">Status:</p>
              <p className="font-semibold ">{status}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm">Data de cadastro:</p>
              <p className="font-semibold ">{registrationDate}</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 font-bold">
            <a href="#" className="text-[#050506]">
              Editar
            </a>
            <a href="#" className="text-[#B3001E]">
              Excluir
            </a>
            <a href="#" className="text-[#1A69C4]">
              Ver contas
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardClientMobile;
