"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardPermission from "./CardPermissionTableMobile";
import { IPaginatedPermission } from "@/types/IPermission";
import PopoverPermission from "./PopoverPermission";

const UserPermissionTable = ({
  perms,
  page,
  setPage,
  setPermissionId,
  setOpenModal,
  setOrder,
  setOrderBy,
  handleDelete,
}: {
  perms?: IPaginatedPermission;
  page: number;
  setPage: (x: number) => void;
  setPermissionId: (x: number) => void;
  setOpenModal: () => void;
  setOrder: () => void;
  setOrderBy: (x: string) => void;
  handleDelete: (x: number) => void;
}) => {
  return (
    <div className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setOrderBy("name");
                  setOrder();
                }}
              >
                NOME <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center justify-start gap-2 cursor-pointer"
                onClick={() => {
                  setOrderBy("type");
                  setOrder();
                }}
              >
                TIPO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center justify-start gap-2 cursor-pointer"
                onClick={() => {
                  setOrderBy("permissionPages");
                  setOrder();
                }}
              >
                PERMISSÕES <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {perms?.items.map((row, index) => (
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
                    .flatMap((x) =>
                      x.funcs.filter((x) => x.hasAcess).map((x) => x.name)
                    )
                    .join(", ")
                    .slice(0, 40) +
                    (row.permissionPages
                      .flatMap((x) =>
                        x.funcs.filter((x) => x.hasAcess).map((x) => x.name)
                      )
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
        {perms?.items.map((x, index) => {
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
        totalCount={perms?.totalItems}
      />
    </div>
  );
};

export default UserPermissionTable;
