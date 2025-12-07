"use client";

import { useState } from "react";
import { Header } from "./header";
import { MyShitPage } from "./my-shit-page";

export const SearchOverlayClient = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<"gallery" | "my-shit">("gallery");

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="relative mx-auto px-2 sm:px-4 py-4 sm:py-8 max-w-full">
        {activeTab === "my-shit" ? <MyShitPage /> : children}
      </div>
    </>
  );
};
