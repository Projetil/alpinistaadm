// components/CardAccountMobile.tsx

"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

const CardAtivosMobile = ({
  name,
  openModalDetails,
}: {
  name: string;
  openModalDetails: () => void;
}) => {
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
          <p className="text-sm text-[#8C8B91]">ITENS: 00</p>
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
        <div
          onClick={() => openModalDetails()}
          className="pt-4 space-y-2 bg-white rounded-lg shadow-sm text-sm"
        >
          <div className="flex flex-col">
            <p className="text-[#818086] ">Grau de severidade:</p>
            <div className={`py-3 px-4 text-sm flex gap-2 flex-wrap`}>
              <div
                className={`bg-[#FF5C63] text-[#FFFFFF]  w-8 h-8 p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`bg-[#FFDDD8] text-[#FF583F] w-8 h-8 p-2 font-bold`}
              >
                00
              </div>

              <div
                className={`bg-[#FFBB5C] text-[#FFFFFF] w-8 h-8 p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`bg-[#5CA7FF] text-[#FFFFFF] w-8 h-8 p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`bg-[#D1EBFF] text-[#1A69C4] w-8 h-8 p-2 font-bold`}
              >
                00
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <p className="text-[#818086] ">Status:</p>
            <div className="flex gap-2 flex-wrap">
              <div
                className={`w-9 h-9 rounded-full bg-[#FFA35C] text-[#050506] p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`w-9 h-9 rounded-full bg-[#FFCE5C] text-[#050506] p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`w-9 h-9 rounded-full bg-[#A7F04F] text-[#050506] p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`w-9 h-9 rounded-full bg-[#5CBEFF] text-[#080852] p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`w-9 h-9 rounded-full bg-[#4FF0D2] text-[#050506] p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`w-9 h-9 rounded-full bg-[#A8A8A8] text-[#FFFFFF] p-2 font-bold`}
              >
                00
              </div>
              <div
                className={`w-9 h-9 rounded-full bg-[#FF5C63] text-[#FFFFFF] p-2 font-bold`}
              >
                00
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CardAtivosMobile;
