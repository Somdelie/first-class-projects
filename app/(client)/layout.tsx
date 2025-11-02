import React from "react";
import TopNav from "@/components/TopNav";

export default function FrontLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex flex-col">
        <TopNav />
        <main className="">{children}</main>
      </div>
    </div>
  );
}
