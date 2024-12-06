"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardClientMobile from "./CardClientMobile";
import { IPagedCompany } from "@/types/ICompany";
import { formatCNPJ, formatDateString } from "@/utils/formatString";
import PopoverClients from "./PopoverClients";

const ClientTable = ({
  companies,
  page,
  setPage,
}: {
  companies?: IPagedCompany;
  page: number;
  setPage: (x: number) => void;
}) => {
  return (
    <div className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                EMPRESA <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold  items-center">
              <div className="flex items-center justify-start gap-2">
                CNPJ <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                STATUS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                DATA DE CADASTRO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {companies &&
            companies.items?.map((row, index) => (
              <tr
                key={index}
                className={`${
                  index == 0 ? "" : "border-t border-gray-200"
                }  text-[#636267] text-center`}
              >
                <td className="py-5 px-4 text-sm max-w-[200px]">
                  <div className="flex">{row.name}</div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex justify-start">
                    {formatCNPJ(row.cnpj)}
                  </div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex">
                    {row.status == 1 ? "Ativo" : "Inativo"}
                  </div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex">{formatDateString(row.createdAt)}</div>
                </td>

                <td className="py-5 px-4 flex items-center justify-center">
                  <PopoverClients clientId={row.id} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {companies?.items.map((x, index) => {
          return (
            <CardClientMobile
              key={index}
              companyName={x.name}
              status={x.status == 1 ? "Ativo" : "Inativo"}
              registrationDate={formatDateString(x.createdAt)}
              cnpj={x.cnpj}
            />
          );
        })}
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
