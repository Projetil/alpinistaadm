"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "../ui/button";

export interface PaginationProps {
  pageIndex?: number;
  totalCount?: number;
  perPage?: number;
  handlePage?: (page: number) => void;
}

export function Pagination({
  pageIndex,
  perPage,
  totalCount,
  handlePage,
}: PaginationProps) {
  const pages = Math.ceil(totalCount! / perPage!) || 1;

  return (
    <div className="flex font-sans items-center justify-between rounded-lg px-3 py-1 text-[#818086]">
      <div className="">
        <Button
          onClick={() =>
            pageIndex! <= pages && pageIndex != 1
              ? handlePage!(pageIndex! - 1)
              : null
          }
          variant="outline"
          className="bg-trasnparent border-none hover:bg-[#FEEAE7]"
        >
          <ArrowLeft size={18} className="mr-2 " />
          <span className="font-medium ">Anterior</span>
        </Button>
      </div>

      <div className="flex items-center gap-6 py-4 lg:gap-8">
        <div className="flex items-center gap-2">
          <Button
            onClick={() =>
              pageIndex! + 1 <= pages ? handlePage!(pageIndex! + 1) : null
            }
            variant="outline"
            className="h-8 w-8 border-none p-0"
          >
            <span>{pageIndex! + 1}</span>
          </Button>

          <Button
            onClick={() =>
              pageIndex! + 2 <= pages ? handlePage!(pageIndex! + 2) : null
            }
            variant="outline"
            className="h-8 w-8 border-none p-0 sm:block hidden"
          >
            <span>{pageIndex! + 2}</span>
          </Button>

          <Button
            variant="outline"
            className="h-8 w-8 border-none p-0 sm:block hidden"
          >
            <span>...</span>
          </Button>

          <Button
            onClick={() =>
              pageIndex! + 9 <= pages ? handlePage!(pageIndex! + 9) : null
            }
            variant="outline"
            className="h-8 w-8 border-none p-0 sm:block hidden"
          >
            <span>{pageIndex! + 9}</span>
          </Button>

          <Button
            onClick={() =>
              pageIndex! + 10 <= pages ? handlePage!(pageIndex! + 10) : null
            }
            variant="outline"
            className="h-8 w-8 border-none p-0 sm:block hidden"
          >
            <span>{pageIndex! + 10} </span>
          </Button>

          {/* <Button variant="outline" className="h-8 w-8 border-none p-0">
            <span>{pages}</span>
          </Button> */}
        </div>
      </div>

      <div className="">
        <Button
          onClick={() =>
            pageIndex! + 1 <= pages ? handlePage!(pageIndex! + 1) : null
          }
          variant="outline"
          className="bg-trasnparent border-none hover:bg-[#FEEAE7]"
        >
          <span className="font-medium ">Próximo</span>
          <ArrowRight size={18} className="ml-2 " />
        </Button>
      </div>
    </div>
  );
}
