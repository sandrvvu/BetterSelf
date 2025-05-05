"use client";

import { Provider } from "react-redux";

import { store } from "@/state/store";

type ClientLayoutProps = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: ClientLayoutProps) {
  return <Provider store={store}>{children}</Provider>;
}
