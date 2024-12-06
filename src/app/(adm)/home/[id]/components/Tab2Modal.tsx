"use client";
import { IRisk } from "@/types/IRisk";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";

const Tab2Modal = ({ currentRisk }: { currentRisk?: IRisk }) => {
  return (
    <div className="bg-[#FBFBFB] p-3 rounded-lg">
      <div className="flex w-full justify-between mb-8">
        <h4 className="font-semibold text-[#050506]">Detalhamento</h4>
        <IoInformationCircle color="#1A69C4" size={24} />
      </div>
      <div className="flex flex-col gap-4 ">
        <AccordingTab2
          title={"Observações"}
          descript={currentRisk ? currentRisk.observations : ""}
        />
        <AccordingTab2
          title={"Plano de ação"}
          descript={currentRisk ? currentRisk.actionPlan : ""}
        />
        <AccordingTab2
          title={"Evidências"}
          descript={currentRisk ? currentRisk.evidences : ""}
        />
      </div>
    </div>
  );
};

export default Tab2Modal;

const AccordingTab2 = ({
  title,
  descript,
}: {
  title: string;
  descript: string;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleCard = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full p-4 space-y-2  rounded-xl ">
      <button
        onClick={toggleCard}
        className="flex justify-between items-center w-full text-left"
      >
        <span className="font-semibold text-[#1A69C4]">{title}</span>
        <ChevronDownIcon
          color="#093970"
          className={`w-5 h-5 transition-transform ${
            isOpen ? "transform rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-4 mt-2 space-y-2  rounded-lg ">
          <p className="font-light text-[#636267]">{descript}</p>
          <div></div>
        </div>
      )}
    </div>
  );
};
