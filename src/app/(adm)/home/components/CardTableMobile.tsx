// components/CompanyCard.tsx

"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

interface CompanyCardProps {
  companyName: string;
  status: string;
  registrationDate: string;
  updateDate: string;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  companyName,
  status,
  registrationDate,
  updateDate,
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
            <p className="text-[#818086] text-sm">Status:</p>
            <span className="font-semibold ">{status}</span>
          </div>
          <div className="flex justify-between ">
            <div>
              <p className="text-[#818086] text-sm">Data de cadastro:</p>
              <p className="font-semibold ">{registrationDate}</p>
            </div>
            <div>
              <p className="text-[#818086] text-sm">Data de atualização:</p>
              <p className="font-semibold ">{updateDate}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyCard;
