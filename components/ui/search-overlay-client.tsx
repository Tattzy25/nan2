"use client";

import { useState } from "react";
import { Header } from "./header";
import { MyShitPage } from "./my-shit-page";

export const SearchOverlayClient = ({ children }: { children: React.ReactNode }) => {
  const [activeTab, setActiveTab] = useState<"gallery" | "my-shit">("gallery");

  return (
    <>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="container relative mx-auto px-4 py-8">
        {activeTab === "my-shit" ? <MyShitPage /> : children}
      </div>
    </>
  );
};
