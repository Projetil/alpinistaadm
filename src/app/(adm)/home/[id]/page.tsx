"use client";
import { GoHomeFill } from "react-icons/go";
import AccountTable from "./components/AccountTable";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import PopoverClassify from "./components/PopoverClassify";
import { useEffect, useState } from "react";
import ModalNewRisk from "./components/ModalNewRisk";
import AtivosTable from "./components/AtivosTable";
import { GoChecklist } from "react-icons/go";
import ModalAccountDetail from "./components/ModalAccountDetail";
import { IPagedRisk } from "@/types/IRisk";
import RisksService from "@/services/RisksService";

export default function CompanyIndPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [risks, setRisks] = useState<IPagedRisk>();
  const [selected, setSelected] = useState("Padrão");
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openedRiskId, setOpenedRiskId] = useState<number>();
  const [editRiskId, setEditRiskId] = useState<number>();

  const fetchRisks = async () => {
    try {
      const res = await RisksService.Get(page, 10, undefined, Number(id));
      setRisks(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRisks();
  }, [page, openModal]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className=" hidden md:flex md:gap-10 items-start md:mb-5 justify-between w-full">
        <div className="flex gap-4 items-center text-[#050506]">
          <GoHomeFill color="#3088EE" size={24} />
          <h2 className="font-semibold md:text-3xl">Home</h2>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          {selected == "Padrão" && (
            <Button
              onClick={() => setOpenModal(!openModal)}
              className="text-white bg-[#3088EE] border-none "
            >
              <Plus /> Novo risco
            </Button>
          )}
          {selected == "Ativos" && (
            <Button className="text-white bg-[#3088EE] border-none items-center">
              <GoChecklist /> Exportar
            </Button>
          )}
          <PopoverClassify selected={selected} setSelected={setSelected} />
        </div>
      </section>
      <section>
        <button
          className="flex items-center justify-start gap-4"
          onClick={() => navigate.push(`/home`)}
        >
          <FaRegArrowAltCircleLeft size={28} color="#C9001C" />
          <p className="font-semibold text-[#8C8B91]">Home / Enterprise S.A</p>
        </button>
        <div className="block md:hidden mt-6">
          <PopoverClassify selected={selected} setSelected={setSelected} />
        </div>
      </section>
      {selected == "Padrão" && (
        <AccountTable
          openModal={() => setOpenModalDetails(!openModalDetails)}
          risks={risks}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
        />
      )}
      {selected == "Ativos" && (
        <AtivosTable
          risks={risks}
          openModal={() => setOpenModalDetails(!openModalDetails)}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
        />
      )}
      {selected == "Padrão" && (
        <>
          <button
            onClick={() => setOpenModal(!openModal)}
            className="fixed bottom-10 right-10 md:hidden bg-[#3088EE] w-12 h-12 rounded-xl flex items-center justify-center"
          >
            <Plus color="#F8F8F8" size={30} />
          </button>

          <ModalNewRisk
            riskId={editRiskId}
            open={openModal}
            setOpen={() => setOpenModal(!openModal)}
            setRiskId={(x: number) => setEditRiskId(x)}
          />
        </>
      )}
      <ModalAccountDetail
        riskId={openedRiskId}
        setRiskId={(x: number) => setEditRiskId(x)}
        setOpenModalEdit={() => setOpenModal(!openModal)}
        open={openModalDetails}
        setOpen={() => setOpenModalDetails(!openModalDetails)}
      />
    </main>
  );
}
