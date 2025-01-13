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
import { Input } from "@/components/ui/input";
import { HiOutlinePencil } from "react-icons/hi2";
import CardActivesMobile from "./components/CardActivesMobile";
import IPManager from "./components/IpManager";
import { GetAssetsResponse } from "@/types/IAssets";
import AssetsService from "@/services/AssetsService";
import { zodResolver } from "@hookform/resolvers/zod";
import { newActiveSchema, NewActiveValues } from "@/utils/schemas/NewActiveSchema";
import { useForm } from "react-hook-form";
const ActivesTablePage = () => {
  const {id} = useParams()
  const [actives, setActives] = useState<GetAssetsResponse>();
  const [sortColumn, setSortColumn] = useState<"Name" | "Ip" | "Description">(
    "Name"
  );
  const [sortDirection, setSortDirection] = useState<"ASC" | "DESC">("DESC");
  const [newActiveOpen, setNewActiveOpen] = useState<boolean>(false);
  const [editActiveOpen, setEditActiveOpen] = useState<boolean>(false);
  const [deleteActiveOpen, setDeleteActiveOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [selectedActiveOption, setSelectedActiveOption] = useState<string>("");
  const navigation = useRouter();

  const {
    register: registerNewActive,
    handleSubmit: handleSubmitNewActive,
    watch: watchNewActive,
    formState: { errors: newActiveErrors },
  } = useForm<NewActiveValues>({
    resolver: zodResolver(newActiveSchema),
  });

  const handleSortDirection = () => {
    setSortDirection(sortDirection === "DESC" ? "ASC" : "DESC");
  };

  const severityType = ["Info", "Baixo", "Médio", "Alto", "Crítico"];
  const activeTypes = ["Infra", "Web", "Mobile", "Domínio", "Pessoa"];
  

  const handleEditActiveOpen = (newValue: boolean) => {
    setEditActiveOpen(newValue);
  };

  const handleDeleteActiveOpen = (newValue: boolean) => {
    setDeleteActiveOpen(newValue);
  };

  const getAssets = async () => {
    if(id){
      const response = await AssetsService.GetAll(parseInt(id as string), page, 10)
      if(response)
        setActives(response)
    }
  }

  useEffect(() => {
    getAssets()
  }, [id, page])

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
              onClick={() => setNewActiveOpen(true)}
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
                    setSortColumn("Name");
                    handleSortDirection();
                  }}
                >
                  ATIVO <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold items-center">
                <div
                  className="flex items-center justify-start gap-2 cursor-pointer"
                  onClick={() => {
                    setSortColumn("Ip");
                    handleSortDirection();
                  }}
                >
                  IP <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => {
                    setSortColumn("Description");
                    handleSortDirection();
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
                  <div className="flex">{row.description}</div>
                </td>
                <td className="py-5 px-4 flex items-center justify-center">
                  <Popover>
                    <PopoverTrigger asChild className="w-full md:w-auto">
                      <SlOptionsVertical className="cursor-pointer text-[#1A69C4]" />
                    </PopoverTrigger>
                    <PopoverContent className="w-52 right-4 top-3 relative flex flex-col gap-2 justify-start items-start">
                      <button
                        onClick={() => setEditActiveOpen(true)}
                        className="p-2 hover:bg-[#E0F3FF] hover:text-[#1A69C4] hover:font-semibold text-[#1E1F24] flex gap-2 items-center rounded-lg w-full"
                      >
                        <HiOutlinePencil size={25} /> Editar
                      </button>

                      <button
                        onClick={() => setDeleteActiveOpen(true)}
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
              deleteModalOpen={handleDeleteActiveOpen}
              editModalOpen={handleEditActiveOpen}
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
              // onClick={confirmDelete}
              className="px-4 py-2 rounded-md bg-red-600 text-white hover:bg-red-700"
            >
              Sim, desejo excluir
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={editActiveOpen} onOpenChange={setEditActiveOpen}>
        <DialogContent className="w-full max-w-screen md:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle className="text-[#093970] font-bold text-xl">
              Editar ativo
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-y-auto flex flex-col gap-2 max-h-[500px]">
            <div className="w-full gap-4 flex flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-2/4">
                <label htmlFor="domain" className="font-semibold">
                  Domínio
                  <span className="text-red-700 font-semibold">*</span>
                </label>
                <Input
                  placeholder="Domínio"
                  className="placeholder:text-[#636267]"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="severity" className="font-semibold">
                  Severidade
                  <span className="text-red-700 ">*</span>
                </label>
                <select
                  className="h-10 rounded-md border pl-3"
                  defaultValue={"selectValue"}
                >
                  <option disabled value="selectValue">
                    Selecione uma opção
                  </option>
                  {severityType.map((item, index) => (
                    <option key={index} value={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="type" className="font-semibold">
                  Tipo<span className="text-red-700">*</span>
                </label>
                <select
                  className="h-10 rounded-md border pl-3"
                  defaultValue={"selectValue"}
                  onChange={(e) => {
                    setSelectedActiveOption(e.target.value);
                  }}
                >
                  <option disabled value="selectValue">
                    Selecione uma opção
                  </option>
                  {activeTypes.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedActiveOption === "Pessoa" ? (
              <div className="flex flex-col w-full md:w-1/2 md:pr-3">
                <label htmlFor="email" className="font-semibold">
                  E-mail
                </label>
                <Input
                  placeholder="E-mail"
                  className="placeholder:text-[#636267]"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="w-full gap-4 flex flex-col md:flex-row">
            <IPManager selectedActiveOption={selectedActiveOption}/>
              
            </div>
            <div className="w-full gap-4 flex">
              <div className="flex flex-col w-full">
                <label htmlFor="description">Descrição</label>
                <textarea
                  placeholder="Default"
                  name="description"
                  className="h-[168px] border p-3 rounded-md w-full border-[#D7D7DA] placeholder:text-[#636267]"
                ></textarea>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant={"outline"}
                onClick={() => setDeleteActiveOpen(false)}
                className="px-4 py-2 rounded-md text-[#5CA7FF] border-[#5CA7FF] hover:bg-gray-300"
              >
                Cancelar
              </Button>
              <button className="px-4 py-2 rounded-md bg-[#3088EE] text-white hover:bg-[#2a76ce]">
                Salvar
              </button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog open={newActiveOpen} onOpenChange={setNewActiveOpen}>
        <DialogContent className="w-full max-w-screen md:max-w-[1000px]">
          <DialogHeader>
            <DialogTitle className="text-[#093970] font-bold text-xl">
              Novo ativo
            </DialogTitle>
          </DialogHeader>
          <form className="overflow-y-auto flex flex-col gap-2 max-h-[500px]">
            <div className="w-full gap-4 flex flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-2/4">
                <label htmlFor="domain" className="font-semibold">
                  Domínio
                  <span className="text-red-700 font-semibold">*</span>
                </label>
                <Input
                  placeholder="Domínio"
                  className="placeholder:text-[#636267]"
                />
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="severity" className="font-semibold">
                  Severidade
                  <span className="text-red-700 ">*</span>
                </label>
                <select
                  className="h-10 rounded-md border pl-3"
                  defaultValue={"selectValue"}
                >
                  <option disabled value="selectValue">
                    Selecione uma opção
                  </option>
                  {severityType.map((item, index) => (
                    <option key={index} value={index}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col w-full md:w-1/4">
                <label htmlFor="type" className="font-semibold">
                  Tipo<span className="text-red-700">*</span>
                </label>
                <select
                  className="h-10 rounded-md border pl-3"
                  defaultValue={"selectValue"}
                  onChange={(e) => {
                    setSelectedActiveOption(e.target.value);
                  }}
                >
                  <option disabled value="selectValue">
                    Selecione uma opção
                  </option>
                  {activeTypes.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {selectedActiveOption === "Pessoa" ? (
              <div className="flex flex-col w-full md:w-1/2 md:pr-3">
                <label htmlFor="email" className="font-semibold">
                  E-mail
                </label>
                <Input
                  placeholder="E-mail"
                  className="placeholder:text-[#636267]"
                />
              </div>
            ) : (
              <></>
            )}
            <div className="w-full gap-4 flex flex-col md:flex-row">
              <IPManager selectedActiveOption={selectedActiveOption}/>
            </div>
            <div className="w-full gap-4 flex">
              <div className="flex flex-col w-full">
                <label htmlFor="description">Descrição</label>
                <textarea
                  placeholder="Default"
                  name="description"
                  className="h-[168px] border p-3 rounded-md w-full border-[#D7D7DA] placeholder:text-[#636267]"
                ></textarea>
              </div>
            </div>
            <DialogFooter className="gap-2">
              <Button
                variant={"outline"}
                onClick={() => setDeleteActiveOpen(false)}
                className="px-4 py-2 rounded-md text-[#5CA7FF] border-[#5CA7FF] hover:bg-gray-300"
              >
                Cancelar
              </Button>
              <button className="px-4 py-2 rounded-md bg-[#3088EE] text-white hover:bg-[#2a76ce]">
                Adicionar
              </button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </main>
  );
};

export default ActivesTablePage;
