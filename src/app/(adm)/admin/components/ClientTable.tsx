"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardClientMobile from "./CardClientMobile";
import { IPagedCompany } from "@/types/ICompany";
import { formatCNPJ, formatDateString } from "@/utils/formatString";
import PopoverClients from "./PopoverClients";
import { useState } from "react";

const ClientTable = ({
  companies,
  page,
  setPage,
  handleDelete,
}: {
  companies?: IPagedCompany;
  page: number;
  setPage: (x: number) => void;
  handleDelete: (id: number) => void;
}) => {
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

    if (typeof aValue === "number" && typeof bValue === "number") {
      return direction === "asc" ? aValue - bValue : bValue - aValue;
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
                className="flex items-center justify-start gap-2 cursor-pointer"
                onClick={() => handleSort("cnpj")}
              >
                CNPJ <FaArrowsAltV />
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
            <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {sortedCompanies.map((row, index) => (
            <tr
              key={index}
              className={`${
                index === 0 ? "" : "border-t border-gray-200"
              } text-[#636267] text-center`}
            >
              <td className="py-5 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.name}</div>
              </td>
              <td className="py-5 px-4 text-sm">
                <div className="flex justify-start">{formatCNPJ(row.cnpj)}</div>
              </td>
              <td className="py-5 px-4 text-sm">
                <div className="flex">
                  {row.status === 1 ? "Ativo" : "Inativo"}
                </div>
              </td>
              <td className="py-5 px-4 text-sm">
                <div className="flex">{formatDateString(row.createdAt)}</div>
              </td>
              <td className="py-5 px-4 flex items-center justify-center">
                <PopoverClients handleDelete={handleDelete} clientId={row.id} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {companies?.items.map((x, index) => (
          <CardClientMobile
            key={index}
            handleDelete={handleDelete}
            clientId={x.id}
            companyName={x.name}
            status={x.status === 1 ? "Ativo" : "Inativo"}
            registrationDate={formatDateString(x.createdAt)}
            cnpj={x.cnpj}
          />
        ))}
      </div>
      <Pagination
        pageIndex={page}
        perPage={10}
        handlePage={setPage}
        totalCount={companies?.totalItems}
      />
    </div>
  );
};

export default ClientTable;
