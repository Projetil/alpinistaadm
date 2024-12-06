import { IRisk, riskSeverity, riskStatus } from "@/types/IRisk";
import { formatDateToDDMMYYYY } from "@/utils/formatString";
import { IoInformationCircle } from "react-icons/io5";

const Tab1Modal = ({ currentRisk }: { currentRisk?: IRisk }) => {
  return (
    <div>
      <div className="flex w-full justify-between mb-8">
        <h4 className="font-semibold text-[#050506]">Informações principais</h4>
        <IoInformationCircle color="#1A69C4" size={24} />
      </div>
      <div className="flex flex-col md:flex-row gap-8 justify-start text-center text-[#80828D]">
        <div className="flex flex-col gap-3 text-left">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">ID</p>
            <p>{currentRisk ? currentRisk.id : ""}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Estado</p>
            <p>{currentRisk ? riskStatus[currentRisk.status] : ""}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Data limite</p>
            <p>
              {currentRisk ? formatDateToDDMMYYYY(currentRisk.limitDate) : ""}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 text-left">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Nome</p>
            <p>{currentRisk ? currentRisk.name : ""}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Severidade</p>
            <p>{currentRisk ? riskSeverity[currentRisk.riskSeverity] : ""}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Data de correção</p>
            <p>
              {" "}
              {currentRisk ? formatDateToDDMMYYYY(currentRisk.limitDate) : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3">
        <p className="font-semibold text-[#40414A]">Descrição</p>
        <p className="md:w-2/3 text-[#80828D]">
          {currentRisk ? currentRisk.description : ""}
        </p>
      </div>
    </div>
  );
};

export default Tab1Modal;
