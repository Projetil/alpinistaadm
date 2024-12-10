"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardPermission from "./CardPermissionTableMobile";
import { IPermission } from "@/types/IPermission";
import PopoverPermission from "./PopoverPermission";
import { useState } from "react";

const UserPermissionTable = ({
  perms,
  page,
  setPage,
  setPermissionId,
  setOpenModal,
  handleDelete,
}: {
  perms?: IPermission[];
  page: number;
  setPage: (x: number) => void;
  setPermissionId: (x: number) => void;
  setOpenModal: () => void;
  handleDelete: (x: number) => void;
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const sortedPermissions = [...(perms || [])].sort((a, b) => {
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
                onClick={() => handleSort("type")}
              >
                TIPO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center justify-start gap-2 cursor-pointer"
                onClick={() => handleSort("permissionPages")}
              >
                PERMISSÕES <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {sortedPermissions.map((row, index) => (
            <tr
              key={index}
              className={`${
                index === 0 ? "" : "border-t border-gray-200"
              } text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.name}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">
                  {row.type === 1 ? "Comum" : "Moderador"}
                </div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex justify-start">
                  {row.permissionPages
                    .map((x) => x.funcs.map((x) => x.name).join(", "))
                    .join(", ")
                    .slice(0, 40) +
                    (row.permissionPages
                      .map((x) => x.funcs.map((x) => x.name).join(", "))
                      .join(", ").length > 40
                      ? "..."
                      : "")}
                </div>
              </td>

              <td className="py-3 px-4 flex items-center justify-center">
                <PopoverPermission
                  permissionId={row.id}
                  onDeletePermission={(x: number) => handleDelete(x)}
                  onEditPermission={(x: number) => setPermissionId(x)}
                  setOpenModal={setOpenModal}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex flex-col gap-4 md:hidden p-4">
        {sortedPermissions.map((x, index) => {
          const perms =
            x.permissionPages
              .map((x) => x.funcs.map((x) => x.name).join(", "))
              .join(", ")
              .slice(0, 40) +
            (x.permissionPages
              .map((x) => x.funcs.map((x) => x.name).join(", "))
              .join(", ").length > 40
              ? "..."
              : "");

          return (
            <CardPermission
              key={index}
              permissionId={x.id}
              onDeletePermission={(x: number) => handleDelete(x)}
              onEditPermission={(x: number) => setPermissionId(x)}
              setOpenModal={setOpenModal}
              name={x.name}
              type={x.type === 1 ? "Comum" : "Moderador"}
              permission={perms}
            />
          );
        })}
      </div>
      <Pagination
        pageIndex={page}
        perPage={10}
        handlePage={setPage}
        totalCount={20}
      />
    </div>
  );
};

export default UserPermissionTable;
