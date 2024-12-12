import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { HiOutlinePencil } from "react-icons/hi2";
import { FaRegTrashAlt } from "react-icons/fa";
import { SlOptionsVertical } from "react-icons/sl";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const PopoverAdm = ({
  admId,
  onDeleteAdm,
  onEditAdm,
  setOpenModal,
}: {
  admId: number;
  onDeleteAdm: (x: number) => void;
  onEditAdm: (x: number) => void;
  setOpenModal: () => void;
}) => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const confirmDelete = () => {
    onDeleteAdm(admId);
    setDialogOpen(false);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="w-full md:w-auto">
        <SlOptionsVertical className="cursor-pointer text-[#1A69C4]" />
      </PopoverTrigger>
      <PopoverContent className="w-52 right-4 top-3 relative flex flex-col gap-2 justifty-start items-start">
        <button
          onClick={() => {
            onEditAdm(admId);
            setOpenModal();
          }}
          className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] text-[#1E1F24] flex gap-2 items-center hover:font-semibold rounded-lg w-full"
        >
          {" "}
          <HiOutlinePencil size={25} /> Editar
        </button>
        <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setDialogOpen(true)}
              className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
            >
              <FaRegTrashAlt size={25} /> Excluir
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-[#093970]">
                Tem certeza que deseja excluir sua conta?
              </DialogTitle>
              <DialogDescription className="text-[#093970]">
                Tem certeza de que deseja excluir este cliente? Essa ação não
                pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2">
              <button
                onClick={() => setDialogOpen(false)}
                className="px-4 py-2 rounded-md text-[#5CA7FF] hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
              >
                Sim, desejo excluir
              </button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverAdm;
