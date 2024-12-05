import { ChevronLeft } from "lucide-react";
import React from "react";

export default function Header({
  title,
  onClose,
}: {
  title: string;
  onClose: () => void;
}) {
  return (
    <div className="flex gap-2">
      <ChevronLeft onClick={onClose} />
      <b>{title}</b>
    </div>
  );
}
