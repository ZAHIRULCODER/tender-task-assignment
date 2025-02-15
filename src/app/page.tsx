"use client";

import Header from "@/components/layout/Header";
import TenderBoard from "@/components/tender/TenderBoard";
import TendersList from "@/components/tender/TendersList";
import { useState } from "react";

export default function TenderTasksPage() {
  const [viewMode, setViewMode] = useState<"list" | "board">("board");

  return (
    <>
      <Header viewMode={viewMode} setViewMode={setViewMode} />

      <main className="flex-1 overflow-auto p-2 md:p-6">
        {viewMode === "list" ? <TendersList /> : <TenderBoard />}
      </main>
    </>
  );
}
