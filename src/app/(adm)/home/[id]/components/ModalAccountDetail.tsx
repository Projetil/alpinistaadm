"use client";

import Modal from "@/components/default/Modal";
import { MdBugReport } from "react-icons/md";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";
import Tab1Modal from "./Tab1Modal";
import Tab2Modal from "./Tab2Modal";
import Tab3Modal from "./Tab3Modal";
import { IRisk } from "@/types/IRisk";
import RisksService from "@/services/RisksService";
import { formatDateToDDMMYYYY } from "@/utils/formatString";
import RisksCommentService from "@/services/RisksCommentService";
import RisksHistoricalService from "@/services/RisksHistoricalService";
import { IPagedRisksHistorical } from "@/types/IRisksHistorical";
import { IPagedRisksComment } from "@/types/IRisksComment";
import RisksFileService from "@/services/RisksFilesService";
import { IPagedRiskFile } from "@/types/IRiskFile";
import CustomerService from "@/services/CustomerService";

const ModalAccountDetail = ({
  open,
  setOpen,
  riskId,
  setRiskId,
  setOpenModalEdit,
}: {
  open: boolean;
  setOpen: () => void;
  setOpenModalEdit: () => void;
  riskId?: number;
  setRiskId?: (x: number) => void;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tabs, setTabs] = useState(1);
  const [hideComment, setHideComment] = useState(true);
  const [risk, setRisk] = useState<IRisk>();
  const [responsibleName, setResponsibleName] = useState("");
  const [historicalData, setHistoricalData] = useState<IPagedRisksHistorical>();
  const [commentsData, setCommentsData] = useState<IPagedRisksComment>();
  const [filesData, setFilesData] = useState<IPagedRiskFile>();

  const fetchRisk = async () => {
    try {
      const res = await RisksService.GetById(riskId ?? 0);
      setRisk(res);
      if (res.responsibleCustomerId) {
        const resNameClient = (
          await CustomerService.GetById(res.responsibleCustomerId)
        ).name;
        setResponsibleName(resNameClient);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchComments = async (id: number) => {
    try {
      const res = await RisksCommentService.Get(0, 0, id);
      setCommentsData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchHistorical = async (id: number) => {
    try {
      const res = await RisksHistoricalService.Get(0, 0, id);
      setHistoricalData(res);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchFiles = async (id: number) => {
    try {
      const res = await RisksFileService.Get(0, 0, id);
      setFilesData(res);
    } catch (error) {
      console.log(error);
    }
  };

  useMemo(() => {
    if (riskId) {
      fetchRisk();
      fetchComments(riskId);
      fetchHistorical(riskId);
      fetchFiles(riskId);
    }
  }, [riskId, open]);

  return (
    <Modal isOpen={open} onClose={setOpen}>
      <div className="bg-white py-6 px-3 md:px-10 rounded-lg flex flex-col gap-10 max-h-screen h-full w-full md:min-w-screen">
        <div
          onClick={setOpen}
          className="flex w-full justify-between md:justify-end"
        >
          <h3 className="md:hidden font-semibold text-[#093970]">Detalhes</h3>
          <button>
            <X size={29} color="#D9232B" />
          </button>
        </div>
        <div className="hidden md:flex justify-between items-center gap-20">
          <div className="flex gap-4 items-center justify-start">
            <MdBugReport color="#1A69C4" size={30} />
            <div className="flex flex-col gap-4">
              <h3 className="text-[#050506] font-semibold">{risk?.name}</h3>
              <p className="text-sm text-[#818086]">
                {risk?.assetName}: {risk?.responsibleCustomerId} | Criado em{" "}
                {formatDateToDDMMYYYY(risk?.createdAt ?? "")}
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            {/*  <Button
              onClick={exportToPDF}
              className="border-none text-white bg-[#1A69C4]"
            >
              Exportar
            </Button> */}
            <Button
              onClick={() => {
                console.log(riskId);
                setRiskId?.(riskId ?? 0);
                setOpenModalEdit();
                setOpen();
              }}
              variant={"outline"}
              className="text-[#1A69C4] border-[#1A69C4]"
            >
              Editar
            </Button>
          </div>
        </div>
        <div className="flex flex-row w-full ">
          <div className="w-full flex overflow-x-auto">
            <Button
              onClick={() => setTabs(1)}
              variant={"ghost"}
              className={`${
                tabs == 1
                  ? "font-bold text-[#1A69C4] bg-[#F0F8FF]"
                  : "font-normal text-[#636267]"
              } text-sm w-fit h-full`}
            >
              Geral
            </Button>
            <Button
              onClick={() => setTabs(2)}
              variant={"ghost"}
              className={`${
                tabs == 2
                  ? "font-bold text-[#1A69C4] bg-[#F0F8FF]"
                  : "font-normal text-[#636267]"
              } text-sm w-fit h-full`}
            >
              Detalhamento
            </Button>
            <Button
              onClick={() => {
                setTabs(3);
                setHideComment(true);
              }}
              variant={"ghost"}
              className={`${
                tabs == 3 && hideComment
                  ? "font-bold text-[#1A69C4] bg-[#F0F8FF]"
                  : "font-normal text-[#636267]"
              } text-sm w-fit h-full`}
            >
              Histórico
            </Button>
            <Button
              onClick={() => setHideComment(false)}
              variant={"ghost"}
              className={`${
                !hideComment
                  ? "font-bold text-[#1A69C4] bg-[#F0F8FF]"
                  : "font-normal text-[#636267]"
              } text-sm w-fit h-full flex md:hidden`}
            >
              Comentario
            </Button>
          </div>
        </div>

        {tabs == 1 && (
          <Tab1Modal
            currentRisk={risk}
            nameResponsible={responsibleName}
            filesData={filesData}
          />
        )}
        {tabs == 2 && <Tab2Modal currentRisk={risk} filesData={filesData} />}
        {tabs == 3 && (
          <Tab3Modal
            currentRisk={risk}
            hideComment={hideComment}
            commentsData={commentsData}
            historicalData={historicalData}
            handleComment={() => setHideComment(!hideComment)}
            updateComment={() => fetchComments(riskId ?? 0)}
          />
        )}
      </div>
      {/*  <div>
        <div ref={exportRef}>
          <DownloadRisk currentRisk={risk} />
        </div>
      </div> */}
    </Modal>
  );
};

export default ModalAccountDetail;
