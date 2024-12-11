"use client";
import { MenuIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { RiFolderUserFill, RiShieldUserFill } from "react-icons/ri";
import Link from "next/link";
import { GoHomeFill } from "react-icons/go";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex md:hidden w-full p-4 items-center justify-start">
      <div className="md:hidden flex items-center justify-between p-4 ">
        <div className="flex items-center justify-start gap-4">
          <button onClick={() => setIsOpen(!isOpen)}>
            <MenuIcon className="w-6 h-6 text-[#003F5E]" />
          </button>
          <h1 className="text-xl font-semibold text-[#003F5E]">Home</h1>
        </div>
      </div>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <button className="hidden"></button>
        </DialogTrigger>
        <DialogContent className="fixed z-50 bg-white w-64 shadow-lg md:hidden">
          <DialogHeader>
            <DialogTitle className="text-lg font-semibold">Menu</DialogTitle>
          </DialogHeader>
          <div className="p-4">
            <nav className="space-y-4 mt-8">
              <ul className="flex flex-col gap-2">
                <li
                  className={`md:hover:bg-[#F0F8FF] font-semibold ${
                    pathname === "/home"
                      ? "bg-[#F0F8FF] text-[#3088EE] p-2 rounded-lg"
                      : "text-[#8C8B91]"
                  }`}
                >
                  <Link
                    href="/home"
                    className="flex items-center justify-start gap-2"
                  >
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
                  <Link
                    href="/admin"
                    className="flex items-center justify-start gap-2"
                  >
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
                    <span>Perfis de Acesso</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
          <div className="p-4 hidden md:block">
            <button className="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100">
              <span>Recolher</span>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  );
};

export default Header;
