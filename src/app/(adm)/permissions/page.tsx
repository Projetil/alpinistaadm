"use client";
import { Button } from "@/components/ui/button";
import { PiFolderUserFill } from "react-icons/pi";
import UserPermissionTable from "./components/UserPermissionTable";
import { useEffect, useState } from "react";
import PermissionService from "@/services/PermissionService";
import ModalCreatePerms from "./components/ModalCreatePerms";
import { IPermission } from "@/types/IPermission";
import { toast } from "react-toastify";
export default function UserPermissionPage() {
  const [usersPerms, setUsersPerms] = useState<IPermission[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(1);
  const [editId, setEditId] = useState<number>();

  const fetchPerms = async () => {
    setLoading(true);
    try {
      const res = await PermissionService.GetAll();
      setUsersPerms(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePermission = async (id: number) => {
    try {
      await PermissionService.Delete(id);
      toast.success("Permissão excluído com sucesso");
      fetchPerms();
    } catch (error) {
      console.log(error);
      toast.error("Erro ao excluir Permissão");
    }
  };

  useEffect(() => {
    fetchPerms();
  }, [openModal, page]);

  return (
    <main className="text-[#FCFCFD] w-full p-2 md:p-6 flex flex-col gap-10 mt-6">
      <section className="flex flex-col md:gap-10 items-start">
        <div className="hidden md:flex gap-4 w-full justify-between items-center text-[#050506]">
          <div className="flex items-center space-x-3">
            <PiFolderUserFill color="#3088EE" size={28} />
            <h2 className="font-semibold md:text-3xl">Usuários e Permissões</h2>
          </div>
          <div>
            <Button
              onClick={() => setOpenModal(!openModal)}
              className="bg-[#3088EE] hover:bg-[#013073]"
            >
              <span className="text-2xl font-extralight">+</span> Novo perfil
            </Button>
          </div>
        </div>
      </section>
      <UserPermissionTable
        page={page}
        setPage={(x: number) => setPage(x)}
        perms={usersPerms}
        setPermissionId={(x: number) => setEditId(x)}
        setOpenModal={() => setOpenModal(!openModal)}
        handleDelete={handleDeletePermission}
      />
      <ModalCreatePerms
        permissionId={editId}
        setPermissionId={(x: number) => setEditId(x)}
        open={openModal}
        setOpen={() => setOpenModal(!openModal)}
      />
    </main>
  );
}
