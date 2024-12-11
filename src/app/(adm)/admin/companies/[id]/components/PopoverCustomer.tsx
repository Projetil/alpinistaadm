import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";

const PopoverCustomer = ({
  customerId,
  onDeleteCustomer,
  onEditCustomer,
  setOpenModal,
}: {
  customerId: number;
  onDeleteCustomer: (x: number) => void;
  onEditCustomer: (x: number) => void;
  setOpenModal: () => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild className="w-full md:w-auto">
        <SlOptionsVertical
          className="cursor-pointer text-[#1A69C4]"
          onClick={() => setIsOpen(!isOpen)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-52 right-4 top-3 relative flex flex-col gap-2 justifty-start items-start">
        <button
          onClick={() => {
            onEditCustomer(customerId);
            setOpenModal();
            setIsOpen(false);
          }}
          className="p-2 hover:bg-[#E0F3FF] focus:border-none focus:outline-none hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
        >
          <HiOutlinePencil size={25} /> Editar
        </button>
        <button
          onClick={() => onDeleteCustomer(customerId)}
          className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
        >
          <FaRegTrashAlt size={25} /> Excluir
        </button>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverCustomer;
