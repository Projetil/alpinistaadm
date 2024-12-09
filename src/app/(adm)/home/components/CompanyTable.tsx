"use client";
import { Pagination } from "@/components/default/Pagination";
import { Button } from "@/components/ui/button";
import { FaArrowsAltV } from "react-icons/fa";
import CompanyCard from "./CardTableMobile";
import { useRouter } from "next/navigation";
import { IPagedCompany } from "@/types/ICompany";
import { formatDateToDDMMYYYY } from "@/utils/formatString";
import { useState } from "react";

const CompanyTable = ({
  companies,
  pageNumber,
  setPageNumber,
}: {
  companies?: IPagedCompany;
  pageNumber: number;
  setPageNumber: (x: number) => void;
}) => {
  const navigate = useRouter();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedCompanies = [...(companies?.items || [])].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key as keyof typeof a];
    const bValue = b[key as keyof typeof b];

    if (typeof aValue === "string" && typeof bValue === "string") {
      return direction === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return direction === "asc"
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
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
    <div className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("name")}
              >
                EMPRESA <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("status")}
              >
                STATUS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("createdAt")}
              >
                DATA DE CADASTRO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold">
              <div className="flex items-center gap-2">DATA DE ATUALIZAÇÃO</div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {sortedCompanies.map((row, index) => (
            <tr
              key={index}
              className={`${
                index == 0 ? "" : "border-t border-gray-200"
              } text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.name}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">
                  {row.status == 1 ? "Ativo" : "Inativo"}
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">
                  {formatDateToDDMMYYYY(row.createdAt)}
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">
                  {formatDateToDDMMYYYY(row.createdAt)}
                </div>
              </td>
              <td className="py-3 px-4">
                <Button
                  onClick={() => navigate.push(`/home/${row.id}`)}
                  className="py-2 px-4 text-white text-xs font-semibold rounded-lg bg-[#3088EE]"
                >
                  Visualizar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {companies?.items.map((x, index) => {
          return (
            <CompanyCard
              key={index}
              companyId={x.id}
              companyName={x.name}
              status={x.status == 1 ? "Ativo" : "Inativo"}
              registrationDate={formatDateToDDMMYYYY(x.createdAt)}
              updateDate={formatDateToDDMMYYYY(x.createdAt)}
            />
          );
        })}
      </div>
      <Pagination
        pageIndex={pageNumber}
        perPage={10}
        handlePage={setPageNumber}
        totalCount={companies?.totalItems}
      />
    </div>
  );
};

export default CompanyTable;
