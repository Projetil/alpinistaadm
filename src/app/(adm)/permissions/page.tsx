"use client";
import { Button } from "@/components/ui/button";
import { PiFolderUserFill } from "react-icons/pi";
import UserPermissionTable from "./components/UserPermissionTable";
import { useEffect, useState } from "react";
import { IPermission } from "@/types/IPermission";
import PermissionService from "@/services/PermissionService";
import ModalCreatePerms from "./components/ModalCreatePerms";
export default function UserPermissionPage() {
  const [usersPerms, setUsersPerms] = useState<IPermission[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);

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

  useEffect(() => {
    fetchPerms();
  }, [openModal]);

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
      <UserPermissionTable perms={usersPerms} />
      <ModalCreatePerms
        open={openModal}
        setOpen={() => setOpenModal(!openModal)}
      />
    </main>
  );
}
