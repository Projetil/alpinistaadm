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
  const [orderColumn, setOrderColumn] = useState("Id");
  const [orderDirection, setOrderDirection] = useState(true);

  const fetchRisks = async () => {
    try {
      const res = await RisksService.Get(
        page,
        10,
        undefined,
        Number(id),
        orderColumn,
        orderDirection ? "asc" : "desc"
      );
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
  }, [page, openModal, orderColumn, orderDirection]);

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
          <Button
            onClick={() => setOpenModal(!openModal)}
            className="text-white bg-[#3088EE] border-none "
          >
            <Plus /> Novo risco
          </Button>

          <Button
            onClick={exportToPDF}
            className="text-white bg-[#3088EE] border-none items-center"
          >
            <GoChecklist /> Exportar
          </Button>

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
      <div ref={ativosRef}>
        {selected == "Padrão" && (
          <AccountTable
            openModal={() => setOpenModalDetails(!openModalDetails)}
            risks={risks}
            currentPage={page}
            setCurrentPage={setPage}
            setRiskId={(x: number) => setOpenedRiskId(x)}
            setNameColumn={(x: string) => setOrderColumn(x)}
            setDirectionColumn={() => setOrderDirection(!orderDirection)}
          />
        )}
        {selected == "Ativos" && (
          <AtivosTable columnName={"NOME DO ATIVO"} groupName={"AssetId"} />
        )}
        {selected == "Ativos Ignorados" && (
          <AtivosTable
            columnName={"NOME DO ATIVO IGNORADO"}
            groupName={"NonAsset"}
          />
        )}
        {selected == "Ambiente" && (
          <AtivosTable
            columnName={"NOME DO AMBIENTE"}
            groupName={"environment"}
          />
        )}
        {selected == "Severidade" && (
          <AtivosTable columnName={"SEVERIDADE"} groupName={"RiskSeverity"} />
        )}
        {selected == "Responsável" && (
          <AtivosTable
            groupName={"ResponsibleCustomerId"}
            columnName={"RESPONSAVEL"}
          />
        )}
        {selected == "Origem" && (
          <AtivosTable columnName={"ORIGEM"} groupName={"Origin"} />
        )}
        {selected == "Estado" && (
          <AtivosTable columnName={"STATUS"} groupName={"Status"} />
        )}
      </div>

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
