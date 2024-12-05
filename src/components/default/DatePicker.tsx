"use client";

import * as React from "react";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function DatePicker({ date, setDate }: any) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className={cn(
            "w-full justify-center text-left text-[#80828D] font-normal bg-transparent border",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-[#80828D]" />
          {date ? (
            date
          ) : (
            <span className=" font-semibold text-[#80828D]">
              Selecione uma Data
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex w-auto flex-col">
        <div className="rounded-md border w-full">
          <Calendar
            className="w-full flex"
            mode="single"
            selected={date}
            onSelect={setDate}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
