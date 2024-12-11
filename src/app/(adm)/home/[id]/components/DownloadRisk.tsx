import { IRisk, riskSeverity, riskStatus } from "@/types/IRisk";
import { formatDateToDDMMYYYY } from "@/utils/formatString";
import { IoInformationCircle } from "react-icons/io5";

const DownloadRisk = ({ currentRisk }: { currentRisk?: IRisk }) => {
  return (
    <>
      <div>
        <div className="flex w-full justify-between mb-2 p-1">
          <h4 className="font-semibold text-[#050506]">
            Informações principais
          </h4>
          <IoInformationCircle color="#1A69C4" size={24} />
        </div>
        <div className="flex gap-1 flex-col justify-start text-center text-[#80828D] m-2">
          <div className="flex gap-2 justify-between  text-left">
            <div className="flex flex-col gap-1 ">
              <p className="font-semibold text-[#40414A] text-sm">ID</p>
              <p className="text-sm">{currentRisk ? currentRisk.id : ""}</p>
            </div>
            <div className="flex flex-col gap-1 ">
              <p className="font-semibold text-[#40414A] text-sm">Estado</p>
              <p className="text-sm">
                {currentRisk ? riskStatus[currentRisk.status] : ""}
              </p>
            </div>
            <div className="flex flex-col gap-1  ">
              <p className="font-semibold text-[#40414A] text-sm">
                Data limite
              </p>
              <p className="text-sm">
                {currentRisk && currentRisk.limitDate
                  ? formatDateToDDMMYYYY(currentRisk.limitDate)
                  : ""}
              </p>
            </div>
          </div>
          <div className="flex gap-2 justify-between text-left">
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-semibold text-[#40414A]">Nome</p>
              <p>{currentRisk ? currentRisk.name : ""}</p>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-semibold text-[#40414A]">Severidade</p>
              <p>{currentRisk ? riskSeverity[currentRisk.riskSeverity] : ""}</p>
            </div>
            <div className="flex flex-col gap-1 text-sm">
              <p className="font-semibold text-[#40414A]">Data de correção</p>
              <p>
                {" "}
                {currentRisk && currentRisk.limitDate
                  ? formatDateToDDMMYYYY(currentRisk.limitDate)
                  : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-3 m-2 ">
          <p className="font-semibold text-[#40414A]">Descrição</p>
          <p className="md:w-2/3 text-[#80828D]">
            {currentRisk ? currentRisk.description : ""}
          </p>
        </div>
      </div>
      <div className="bg-[#FBFBFB] p-1 rounded-lg">
        <div className="flex w-full justify-between mb-2">
          <h4 className="font-semibold text-[#050506]">Detalhamento</h4>
          <IoInformationCircle color="#1A69C4" size={24} />
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-full p-4 space-y-1  rounded-xl ">
            <div className="flex justify-between items-center w-full text-left">
              <span className="font-semibold text-[#1A69C4]">Observações</span>
            </div>
            <div className="p-2 mt-1 space-y-1  rounded-lg ">
              <p
                className="font-light text-[#636267]"
                dangerouslySetInnerHTML={{
                  __html: currentRisk?.observations ?? "",
                }}
              ></p>
            </div>
          </div>
          <div className="w-full p-2 space-y-1  rounded-xl ">
            <div className="flex justify-between items-center w-full text-left">
              <span className="font-semibold text-[#1A69C4]">
                Plano de ação
              </span>
            </div>
            <div className="p-2 mt-1 space-y-1  rounded-lg ">
              <p
                className="font-light text-[#636267]"
                dangerouslySetInnerHTML={{
                  __html: currentRisk?.actionPlan ?? "",
                }}
              ></p>
            </div>
          </div>
          <div className="w-full p-2 space-y-1  rounded-xl ">
            <div className="flex justify-between items-center w-full text-left">
              <span className="font-semibold text-[#1A69C4]">Evidências</span>
            </div>
            <div className="p-2 mt-1 space-y-1  rounded-lg ">
              <p
                className="font-light text-[#636267]"
                dangerouslySetInnerHTML={{
                  __html: currentRisk?.evidences ?? "",
                }}
              ></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DownloadRisk;
