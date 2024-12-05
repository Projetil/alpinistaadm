import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check } from "lucide-react";
import { FaAngleDown } from "react-icons/fa";

const classiNames = [
  "Padrão",
  "Ativos",
  "Ambiente",
  "Severidade",
  "Responsável",
  "Origem",
  "Estado",
];

const PopoverClassify = ({
  selected,
  setSelected,
}: {
  selected: string;
  setSelected: (x: string) => void;
}) => {
  return (
    <Popover>
      <PopoverTrigger asChild className="w-full md:w-auto">
        <Button
          variant={"outline"}
          className="text-[#5CA7FF]  border-[#5CA7FF] font-semibold"
        >
          Classificar <FaAngleDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-fit">
        <div className="flex flex-col gap-4">
          {classiNames.map((x, index) => (
            <Button
              onClick={() => setSelected(x)}
              key={index}
              className={`rounded-xl font-normal hover:bg-[#E0F3FF] ${
                selected == x
                  ? "bg-[#E0F3FF] text-[#093970] "
                  : "bg-[#EEEEF0] text-[#636267]"
              }`}
            >
              {selected == x && <Check />}
              {x}
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverClassify;
