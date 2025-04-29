"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Brain,
  BookHeart,
  Component,
  Home,
  Goal,
  Telescope,
  Star,
  ChevronUp,
  User2,
  LogOut,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import AppAvatar from "@/components/app-avatar";

const items = [
  { title: "Home", url: "/home", icon: Home },
  { title: "Categories", url: "/categories", icon: Component },
  { title: "Goals", url: "/goals", icon: Goal },
  { title: "Journal", url: "/journal", icon: BookHeart },
  { title: "Vision boards", url: "/vision-boards", icon: Telescope },
  { title: "Insights", url: "/insights", icon: Brain },
];

type SidebarProps = {
  name: string;
  email: string;
  onSignOut: () => void;
};

export default function AppSidebar({ name, email, onSignOut }: SidebarProps) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarContent className="flex flex-col h-full">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuButton
              asChild
              className="hover:bg-background active:bg-background"
            >
              <Link href="/home" className="uppercase font-bold font-gravitas">
                <Star />
                betterself
              </Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>My life</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`hover:text-purple-800 hover:bg-purple-200 active:text-purple-800 active:bg-purple-200 ${
                      pathname?.startsWith(item.url)
                        ? "text-purple-800 bg-purple-200 font-semibold"
                        : ""
                    }`}
                  >
                    <Link href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter className="mt-auto mb-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="h-10">
                    <AppAvatar />
                    <p className="flex flex-col items-start text-sm font-semibold">
                      {name}
                      <span className="text-xs font-light">{email}</span>
                    </p>
                    <ChevronUp className="ml-auto" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  className="w-[--radix-popper-anchor-width]"
                >
                  <DropdownMenuItem>
                    <Link href="/account" className="w-full flex gap-2">
                      <User2 size={18} />
                      <span>Account</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={onSignOut}
                    className="cursor-pointer"
                  >
                    <LogOut />
                    <span>Sign out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}

