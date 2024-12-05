import Header from "@/components/default/Header";
import Sidebar from "@/components/default/Sidebar";

interface PrivateLayoutProps {
  children: React.ReactNode;
}

export default async function AdmLayout({ children }: PrivateLayoutProps) {
  return (
    <div className="flex flex-col w-full bg-[#F8F7F9]">
      <Header />
      <div className="flex gap-6">
        <Sidebar />
        {children}
      </div>
    </div>
  );
}
