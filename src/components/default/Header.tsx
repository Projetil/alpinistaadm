"use client";
import { MenuIcon } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { PiHouse } from "react-icons/pi";
import { useState } from "react";
import { RiFolderUserFill, RiShieldUserFill } from "react-icons/ri";

const Header = () => {
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
                <li>
                  <a className="flex font-bold items-center space-x-3 p-2 rounded-md bg-[#D8D9E0]">
                    <PiHouse className="w-6 h-6" />
                    <span>Home</span>
                  </a>
                </li>
                <li>
                  <a className="flex font-normal items-center space-x-3 p-2 rounded-md">
                    <RiShieldUserFill size={22} />
                    <span>Administração</span>
                  </a>
                </li>
                <li>
                  <a className="flex font-normal items-center space-x-3 p-2 rounded-md">
                    <RiFolderUserFill size={22} />
                    <span>Usuário e Permissões</span>
                  </a>
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
