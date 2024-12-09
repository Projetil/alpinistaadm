import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardAccountMobile from "./CardAccountMobile";
import { Dispatch, SetStateAction, useState } from "react";
import { IPagedRisk, riskSeverity, riskStatus } from "@/types/IRisk";

const AccountTable = ({
  openModal,
  risks,
  currentPage,
  setCurrentPage,
  setRiskId,
}: {
  openModal: () => void;
  risks?: IPagedRisk;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setRiskId: (x: number) => void;
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedRisks = [...(risks?.items || [])].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
    }

    return 0;
  });

  const handleSort = (key: string) => {
    setSortConfig((prevConfig) => {
      if (prevConfig?.key === key) {
        return {
          key,
          direction: prevConfig.direction === "asc" ? "desc" : "asc",
        };
      }
      return { key, direction: "asc" };
    });
  };

  return (
    <section className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("id")}
              >
                ID <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                NOME <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("active")}
              >
                ATIVO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                ESTADO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("riskSeverity")}
              >
                SEVERIDADE <FaArrowsAltV />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {sortedRisks.map((row, index) => (
            <tr
              onClick={() => {
                openModal();
                setRiskId(row.id);
              }}
              key={index}
              className={`${
                index === 0 ? "" : "border-t border-gray-200"
              } text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.id}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">{row.name}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">{row.active ? "Yes" : "No"}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">{riskStatus[Number(row.status)]}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">
                  {riskSeverity[Number(row.riskSeverity)]}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-4 md:hidden p-4">
        {risks?.items.map((x, index) => (
          <CardAccountMobile
            key={index}
            id={x.id}
            name={x.name}
            active={x.active}
            state={riskStatus[Number(x.status)]}
            severidade={riskSeverity[Number(x.riskSeverity)]}
          />
        ))}
      </div>
      <Pagination
        pageIndex={currentPage}
        perPage={10}
        handlePage={setCurrentPage}
        totalCount={risks?.totalItems}
      />
    </section>
  );
};

export default AccountTable;
