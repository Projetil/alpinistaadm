"use client";
import Header from "@/components/default/Header";
import Sidebar from "@/components/default/Sidebar";
import { LoadingSpinner } from "@/components/default/Spinner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default function AdmLayout({ children }: PrivateLayoutProps) {
  const { status } = useSession();

  const navigate = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      navigate.push("/");
    }
  }, [status, navigate]);

  if (status === "loading" || status === "unauthenticated") {
    return (
      <div className="flex w-full h-screen items-center justify-center ">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full bg-[#F8F7F9] min-h-screen">
      <Header />
      <div className="flex gap-6">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
