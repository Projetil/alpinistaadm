"use client";
import CompanyService from "@/services/CompanyService";
import { IPagedCompany } from "@/types/ICompany";
import { useEffect, useState } from "react";
import CompanyTable from "./components/CompanyTable";
import { GoHomeFill } from "react-icons/go";

export default function HomePage() {
  const [companies, setCompanies] = useState<IPagedCompany>();
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const res = await CompanyService.GetAll(page, 10);
      setCompanies(res);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
  }, [loading, page]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className="flex flex-col md:gap-10 items-start md:mb-10">
        <div className="hidden md:flex gap-4 items-center text-[#050506]">
          <GoHomeFill color="#3088EE" size={24} />
          <h2 className="font-semibold md:text-3xl">Home</h2>
        </div>
      </section>
      <CompanyTable
        companies={companies?.items}
        pageNumber={page}
        setPageNumber={(x: number) => setPage(x)}
      />
    </main>
  );
}
