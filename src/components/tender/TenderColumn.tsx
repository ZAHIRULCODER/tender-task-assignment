import { PlusIcon, MoreHorizontal } from "lucide-react";
import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import TenderCard from "./TenderCard";
import { Tender } from "@/lib/types";
import { getColumnColorClass } from "@/lib/utils";

interface TenderColumnProps {
  id: string;
  title: string;
  tenders: Tender[];
  count: number;
  color: "yellow" | "blue" | "orange" | "green";
  onUpdateTender: (tender: Tender) => void;
}

export default function TenderColumn({
  id,
  title,
  tenders,
  count,
  color,
  onUpdateTender,
}: TenderColumnProps) {
  const { setNodeRef } = useDroppable({ id });
  const tenderIds = tenders.map((tender) => tender.id);

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col h-full p-4 bg-black rounded-lg shadow min-h-[150px]">
      <div className="flex items-center gap-2 mb-4">
        <div
          className={`w-3 h-3 rounded-full ${getColumnColorClass(
            color
          )}`}></div>
        <h3 className="font-medium text-white">{title}</h3>
        <div className="bg-[#333] text-white text-xs px-2 py-0.5 rounded-full ml-1">
          {count}
        </div>
        <div className="flex-grow"></div>
        <button className="text-white p-1 hover:bg-[#333] rounded-full">
          <PlusIcon size={16} />
        </button>
        <button className="text-white p-1 hover:bg-[#333] rounded-full">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <SortableContext items={tenderIds} strategy={verticalListSortingStrategy}>
        <div className="space-y-4 flex-1 min-h-[100px]">
          {tenders.length === 0 ? (
            <div className="h-full min-h-[100px] flex items-center justify-center text-gray-500 border-2 border-dashed border-gray-700 rounded-lg m-2">
              Drop here
            </div>
          ) : (
            tenders.map((tender) => (
              <TenderCard
                key={tender.id}
                tender={tender}
                onUpdateTender={onUpdateTender}
                columnId={id}
              />
            ))
          )}
        </div>
      </SortableContext>
    </div>
  );
}
