"use client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlOptionsVertical } from "react-icons/sl";
import Link from "next/link";
import Image from "next/image";
import { MdBugReport } from "react-icons/md";

const PopoverHome = ({
  companyId
} : {companyId: number}
 ) => {


  return (
    <Popover>
      <PopoverTrigger asChild className="w-full md:w-auto">
        <SlOptionsVertical className="cursor-pointer text-[#1A69C4]" />
      </PopoverTrigger>
      <PopoverContent className="w-52 right-4 top-3 relative flex flex-col gap-2 justifty-start items-start">
      <Link
          href={`/admin/actives/${companyId}`}
          className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
        >
          <Image src={"/interactive_space.svg"} width={23} height={25} alt="Ver ativos icon" /> Ver ativos
        </Link>
        <Link
          href={`/home/${companyId}`}
          className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
        >
          <MdBugReport size={23} /> Ver riscos
        </Link>
        
      </PopoverContent>
    </Popover>
  );
};

export default PopoverHome;
