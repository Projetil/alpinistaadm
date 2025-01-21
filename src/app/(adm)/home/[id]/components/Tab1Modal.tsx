"use client";
import { IRisk, riskSeverity, riskStatus } from "@/types/IRisk";
import { IPagedRiskFile } from "@/types/IRiskFile";
import { formatDateToDDMMYYYY } from "@/utils/formatString";
import Image from "next/image";
import { IoInformationCircle } from "react-icons/io5";

const Tab1Modal = ({
  currentRisk,
  nameResponsible,
  filesData,
}: {
  currentRisk?: IRisk;
  nameResponsible?: string;
  filesData?: IPagedRiskFile;
}) => {
  return (
    <div className="bg-[#FBFBFB] p-3 rounded-lg overflow-y-auto">
      <div className="flex w-full justify-between mb-8 ">
        <h4 className="font-semibold text-[#050506]">Informações principais</h4>
        <IoInformationCircle color="#1A69C4" size={24} />
      </div>
      <div className="flex flex-col md:flex-row gap-4 md:gap-20 justify-start text-center text-[#80828D]">
        <div className="flex flex-col gap-3 text-left">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">ID</p>
            <p>{currentRisk ? currentRisk.id : ""}</p>
          </div>
          <div className="flex flex-col gap-3 text-left">
            <div className="flex flex-col gap-2">
              <p className="font-semibold text-[#40414A]">
                Nome do responsável
              </p>
              <p>{nameResponsible ? nameResponsible : ""}</p>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Estado</p>
            <p>{currentRisk ? riskStatus[currentRisk.status] : ""}</p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-[#40414A]">Data limite</p>
            <p>
              {currentRisk && currentRisk.limitDate
                ? formatDateToDDMMYYYY(currentRisk.limitDate)
                : ""}
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
              {currentRisk && currentRisk.updatedAt
                ? formatDateToDDMMYYYY(currentRisk.updatedAt)
                : ""}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-3 overflow-auto">
        <p className="font-semibold text-[#40414A]">Descrição</p>
        <div>
          <p
            dangerouslySetInnerHTML={{
              __html: currentRisk ? currentRisk.description : "",
            }}
            className="text-[#80828D] overflow-auto break-words"
          ></p>
          {filesData?.items
            .filter((x) => x.type == 1)
            .map((file) => (
              <Image
                key={file.id}
                src={file.riskFileUrl}
                loader={({ src, quality }) => {
                  return `${src}?w=${32}&h=${32}&q=${quality || 75}`;
                }}
                alt="imagem do arquivo"
                width={300}
                height={300}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Tab1Modal;
