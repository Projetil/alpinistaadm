"use client";
import { MdSecurity } from "react-icons/md";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IPagedCompany } from "@/types/ICompany";
import { useEffect, useState } from "react";
import CompanyService from "@/services/CompanyService";
import { useRouter } from "next/navigation";
import ClientTable from "./components/ClientTable";
import AdminTable from "./components/AdminTable";
import AdministratorService from "@/services/AdministratorService";
import { IPagedAdministrator } from "@/types/IAdministrator";
import ModalCreateAdmin from "./components/ModalCreateAdmin";
import { toast } from "react-toastify";

export default function AdminPage() {
  const [company, setCompany] = useState<IPagedCompany>();
  const [admins, setAdmins] = useState<IPagedAdministrator>();
  const navigation = useRouter();
  const [open, setOpen] = useState(false);
  const [pageCompany, setPageCompany] = useState(1);
  const [editAdmId, setEditAdmId] = useState<number>();
  const [pageAdmin, setPageAdmin] = useState(1);

  const fetchAdmins = async () => {
    try {
      const res = await AdministratorService.GetAll(pageAdmin, 10);
      setAdmins(res);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteAdm = async (id: number) => {
    try {
      await AdministratorService.Delete(id);
      toast.success("Administrador excluído com sucesso");
      fetchAdmins();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir administrador");
    }
  };

  const handleDeleteCompany = async (id: number) => {
    try {
      await CompanyService.Delete(id);
      toast.success("Cliente excluído com sucesso");
      fetchCompany();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir cliente");
    }
  };

  const fetchCompany = async () => {
    try {
      const res = await CompanyService.GetAll(pageCompany, 10);
      setCompany(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompany();
    fetchAdmins();
  }, [open, pageAdmin, pageCompany]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <Tabs defaultValue="Customers">
        <section className="hidden md:flex flex-col md:gap-10 items-start">
          <div className="flex gap-4 w-full justify-between items-center text-[#050506]">
            <div className="flex items-center space-x-3">
              <MdSecurity color="#3088EE" size={28} />
              <h2 className="font-semibold md:text-3xl">Administração</h2>
            </div>
            <div>
              <TabsContent value="Customers">
                <Button
                  onClick={() => navigation.push("/admin/novo-cliente")}
                  className="bg-[#3088EE] hover:bg-[#013073] "
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
            <ClientTable
              companies={company}
              page={pageCompany}
              setPage={(x: number) => {
                setPageCompany(x);
              }}
              handleDelete={handleDeleteCompany}
            />
            <Button
              onClick={() => navigation.push("/admin/novo-cliente")}
              className="bg-[#3088EE] hover:bg-[#013073] rounded-full p-3 flex md:hidden fixed bottom-10 right-4"
            >
              <span className="text-2xl font-extralight">+</span>
            </Button>
          </TabsContent>
          <TabsContent value="Admins">
            <AdminTable
              setAdmId={(x: number) => setEditAdmId(x)}
              administrators={admins}
              page={pageAdmin}
              setOpenModal={() => setOpen(!open)}
              setPage={(x: number) => {
                setPageAdmin(x);
              }}
              handleDelete={handleDeleteAdm}
            />
            <Button
              onClick={() => setOpen(!open)}
              className="bg-[#3088EE] hover:bg-[#013073] rounded-full p-3 flex md:hidden fixed bottom-10 right-4"
            >
              <span className="text-2xl font-extralight">+</span>
            </Button>
          </TabsContent>
        </section>
        c
      </Tabs>
      <ModalCreateAdmin
        admId={editAdmId}
        setAdmId={(x: number) => setEditAdmId(x)}
        open={open}
        setOpen={() => setOpen(!open)}
      />
    </main>
  );
}
