"use client";

import { useEffect, useState } from "react";
import { MdSecurity } from "react-icons/md";
import CompanyForm from "./components/CompanyForm";
import DominiosForm from "./components/DominiosForm";
import AddressForm from "./components/AddressForm";
import SocialMediaForm from "./components/SocialMediaForm";
import AppMobileForm from "./components/AppMobileForm";

export default function NovoClientePage() {
  const [steps, setSteps] = useState(1);
  const [companyId, setCompanyId] = useState(0);

  useEffect(() => {}, [companyId]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className="flex flex-col md:gap-10 items-start">
        <div className="hidden md:flex gap-4 w-full justify-between items-center text-[#050506]">
          <div className="flex items-center space-x-3">
            <MdSecurity color="#3088EE" size={28} />
            <h2 className="font-semibold md:text-3xl">Administração</h2>
          </div>
        </div>
      </section>
      <section className="bg-white p-4 rounded-lg max-w-[1000px]">
        <h3 className="font-bold text-2xl text-[#0D3C73] my-5">Novo Cliente</h3>
        <div className="flex flex-wrap gap-6 ">
          <div
            className={`${
              steps == 1 ? "text-[#1573B6]" : "text-[#D8D9E0]"
            } flex gap-3 justify-center items-center max-w-[210px] font-semibold`}
          >
            <span
              className={`${
                steps == 1 ? "border-[#1573B6]" : "border-[#D8D9E0]"
              } border-2 rounded-full p-5 w-8 h-8  flex gap-3 justify-center items-center`}
            >
              01
            </span>
            <p>Empresa</p>
          </div>
          <div
            className={`${
              steps == 2 ? "text-[#1573B6]" : "text-[#D8D9E0]"
            } flex gap-3 justify-center items-center max-w-[210px] font-semibold`}
          >
            <span
              className={`${
                steps == 2 ? "border-[#1573B6]" : "border-[#D8D9E0]"
              } border-2 rounded-full p-5 w-8 h-8  flex gap-3 justify-center items-center`}
            >
              02
            </span>
            <p>Domínios</p>
          </div>
          <div
            className={`${
              steps == 3 ? "text-[#1573B6]" : "text-[#D8D9E0]"
            } flex gap-3 justify-center items-center max-w-[210px] font-semibold`}
          >
            <span
              className={`${
                steps == 3 ? "border-[#1573B6]" : "border-[#D8D9E0]"
              } border-2 rounded-full p-5 w-8 h-8  flex gap-3 justify-center items-center`}
            >
              03
            </span>
            <p>Endereços</p>
          </div>
          <div
            className={`${
              steps == 4 ? "text-[#1573B6]" : "text-[#D8D9E0]"
            } flex gap-3 justify-center items-center max-w-[210px] font-semibold`}
          >
            <span
              className={`${
                steps == 4 ? "border-[#1573B6]" : "border-[#D8D9E0]"
              } border-2 rounded-full p-5 w-8 h-8  flex gap-3 justify-center items-center`}
            >
              04
            </span>
            <p>Redes socias</p>
          </div>
          <div
            className={`${
              steps == 5 ? "text-[#1573B6]" : "text-[#D8D9E0]"
            } flex gap-3 justify-center items-center max-w-[210px] font-semibold`}
          >
            <span
              className={`${
                steps == 5 ? "border-[#1573B6]" : "border-[#D8D9E0]"
              } border-2 rounded-full p-5 w-8 h-8  flex gap-3 justify-center items-center`}
            >
              05
            </span>
            <p>Aplicativos móveis</p>
          </div>
        </div>
        {steps == 1 && (
          <CompanyForm
            addStep={() => setSteps(2)}
            setCompany={(x: number) => setCompanyId(x)}
          />
        )}
        {steps == 2 && <DominiosForm addStep={() => setSteps(3)} />}
        {steps == 3 && (
          <AddressForm addStep={() => setSteps(4)} companyId={companyId} />
        )}
        {steps == 4 && (
          <SocialMediaForm addStep={() => setSteps(5)} companyId={companyId} />
        )}
        {steps == 5 && <AppMobileForm companyId={companyId} />}
      </section>
    </main>
  );
}
