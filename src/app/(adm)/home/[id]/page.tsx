"use client";
import { useEffect, useRef, useState } from "react";
import { GoHomeFill } from "react-icons/go";
import { jsPDF } from "jspdf";
import { GoChecklist } from "react-icons/go";
import html2canvas from "html2canvas";
import { useParams, useRouter } from "next/navigation";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { Plus } from "lucide-react";

import PopoverClassify from "./components/PopoverClassify";
import ModalNewRisk from "./components/ModalNewRisk";
import AtivosTable from "./components/AtivosTable";
import ModalAccountDetail from "./components/ModalAccountDetail";
import AccountTable from "./components/AccountTable";
import { Button } from "@/components/ui/button";
import { IPagedRisk } from "@/types/IRisk";
import RisksService from "@/services/RisksService";
import CompanyService from "@/services/CompanyService";

export default function CompanyIndPage() {
  const { id } = useParams();
  const navigate = useRouter();
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [risks, setRisks] = useState<IPagedRisk>();
  const [companyName, setCompanyName] = useState<string>();
  const [selected, setSelected] = useState("Padrão");
  const [openModalDetails, setOpenModalDetails] = useState(false);
  const [openedRiskId, setOpenedRiskId] = useState<number>();
  const [editRiskId, setEditRiskId] = useState<number>();
  const ativosRef = useRef<HTMLDivElement>(null);

  const fetchRisks = async () => {
    try {
      const res = await RisksService.Get(page, 10, undefined, Number(id));
      setRisks(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCompany = async () => {
    try {
      const { name } = await CompanyService.GetById(Number(id));
      setCompanyName(name);
    } catch (error) {
      console.log(error);
    }
  };

  const exportToPDF = async () => {
    if (!ativosRef.current) return;
    const canvas = await html2canvas(ativosRef.current, { scale: 2 });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("ativos_table.pdf");
  };

  useEffect(() => {
    fetchRisks();
  }, [page, openModal]);

  useEffect(() => {
    fetchCompany();
  }, []);

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
            <Button
              onClick={exportToPDF}
              className="text-white bg-[#3088EE] border-none items-center"
            >
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
          <p className="font-semibold text-[#8C8B91]">Home / {companyName}</p>
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
        <div ref={ativosRef}>
          <AtivosTable
            risks={risks}
            openModal={() => setOpenModalDetails(!openModalDetails)}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            columnName={"NOME DO ATIVO"}
            columnType={"active"}
          />
        </div>
      )}
      {selected == "Ambiente" && (
        <AtivosTable
          risks={risks}
          openModal={() => setOpenModalDetails(!openModalDetails)}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
          columnName={"NOME DO AMBIENTE"}
          columnType={"environment"}
        />
      )}
      {selected == "Severidade" && (
        <AtivosTable
          risks={risks}
          openModal={() => setOpenModalDetails(!openModalDetails)}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
          columnName={"SEVERIDADE"}
          columnType={"riskSeverity"}
        />
      )}
      {selected == "Responsável" && (
        <AtivosTable
          risks={risks}
          openModal={() => setOpenModalDetails(!openModalDetails)}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
          columnName={"RESPONSAVEL"}
          columnType={"responsibleCustomerId"}
        />
      )}
      {selected == "Origem" && (
        <AtivosTable
          risks={risks}
          openModal={() => setOpenModalDetails(!openModalDetails)}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
          columnName={"ORIGEM"}
          columnType={""}
        />
      )}
      {selected == "Estado" && (
        <AtivosTable
          risks={risks}
          openModal={() => setOpenModalDetails(!openModalDetails)}
          currentPage={page}
          setCurrentPage={setPage}
          setRiskId={(x: number) => setOpenedRiskId(x)}
          columnName={"STATUS"}
          columnType={"status"}
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
