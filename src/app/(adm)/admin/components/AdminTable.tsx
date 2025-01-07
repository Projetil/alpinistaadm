"use client";
import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import { IPagedAdministrator } from "@/types/IAdministrator";
import CardAdminMobile from "./CardAdminMobile";
import PopoverAdm from "./PopoverAdm";
import { formatPhone } from "@/utils/formatString";

const AdminTable = ({
  administrators,
  page,
  setPage,
  setAdmId,
  setOpenModal,
  handleDelete,
  setNameColumn,
  setDirectionColumn,
}: {
  administrators?: IPagedAdministrator;
  page: number;
  setPage: (x: number) => void;
  setAdmId: (x: number) => void;
  setOpenModal: () => void;
  handleDelete: (x: number) => void;
  setNameColumn: (x: string) => void;
  setDirectionColumn: () => void;
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
                  setNameColumn("Name");
                  setDirectionColumn();
                }}
              >
                NOME <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center justify-start gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("Phone");
                  setDirectionColumn();
                }}
              >
                TELEFONE <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("Position");
                  setDirectionColumn();
                }}
              >
                CARGO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("Email");
                  setDirectionColumn();
                }}
              >
                E-MAIL <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold">AÇÃO</th>
          </tr>
        </thead>
        <tbody>
          {administrators?.items.map((row, index) => (
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
