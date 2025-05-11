"use client";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

type AppCollapsibleProps = {
  description: string;
  defaultValue?: boolean;
  children: React.ReactNode;
};

export default function AppCollapsible({
  description,
  defaultValue=false,
  children,
}: AppCollapsibleProps) {
  const [open, setOpen] = useState(defaultValue);

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="w-full">
      <CollapsibleTrigger className="w-full flex items-center gap-2 text-primary hover:underline transition-colors">
        {open ? (
          <ChevronDown className="w-4 h-4" />
        ) : (
          <ChevronRight className="w-4 h-4" />
        )}
        <span>{description}</span>
      </CollapsibleTrigger>

      <CollapsibleContent>{children}</CollapsibleContent>
    </Collapsible>
  );
}
