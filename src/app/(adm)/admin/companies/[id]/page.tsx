"use client";
import { Pagination } from "@/components/default/Pagination";
import { Button } from "@/components/ui/button";
import CompanyService from "@/services/CompanyService";
import CustomerService from "@/services/CustomerService";
import { IPagedCustomer } from "@/types/ICustomer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FaArrowsAltV } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import CardCustomerMobile from "./components/CardCustomerMobile";
import ModalCreateCustomer from "./components/ModalCreateCustomer";
import PopoverCustomer from "./components/PopoverCustomer";
import { toast } from "react-toastify";
import { formatPhone } from "@/utils/formatString";

export default function Companies() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<IPagedCustomer>();
  const [companyName, setCompanyName] = useState<string>("");
  const [page, setPage] = useState(1);
  const navigation = useRouter();
  const [editCustomerId, setEditCustomerId] = useState<number>();
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const handleDeleteCustomer = async (id: number) => {
    try {
      await CustomerService.Delete(id);
      toast.success("Usuário excluído com sucesso");
      fetchCompany();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir usuário");
    }
  };

  const fetchCompany = async () => {
    try {
      const res = await CustomerService.GetAllByCompanyId(page, 10, Number(id));
      const resCompany = await CompanyService.GetById(Number(id));
      setCompanyName(resCompany.name);
      setCustomers(res);
    } catch (error) {
      console.log(error);
    }
  };

  const sortedCustomers = [...(customers?.items || [])].sort((a, b) => {
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

  useEffect(() => {
    fetchCompany();
  }, [open, page]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className="flex flex-col md:gap-10 items-start">
        <div className="flex gap-4 w-full justify-between items-center text-[#050506]">
          <div className="flex items-center space-x-3 justify-center">
            <button
              onClick={() => navigation.push("/admin")}
              className="bg-[#FFFFFF] p-2 "
            >
              <BsChevronLeft size={20} color="#3088EE" />
            </button>
            <MdSecurity color="#3088EE" size={28} />
            <h2 className="font-semibold md:text-3xl">{companyName}</h2>
          </div>
          <div className="hidden md:block">
            <Button
              onClick={() => setOpen(true)}
              className="bg-[#3088EE] hover:bg-[#013073]"
            >
              <span className="text-2xl font-extralight">+</span> Novo usuário
            </Button>
          </div>
        </div>
      </section>
      <section className="w-full overflow-x-auto md:bg-white rounded-md">
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
                  onClick={() => handleSort("number")}
                >
                  TELEFONE <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold items-center">
                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => handleSort("profileId")}
                >
                  TIPO <FaArrowsAltV />
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
            {sortedCustomers.map((row, index) => (
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
                    {formatPhone(row.number.toString())}
                  </div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex">
                    {row.profileId === 1 ? "Comum" : "Gestor"}
                  </div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex">{row.position}</div>
                </td>
                <td className="py-5 px-4 text-sm">
                  <div className="flex">{row.email}</div>
                </td>
                <td className="py-5 px-4 flex items-center justify-center">
                  <PopoverCustomer
                    customerId={row.id ?? 0}
                    onDeleteCustomer={(x: number) => handleDeleteCustomer(x)}
                    onEditCustomer={(x: number) => setEditCustomerId(x)}
                    setOpenModal={() => setOpen(!open)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {customers?.items.map((x, index) => (
            <CardCustomerMobile
              key={index}
              companyName={x.name}
              email={x.email}
              position={x.position}
              phone={x.number.toString()}
              typeCustomer={x.profileId === 1 ? "Ativo" : "Inativo"}
            />
          ))}
        </div>
        <Pagination
          pageIndex={page}
          perPage={10}
          handlePage={setPage}
          totalCount={customers?.totalItems}
        />
        <ModalCreateCustomer
          open={open}
          setOpen={() => setOpen(!open)}
          companyId={Number(id)}
          customerId={editCustomerId}
          setCustomerId={(x: number) => setEditCustomerId(x)}
        />
        <Button
          onClick={() => setOpen(!open)}
          className="bg-[#3088EE] hover:bg-[#013073] rounded-full p-3 flex md:hidden fixed bottom-10 right-4"
        >
          <span className="text-2xl font-extralight">+</span>
        </Button>
      </section>
    </main>
  );
}
