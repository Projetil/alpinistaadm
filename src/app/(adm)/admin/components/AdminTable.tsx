"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import { IPagedAdministrator } from "@/types/IAdministrator";
import CardAdminMobile from "./CardAdminMobile";
import PopoverAdm from "./PopoverAdm";
import { formatPhone } from "@/utils/formatString";
import { useState } from "react";

const AdminTable = ({
  administrators,
  page,
  setPage,
  setAdmId,
  setOpenModal,
  handleDelete,
}: {
  administrators?: IPagedAdministrator;
  page: number;
  setPage: (x: number) => void;
  setAdmId: (x: number) => void;
  setOpenModal: () => void;
  handleDelete: (x: number) => void;
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedAdministrators = [...(administrators?.items || [])].sort(
    (a, b) => {
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
    }
  );

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
                NOME <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center justify-start gap-2 cursor-pointer"
                onClick={() => handleSort("phone")}
              >
                TELEFONE <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("position")}
              >
                CARGO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => handleSort("email")}
              >
                E-MAIL <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {sortedAdministrators.map((row, index) => (
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
                <div className="flex justify-start">
                  {formatPhone(row.phone.toString())}
                </div>
              </td>
              <td className="py-5 px-4 text-sm">
                <div className="flex">{row.position}</div>
              </td>
              <td className="py-5 px-4 text-sm">
                <div className="flex">{row.email}</div>
              </td>
              <td className="py-5 px-4 flex items-center justify-center">
                <PopoverAdm
                  admId={row.id}
                  onEditAdm={(x: number) => setAdmId(x)}
                  onDeleteAdm={(x: number) => handleDelete(x)}
                  setOpenModal={setOpenModal}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {administrators?.items.map((x, index) => (
          <CardAdminMobile
            key={index}
            admId={x.id}
            onEditAdm={(x: number) => setAdmId(x)}
            onDeleteAdm={(x: number) => handleDelete(x)}
            setOpenModal={setOpenModal}
            companyName={x.name}
            phone={x.phone.toString()}
            email={x.email}
            cargo={x.position}
          />
        ))}
      </div>
      <Pagination
        pageIndex={page}
        perPage={10}
        handlePage={setPage}
        totalCount={administrators?.totalItems}
      />
    </div>
  );
};

export default AdminTable;
