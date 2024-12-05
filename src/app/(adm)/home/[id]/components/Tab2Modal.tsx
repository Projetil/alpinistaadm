"use client";
import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";
import { IoInformationCircle } from "react-icons/io5";

const Tab2Modal = () => {
  return (
    <div className="bg-[#FBFBFB] p-3 rounded-lg">
      <div className="flex w-full justify-between mb-8">
        <h4 className="font-semibold text-[#050506]">Detalhamento</h4>
        <IoInformationCircle color="#1A69C4" size={24} />
      </div>
      <div className="flex flex-col gap-4 ">
        <AccordingTab2
          title={"Observações"}
          descript={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla, risus id pulvinar aliquam, eros velit hendrerit nisl, vitae facilisis risus orci a dolor. Vestibulum porttitor accumsan nisi non euismod. Phasellus congue orci nec enim efficitur, vel eleifend diam dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla, risus id pulvinar aliquam, eros velit hendrerit nisl, vitae facilisis risus orci a dolor. Vestibulum porttitor accumsan nisi non euismod. Phasellus congue orci nec enim efficitur, vel eleifend diam dictum."
          }
        />
        <AccordingTab2
          title={"Plano de ação"}
          descript={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla, risus id pulvinar aliquam, eros velit hendrerit nisl, vitae facilisis risus orci a dolor. Vestibulum porttitor accumsan nisi non euismod. Phasellus congue orci nec enim efficitur, vel eleifend diam dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla, risus id pulvinar aliquam, eros velit hendrerit nisl, vitae facilisis risus orci a dolor. Vestibulum porttitor accumsan nisi non euismod. Phasellus congue orci nec enim efficitur, vel eleifend diam dictum."
          }
        />
        <AccordingTab2
          title={"Evidências"}
          descript={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla, risus id pulvinar aliquam, eros velit hendrerit nisl, vitae facilisis risus orci a dolor. Vestibulum porttitor accumsan nisi non euismod. Phasellus congue orci nec enim efficitur, vel eleifend diam dictum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur fringilla, risus id pulvinar aliquam, eros velit hendrerit nisl, vitae facilisis risus orci a dolor. Vestibulum porttitor accumsan nisi non euismod. Phasellus congue orci nec enim efficitur, vel eleifend diam dictum."
          }
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
