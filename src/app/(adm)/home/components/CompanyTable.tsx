"use client";
import { Pagination } from "@/components/default/Pagination";
import { Button } from "@/components/ui/button";
import { FaArrowsAltV } from "react-icons/fa";
import CompanyCard from "./CardTableMobile";
import { useRouter } from "next/navigation";
import { IPagedCompany } from "@/types/ICompany";
import { formatDateToDDMMYYYY } from "@/utils/formatString";

const CompanyTable = ({
  companies,
  pageNumber,
  setPageNumber,
  setNameColumn,
  setDirectionColumn,
}: {
  companies?: IPagedCompany;
  pageNumber: number;
  setPageNumber: (x: number) => void;
  setNameColumn: (x: string) => void;
  setDirectionColumn: () => void;
}) => {
  const navigate = useRouter();

  return (
    <div className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("name");
                  setDirectionColumn();
                }}
              >
                EMPRESA <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("status");
                  setDirectionColumn();
                }}
              >
                STATUS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("createdAt");
                  setDirectionColumn();
                }}
              >
                DATA DE CADASTRO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("createdAt");
                  setDirectionColumn();
                }}
              >
                DATA DE ATUALIZAÇÃO
                <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {companies?.items.map((row, index) => (
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
