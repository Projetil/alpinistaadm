import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardAtivosMobile from "./CardAtivosMobile";
import { IPagedGroupRisk } from "@/types/IRisk";
import { useEffect, useState } from "react";
import RisksService from "@/services/RisksService";
import {
  translateEnum,
  translateRiskSeverity,
  translateRiskStatus,
} from "@/utils/translateEnums";

const AtivosTable = ({
  groupName,
  columnName,
}: {
  groupName: string;
  columnName: string;
}) => {
  const [page, setPage] = useState(1);
  const [risks, setRisks] = useState<IPagedGroupRisk>();
  const [orderBy, setOrderBy] = useState("GroupName");
  const [orderDirection, setOrderDirection] = useState(true);

  const fetchData = async () => {
    try {
      const res = await RisksService.GetByColumn(
        groupName,
        page,
        10,
        orderBy,
        orderDirection ? "asc" : "desc"
      );
      setRisks(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (groupName) {
      fetchData();
    }
  }, [groupName, page, orderBy, orderDirection]);

  return (
    <section className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setOrderBy("GroupName");
                  setOrderDirection(!orderDirection);
                }}
              >
                {columnName}
                <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setOrderBy("TotalRisks");
                  setOrderDirection(!orderDirection);
                }}
              >
                ITENS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div className="flex items-center gap-2 cursor-pointer">
                GRAU DE SEVERIDADE
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div className="flex items-center gap-2 cursor-pointer">
                STATUS
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {risks?.items.map((row, index) => (
            <tr
              key={index}
              className={`${
                index === 0 ? "" : "border-t border-gray-200"
              } text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">
                  {groupName == "RiskSeverity"
                    ? translateRiskSeverity(row.groupName)
                    : groupName == "Origin"
                    ? translateEnum(row.groupName)
                    : groupName == "Status"
                    ? translateRiskStatus(row.groupName)
                    : row.groupName}
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">{row.totalRisks}</div>
              </td>
              <td className={`py-3 px-4 text-sm flex gap-2`}>
                <div
                  className={`bg-[#FF5C63] text-[#FFFFFF] w-8 h-8 p-2 font-bold`}
                >
                  {row.severityCounts["Critical"] || 0}
                </div>
                <div
                  className={`bg-[#FFDDD8] text-[#FF583F] w-8 h-8 p-2 font-bold`}
                >
                  {row.severityCounts["High"] || 0}
                </div>
                <div
                  className={`bg-[#FFBB5C] text-[#FFFFFF] w-8 h-8 p-2 font-bold`}
                >
                  {row.severityCounts["Medium"] || 0}
                </div>
                <div
                  className={`bg-[#5CA7FF] text-[#FFFFFF] w-8 h-8 p-2 font-bold`}
                >
                  {row.severityCounts["Low"] || 0}
                </div>
                <div
                  className={`bg-[#D1EBFF] text-[#1A69C4] w-8 h-8 p-2 font-bold`}
                >
                  {row.severityCounts["Info"] || 0}
                </div>
              </td>
              <td className={`py-3 px-4 text-sm`}>
                <div className="flex gap-2">
                  <div
                    className={`w-9 h-9 rounded-full bg-[#FFA35C] text-[#050506] p-2 font-bold`}
                  >
                    {row.statusCounts["Pending"] || 0}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#FFCE5C] text-[#050506] p-2 font-bold`}
                  >
                    {row.statusCounts["InProgress"] || 0}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#A7F04F] text-[#050506] p-2 font-bold`}
                  >
                    {row.statusCounts["Fixed"] || 0}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#5CBEFF] text-[#080852] p-2 font-bold`}
                  >
                    {row.statusCounts["Accepted"] || 0}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#4FF0D2] text-[#050506] p-2 font-bold`}
                  >
                    {row.statusCounts["Retest"] || 0}
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#A8A8A8] text-[#FFFFFF] p-2 font-bold`}
                  >
                    {row.statusCounts["Reopened"] || 0}
                  </div>
                  {/*  <div
                    className={`w-9 h-9 rounded-full bg-[#FF5C63] text-[#FFFFFF] p-2 font-bold`}
                  >
                    00
                  </div> */}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-4 md:hidden p-4">
        {risks?.items.map((x, index) => (
          <CardAtivosMobile
            openModalDetails={() => {}}
            key={index}
            name={x.groupName}
          />
        ))}
      </div>
      <Pagination
        pageIndex={page}
        perPage={10}
        handlePage={setPage}
        totalCount={risks?.totalItems}
      />
    </section>
  );
};

export default AtivosTable;
