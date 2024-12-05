"use client";
import { MdSecurity } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ICompany } from "@/types/ICompany";
import { useEffect, useState } from "react";
import CompanyService from "@/services/CompanyService";
import { useRouter } from "next/navigation";
import ClientTable from "./components/ClientTable";
import AdminTable from "./components/AdminTable";
import AdministratorService from "@/services/AdministratorService";
import { IAdministrator } from "@/types/IAdministrator";
import ModalCreateAdmin from "./components/ModalCreateAdmin";

export default function AdminPage() {
  const [company, setCompany] = useState<ICompany[]>([]);
  const [admins, setAdmins] = useState<IAdministrator[]>([]);
  const [loading, setLoading] = useState(false);
  const navigation = useRouter();
  const [open, setOpen] = useState(false);

  const fetchAdmins = async () => {
    try {
      setLoading(true);
      const res = await AdministratorService.GetAll();
      setAdmins(res);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  const fetchCompany = async () => {
    try {
      setLoading(true);
      const res = await CompanyService.GetAll();
      setCompany(res);
    } catch (error) {
      console.log(error);
      setLoading(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchAdmins();
  }, [loading, open]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <Tabs defaultValue="Customers">
        <section className="flex flex-col md:gap-10 items-start">
          <div className="hidden md:flex gap-4 w-full justify-between items-center text-[#050506]">
            <div className="flex items-center space-x-3">
              <MdSecurity color="#3088EE" size={28} />
              <h2 className="font-semibold md:text-3xl">Administração</h2>
            </div>
            <div>
              <TabsContent value="Customers">
                <Button
                  onClick={() => navigation.push("/admin/novo-cliente")}
                  className="bg-[#3088EE] hover:bg-[#013073]"
                >
                  <span className="text-2xl font-extralight">+</span> Novo
                  cliente
                </Button>
              </TabsContent>
              <TabsContent value="Admins">
                <Button
                  onClick={() => setOpen(!open)}
                  className="bg-[#3088EE] hover:bg-[#013073]"
                >
                  <span className="text-2xl font-extralight">+</span> Novo
                  Administrador
                </Button>
              </TabsContent>
            </div>
          </div>
        </section>
        <section>
          <TabsList className="grid max-w-[300px] grid-cols-2 mb-6 bg-[#FBFBFB] mt-6">
            <TabsTrigger
              value="Customers"
              className="text-center text-lg md:text-sm data-[state=active]:bg-[#F0F8FF] data-[state=active]:text-[#1A69C4] data-[state=active]:font-bold"
            >
              Clientes
            </TabsTrigger>
            <TabsTrigger
              value="Admins"
              className="text-center text-lg md:text-sm data-[state=active]:bg-[#F0F8FF] data-[state=active]:text-[#1A69C4] data-[state=active]:font-bold"
            >
              Administradores
            </TabsTrigger>
          </TabsList>
          <TabsContent value="Customers">
            <ClientTable companies={company} />
          </TabsContent>
          <TabsContent value="Admins">
            <AdminTable administrators={admins} />
          </TabsContent>
        </section>
      </Tabs>
      <ModalCreateAdmin open={open} setOpen={() => setOpen(!open)} />
    </main>
  );
}
