export interface ITableAtivos {
  name: string;
  items: string;
  severity: number;
  severiyTextColor: string;
  severityBgColor: string;
  status: number;
  statusTextColor: string;
  statusBgColor: string;
}

export const tableAtivosData: ITableAtivos[] = [
  {
    name: "http://www.example.com/index.html",
    items: "00",
    severity: 1,
    severiyTextColor: "text-[#1A69C4]",
    severityBgColor: "bg-[#D1EBFF]",
    status: 1,
    statusBgColor: "bg-[#5CBEFF]",
    statusTextColor: "text-[#080852]",
  },
  {
    name: "http://www.example.com/index.html",
    items: "00",
    severity: 2,
    severiyTextColor: "text-[#FFFFFF]",
    severityBgColor: "bg-[#5CA7FF]",
    status: 2,
    statusBgColor: "bg-[#4FF075]",
    statusTextColor: "text-[#050506]",
  },
  {
    name: "http://www.example.com/index.html",
    items: "00",
    severity: 3,
    severiyTextColor: "text-[#FFFFFF]",
    severityBgColor: "bg-[#FFBB5C]",
    status: 3,
    statusBgColor: "bg-[#A7F04F]",
    statusTextColor: "text-[#050506]",
  },
  {
    name: "http://www.example.com/index.html",
    items: "00",
    severity: 4,
    severiyTextColor: "text-[#FF583F]",
    severityBgColor: "bg-[#FFDDD8]",
    status: 4,
    statusBgColor: "bg-[#FFCE5C]",
    statusTextColor: "text-[#050506]",
  },
  {
    name: "http://www.example.com/index.html",
    items: "00",
    severity: 5,
    severiyTextColor: "text-[#FFFFFF]",
    severityBgColor: "bg-[#FF5C63]",
    status: 5,
    statusBgColor: "bg-[#FFA35C]",
    statusTextColor: "text-[#050506]",
  },
];
