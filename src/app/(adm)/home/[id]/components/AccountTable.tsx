import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardAccountMobile from "./CardAccountMobile";
import { Dispatch, SetStateAction } from "react";
import { IPagedRisk, riskSeverity, riskStatus } from "@/types/IRisk";

const AccountTable = ({
  openModal,
  risks,
  currentPage,
  setCurrentPage,
  setRiskId,
  setNameColumn,
  setDirectionColumn,
}: {
  openModal: () => void;
  risks?: IPagedRisk;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setRiskId: (x: number) => void;
  setNameColumn: (x: string) => void;
  setDirectionColumn: () => void;
}) => {
  return (
    <section className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("id");
                  setDirectionColumn();
                }}
              >
                ID <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("name");
                  setDirectionColumn();
                }}
              >
                NOME <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("active");
                  setDirectionColumn();
                }}
              >
                ATIVO <FaArrowsAltV />
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
                ESTADO <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4 text-sm font-semibold items-center">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => {
                  setNameColumn("riskSeverity");
                  setDirectionColumn();
                }}
              >
                SEVERIDADE <FaArrowsAltV />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {risks?.items.map((row, index) => (
            <tr
              onClick={() => {
                openModal();
                setRiskId(row.id);
              }}
              key={index}
              className={`${
                index === 0 ? "" : "border-t border-gray-200"
              } text-[#636267] text-center cursor-pointer`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.id}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">{row.name}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">{row.active ? "Sim" : "Não"}</div>
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
            openModalDetails={() => {
              openModal();
              setRiskId(x.id);
            }}
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
