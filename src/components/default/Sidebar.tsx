"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import { RxExit } from "react-icons/rx";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { GoHomeFill } from "react-icons/go";
import { RiFolderUserFill, RiShieldUserFill } from "react-icons/ri";
import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Sidebar = () => {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div
      className={`px-3 py-6 h-[100vh]  bg-white hidden md:flex flex-col justify-between items-start overflow-y-auto rounded-3xl ${
        isCollapsed ? "w-[80px]" : "w-[300px]"
      }`}
    >
      <h1
        className={`text-xl font-bold text-[#FF8041] w-auto h-auto mb-6 ${
          isCollapsed ? "hidden" : "block"
        }`}
      >
        <Link href="/home">
          <Image
            src="/logo.png"
            alt=""
            className="w-full h-full"
            width={500}
            height={500}
          />
        </Link>
      </h1>
      <h1
        className={`text-xl font-bold text-[#FF8041] w-auto h-8 m-1 mb-6 ${
          !isCollapsed ? "hidden" : "block"
        }`}
      >
        <Link href="/home">
          <Image
            src="/logo-small.png"
            alt=""
            className="w-full h-full"
            width={500}
            height={500}
          />
        </Link>
      </h1>
      <ul className="space-y-4 h-full text-base">
        <li
          className={`md:hover:bg-[#F0F8FF] font-semibold p-2 ${
            pathname === "/home"
              ? "bg-[#F0F8FF] text-[#3088EE]  rounded-lg"
              : "text-[#8C8B91]"
          }`}
        >
          <Link href="/home" className="flex items-center justify-start gap-2">
            <GoHomeFill size={22} />
            <span className={isCollapsed ? "hidden" : "block"}>Home</span>
          </Link>
        </li>
        <li
          className={`md:hover:bg-[#F0F8FF] font-semibold p-2 ${
            pathname === "/admin"
              ? "bg-[#F0F8FF] text-[#3088EE]  rounded-lg"
              : "text-[#8C8B91]"
          }`}
        >
          <Link href="/admin" className="flex items-center justify-start gap-2">
            <RiShieldUserFill size={22} />
            <span className={isCollapsed ? "hidden" : "block"}>
              Administração
            </span>
          </Link>
        </li>
        <li
          className={`md:hover:bg-[#F0F8FF] font-semibold p-2 ${
            pathname === "/permissions"
              ? "bg-[#F0F8FF] text-[#3088EE]  rounded-lg"
              : "text-[#8C8B91]"
          }`}
        >
          <Link
            href="/permissions"
            className="flex items-center justify-start gap-2"
          >
            <RiFolderUserFill size={22} />
            <span className={isCollapsed ? "hidden" : "block"}>
              Perfis de Acesso
            </span>
          </Link>
        </li>
      </ul>
      <button onClick={toggleSidebar} className="p-2">
        {isCollapsed ? (
          <FaArrowRight className="text-[#1A69C4]" />
        ) : (
          <p className="flex gap-2 items-center text-[#1A69C4] font-semibold">
            <FaArrowLeft /> Recolher
          </p>
        )}
      </button>
      <Button
        variant={"ghost"}
        className="flex items-end justify-start w-full h-full p-4 bg-sidebar-bg text-[#B3001E]"
      >
        <a href="/signin" className="flex items-center justify-start gap-3 ">
          <RxExit />
          <p className={`pt-1 ${isCollapsed ? "hidden" : "block"}`}>Sair</p>
        </a>
      </Button>
    </div>
  );
};

export default Sidebar;
