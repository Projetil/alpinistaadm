"use client";
import { Pagination } from "@/components/default/Pagination";
import { Button } from "@/components/ui/button";
import CompanyService from "@/services/CompanyService";
import CustomerService from "@/services/CustomerService";
import { ICustomer } from "@/types/ICustomer";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsChevronLeft } from "react-icons/bs";
import { FaArrowsAltV } from "react-icons/fa";
import { MdSecurity } from "react-icons/md";
import { SlOptionsVertical } from "react-icons/sl";
import CardCustomerMobile from "./components/CardCustomerMobile";
import ModalCreateCustomer from "./components/ModalCreateCustomer";

export default function Companies() {
  const { id } = useParams();
  const [open, setOpen] = useState(false);
  const [customers, setCustomers] = useState<ICustomer[]>([]);
  const [companyName, setCompanyName] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const res = await CustomerService.GetByCompanyId(Number(id));
      const resCompany = await CompanyService.GetById(Number(id));
      setCompanyName(resCompany.name);
      setCustomers(res);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [open]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className="flex flex-col md:gap-10 items-start">
        <div className="hidden md:flex gap-4 w-full justify-between items-center text-[#050506]">
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
          <div>
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
              <th className="py-3 px-4  text-sm font-semibold  items-center">
                <div className="flex items-center gap-2">
                  NOME <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4 text-sm font-semibold  items-center">
                <div className="flex items-center justify-start gap-2">
                  TELEFONE <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4  text-sm font-semibold  items-center">
                <div className="flex items-center gap-2">
                  TIPO <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4  text-sm font-semibold  items-center">
                <div className="flex items-center gap-2">
                  CARGO <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4  text-sm font-semibold  items-center">
                <div className="flex items-center gap-2">
                  E-MAIL <FaArrowsAltV />
                </div>
              </th>
              <th className="py-3 px-4  text-sm font-semibold">AÇÃO</th>
            </tr>
          </thead>
          <tbody>
            {customers &&
              customers.map((row, index) => (
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
                    <div className="flex justify-start">{row.number}</div>
                  </td>
                  <td className="py-5 px-4 text-sm">
                    <div className="flex">
                      {row.profileId == 1 ? "Ativo" : "Inativo"}
                    </div>
                  </td>
                  <td className="py-5 px-4 text-sm">
                    <div className="flex">{row.position}</div>
                  </td>
                  <td className="py-5 px-4 text-sm">
                    <div className="flex">{row.email}</div>
                  </td>
                  <td className="py-5 px-4 flex items-center justify-center">
                    <SlOptionsVertical className="cursor-pointer text-[#1A69C4]" />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
        <div className="flex flex-col gap-4 md:hidden p-4">
          {customers.map((x, index) => {
            return (
              <CardCustomerMobile
                key={index}
                companyName={x.name}
                email={x.email}
                position={x.position}
                phone={x.number.toString()}
                typeCustomer={x.profileId == 1 ? "Ativo" : "Inativo"}
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
        <ModalCreateCustomer
          open={open}
          setOpen={() => setOpen(!open)}
          companyId={Number(id)}
        />
      </section>
    </main>
  );
}
