"use client";
import { Button } from "../ui/button";
import { RxExit } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GoHomeFill } from "react-icons/go";
import { RiFolderUserFill, RiShieldUserFill } from "react-icons/ri";
import Link from "next/link";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="px-3 py-6 w-full h-[100vh] md:w-[300px] bg-white hidden md:flex flex-col justify-between items-start overflow-y-auto rounded-3xl">
      <h1 className="text-xl font-bold text-[#FF8041] w-48 h-auto mb-6">
        <Image
          src="/logo.png"
          alt=""
          className="w-full h-full"
          width={500}
          height={500}
        />
      </h1>
      <ul className="space-y-4 h-full text-base p-4">
        <li
          className={`md:hover:bg-[#F0F8FF] font-semibold ${
            pathname === "/home"
              ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
              : "text-[#8C8B91]"
          }`}
        >
          <Link href="/home" className="flex items-center justify-start gap-2">
            <GoHomeFill size={22} />
            <span>Home</span>
          </Link>
        </li>
        <li
          className={`md:hover:bg-[#F0F8FF] font-semibold ${
            pathname === "/admin"
              ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
              : "text-[#8C8B91]"
          }`}
        >
          <Link href="/admin" className="flex items-center justify-start gap-2">
            <RiShieldUserFill size={22} />
            <span>Administração</span>
          </Link>
        </li>
        <li
          className={`md:hover:bg-[#F0F8FF] font-semibold ${
            pathname === "/permissions"
              ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
              : "text-[#8C8B91]"
          }`}
        >
          <Link
            href="/permissions"
            className="flex items-center justify-start gap-2"
          >
            <RiFolderUserFill size={22} />
            <span>Usuário e Permissões</span>
          </Link>
        </li>
      </ul>
      <Button
        variant={"ghost"}
        className="flex items-end justify-start w-full h-full p-4 bg-sidebar-bg text-[#63636E]"
      >
        <a href="/signin" className="flex items-center justify-start gap-3 ">
          <RxExit />
          <p className="pt-1">Sair</p>
        </a>
      </Button>
    </div>
  );
};

export default Sidebar;
