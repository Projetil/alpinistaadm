"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV, FaRegTrashAlt } from "react-icons/fa";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { SlOptionsVertical } from "react-icons/sl";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import { MdArrowBackIosNew } from "react-icons/md";
import { HiOutlinePencil } from "react-icons/hi2";
import CardActivesMobile from "./components/CardActivesMobile";
import { GetAssetsResponse } from "@/types/IAssets";
import AssetsService from "@/services/AssetsService";
import CreteActiveDialog from "./components/CreateActiveDialog";
import { toast } from "react-toastify";

const ActivesTablePage = () => {
  const { id } = useParams();
  const [actives, setActives] = useState<GetAssetsResponse>();
  const [newActiveOpen, setNewActiveOpen] = useState<boolean>(false);
  const [deleteActiveOpen, setDeleteActiveOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [assetsFocus, setAssetsFocus] = useState<number>(0);
  const navigation = useRouter();
  const [orderBy, setOrderBy] = useState("Hostname");
  const [orderDirection, setOrderDirection] = useState(true);

  const getAssets = async () => {
    if (id) {
      const response = await AssetsService.GetAll(
        page,
        10,
        orderBy,
        orderDirection ? "asc" : "desc",
        parseInt(id as string)
      );
      if (response) setActives(response);
    }
  };

  const onDeleteAssets = async (id: number) => {
    try {
      const response = await AssetsService.Delete(id);
      if (response) {
        toast.success("Ativo excluído com sucesso");
        setDeleteActiveOpen(false);
        getAssets();
      }
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir ativo");
    }
  };

  useEffect(() => {
    getAssets();
  }, [id, page, newActiveOpen, orderBy, orderDirection]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className="hidden md:flex flex-col md:gap-10 items-start">
        <div className="flex gap-4 w-full justify-between items-center text-[#050506]">
          <div className="flex items-center space-x-3">
            <div
              className="bg-white w-8 h-12 rounded-md flex items-center justify-center cursor-pointer"
              onClick={() => navigation.back()}
            >
              <MdArrowBackIosNew size={23} color="#3088EE" />
            </div>
            <div className="bg-white w-12 h-12 rounded-md flex items-center justify-center">
              <Image
                src={"/interactive_space_blue.svg"}
                width={22}
                height={22}
                alt="icon"
              />
            </div>
            <h2 className="font-semibold md:text-3xl">
              Ativos: Enterprise S.A
            </h2>
          </div>
          <div>
            <Button
              className="bg-[#3088EE] hover:bg-[#013073]"
              onClick={() => {
                setNewActiveOpen(true);
                setAssetsFocus(0);
              }}
            >
              <span className="text-2xl font-extralight">+</span> Novo ativo
            </Button>
          </div>
        </div>
      </section>
      <div className="w-full overflow-x-auto md:bg-white rounded-md">
        <table className="min-w-full hidden md:table">
          <thead className="border-none">
            <tr className="text-[#636267] text-center">
              <th className="py-3 px-4 text-sm font-semibold items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setOrderBy("Hostname");
                    setOrderDirection(!orderDirection);
                  }}
                >
                  ATIVO <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold items-center">
                <div
                  className="flex items-center justify-start gap-2 cursor-pointer"
                  onClick={() => {
                    setOrderBy("Ip");
                    setOrderDirection(!orderDirection);
                  }}
                >
                  IP <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setOrderBy("Description");
                    setOrderDirection(!orderDirection);
                  }}
                >
                  DESCRIÇÃO <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {actives?.items.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index === 0 ? "" : "border-t border-gray-200"
                } text-[#636267] text-center`}
              >
                <td className="py-5 px-4 text-sm max-w-[200px]">
                  <div className="flex">{row.hostname}</div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex justify-start">{row.ip}</div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex">
                    {row.description?.length > 22
                      ? `${row.description.substring(0, 22)}...`
                      : row.description}
                  </div>
                </td>
                <td className="py-5 px-4 flex items-center justify-center">
                  <Popover>
                    <PopoverTrigger asChild className="w-full md:w-auto">
                      <SlOptionsVertical className="cursor-pointer text-[#1A69C4]" />
                    </PopoverTrigger>
                    <PopoverContent className="w-52 right-4 top-3 relative flex flex-col gap-2 justify-start items-start">
                      <button
                        onClick={() => {
                          setNewActiveOpen(true);
                          setAssetsFocus(row.id);
                        }}
                        className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
                      >
                        <HiOutlinePencil size={25} /> Editar
                      </button>

                      <button
                        onClick={() => {
                          setDeleteActiveOpen(true);
                          setAssetsFocus(row.id);
                        }}
                        className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
                      >
                        <FaRegTrashAlt size={25} /> Excluir
                      </button>
                    </PopoverContent>
                  </Popover>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {actives?.items.map((x, index) => (
            <CardActivesMobile
              key={index}
              actives={x}
              deleteModalOpen={() => setDeleteActiveOpen(!deleteActiveOpen)}
              editModalOpen={() => setNewActiveOpen(!newActiveOpen)}
            />
          ))}
        </div>
        <Pagination
          pageIndex={page}
          perPage={10}
          handlePage={setPage}
          totalCount={actives?.totalItems}
        />
      </div>

      <Dialog open={deleteActiveOpen} onOpenChange={setDeleteActiveOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-[#093970]">
              Tem certeza que deseja excluir o ativo?
            </DialogTitle>
            <DialogDescription className="text-[#093970]">
              Tem certeza de que deseja excluir este ativo? Essa ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="gap-2">
            <button
              onClick={() => setDeleteActiveOpen(false)}
              className="px-4 py-2 rounded-md text-[#5CA7FF] hover:bg-gray-300"
            >
              Cancelar
            </button>
            <button
              onClick={() => onDeleteAssets(assetsFocus)}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Sim, desejo excluir
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <CreteActiveDialog
        editFocus={assetsFocus}
        newActiveOpen={newActiveOpen}
        setNewActiveOpen={setNewActiveOpen}
        companyId={parseInt(id as string)}
      />
    </main>
  );
};

export default ActivesTablePage;
