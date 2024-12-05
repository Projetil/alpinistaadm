import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import { tableAtivosData } from "@/data/tableAtivos";
import CardAtivosMobile from "./CardAtivosMobile";

const AtivosTable = ({ openModal }: { openModal: () => void }) => {
  return (
    <section className="w-full overflow-x-auto md:bg-white rounded-md">
      <table className="min-w-full hidden md:table">
        <thead className="border-none">
          <tr className="text-[#636267] text-center">
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                NOME <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                ITENS <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                GRAU DE SEVERIDADE <FaArrowsAltV />
              </div>
            </th>
            <th className="py-3 px-4  text-sm font-semibold  items-center">
              <div className="flex items-center gap-2">
                STATUS <FaArrowsAltV />
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          {tableAtivosData.map((row, index) => (
            <tr
              onClick={openModal}
              key={index}
              className={`${
                index == 0 ? "" : "border-t border-gray-200"
              }  text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.name}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">{row.items}</div>
              </td>
              <td className={`py-3 px-4 text-sm flex`}>
                <div
                  className={`${row.severityBgColor} ${row.severiyTextColor} w-8 h-8 p-2 font-bold`}
                >
                  {row.severity}
                </div>
              </td>
              <td className={`py-3 px-4 text-sm`}>
                <div
                  className={`w-9 h-9 rounded-full ${row.statusBgColor} ${row.statusTextColor}   p-2 font-bold`}
                >
                  {row.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-4 md:hidden p-4">
        {tableAtivosData.map((x, index) => {
          return (
            <CardAtivosMobile
              key={index}
              name={x.name}
              items={x.items}
              status={x.status}
              severity={x.severity}
              statusBgColor={x.statusBgColor}
              statusTextColor={x.statusTextColor}
              severityBgColor={x.severityBgColor}
              severiyTextColor={x.severiyTextColor}
            />
          );
        })}
      </div>
      <Pagination
        pageIndex={1}
        perPage={10}
        handlePage={() => {}}
        totalCount={10}
      />
    </section>
  );
};

export default AtivosTable;
