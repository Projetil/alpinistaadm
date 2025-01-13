// components/CompanyCard.tsx
"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";


interface CompanyCardProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  actives: any
  editModalOpen: (newValue: boolean) => void
  deleteModalOpen: (newValue: boolean) => void
}

const CardActivesMobile: React.FC<CompanyCardProps> = ({
  actives,
  editModalOpen,
  deleteModalOpen
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
        <span className="text-normal font-medium">{actives.active}</span>
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
            <p className="text-[#818086] text-sm">IP:</p>
            <span className="font-semibold ">{actives.ip}</span>
          </div>
          <div>
            <p className="text-[#818086] text-sm">Descrição:</p>
            <span className="font-semibold ">{actives.description}</span>
          </div>
          <div className="flex justify-between items-center py-3 font-bold">
            <button
              onClick={() => editModalOpen(true)}
              className="text-[#050506]"
            >
              Editar
            </button>
            <button
              onClick={() => deleteModalOpen(true)}
              className="text-[#B3001E]"
            >
              Excluir
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardActivesMobile;
