// components/CompanyCard.tsx
"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface CompanyCardProps {
  companyName: string;
  email: string;
  phone: string;
  position: string;
  typeCustomer: string;
}

const CardCustomerMobile: React.FC<CompanyCardProps> = ({
  companyName,
  email,
  position,
  phone,
  typeCustomer,
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
          <div className="flex justify-between">
            <div>
              <p className="text-[#818086] text-sm">Telefone:</p>
              <p className="font-semibold ">{phone}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm">Tipo:</p>
              <p className="font-semibold ">{typeCustomer}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-[#818086] text-sm">Cargo:</p>
              <p className="font-semibold ">{position}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm">E-mail:</p>
              <p className="font-semibold ">{email}</p>
            </div>
          </div>
          <div className="flex justify-between items-center py-3 font-bold">
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

export default CardCustomerMobile;
