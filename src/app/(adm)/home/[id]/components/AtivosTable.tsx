import { Pagination } from "@/components/default/Pagination";
import { FaArrowsAltV } from "react-icons/fa";
import CardAtivosMobile from "./CardAtivosMobile";
import { IPagedRisk } from "@/types/IRisk";
import { Dispatch, SetStateAction } from "react";

const AtivosTable = ({
  openModal,
  risks,
  currentPage,
  setCurrentPage,
  setRiskId,
}: {
  openModal: () => void;
  risks?: IPagedRisk;
  currentPage: number;
  setCurrentPage: Dispatch<SetStateAction<number>>;
  setRiskId: (x: number) => void;
}) => {
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
          {risks?.items.map((row, index) => (
            <tr
              onClick={() => {
                openModal();
                setRiskId(row.id);
              }}
              key={index}
              className={`${
                index == 0 ? "" : "border-t border-gray-200"
              }  text-[#636267] text-center`}
            >
              <td className="py-3 px-4 text-sm max-w-[200px]">
                <div className="flex">{row.name}</div>
              </td>
              <td className="py-3 px-4 text-sm">
                <div className="flex">00</div>
              </td>
              <td className={`py-3 px-4 text-sm flex gap-2`}>
                <div
                  className={`bg-[#FF5C63] text-[#FFFFFF]  w-8 h-8 p-2 font-bold`}
                >
                  00
                </div>
                <div
                  className={`bg-[#FFDDD8] text-[#FF583F] w-8 h-8 p-2 font-bold`}
                >
                  00
                </div>

                <div
                  className={`bg-[#FFBB5C] text-[#FFFFFF] w-8 h-8 p-2 font-bold`}
                >
                  00
                </div>
                <div
                  className={`bg-[#5CA7FF] text-[#FFFFFF] w-8 h-8 p-2 font-bold`}
                >
                  00
                </div>
                <div
                  className={`bg-[#D1EBFF] text-[#1A69C4] w-8 h-8 p-2 font-bold`}
                >
                  00
                </div>
              </td>
              <td className={`py-3 px-4 text-sm`}>
                <div className="flex gap-2">
                  <div
                    className={`w-9 h-9 rounded-full bg-[#FFA35C] text-[#050506] p-2 font-bold`}
                  >
                    00
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#FFCE5C] text-[#050506] p-2 font-bold`}
                  >
                    00
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#A7F04F] text-[#050506] p-2 font-bold`}
                  >
                    00
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#5CBEFF] text-[#080852] p-2 font-bold`}
                  >
                    00
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#4FF0D2] text-[#050506] p-2 font-bold`}
                  >
                    00
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#A8A8A8] text-[#FFFFFF] p-2 font-bold`}
                  >
                    00
                  </div>
                  <div
                    className={`w-9 h-9 rounded-full bg-[#FF5C63] text-[#FFFFFF] p-2 font-bold`}
                  >
                    00
                  </div>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex flex-col gap-4 md:hidden p-4">
        {risks?.items.map((x, index) => {
          return <CardAtivosMobile key={index} name={x.name} />;
        })}
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

export default AtivosTable;
