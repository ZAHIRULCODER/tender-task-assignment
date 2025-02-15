"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  pointerWithin,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";

import TenderColumn from "./TenderColumn";
import TenderCard from "./TenderCard";
import { useTenders } from "@/hooks/useTenders";
import { Tender } from "@/lib/types";

// Custom collision detection: if closestCorners returns nothing, fall back to pointerWithin.
const customCollisionDetection = (args: any) => {
  const collisions = closestCorners(args);
  return collisions.length ? collisions : pointerWithin(args);
};

export default function TenderBoard() {
  const { tenders, updateTender } = useTenders();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor)
  );

  const getActiveTender = (): Tender | null =>
    tenders.find((tender) => tender.id === activeId) || null;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      setActiveId(null);
      return;
    }

    // Use optional chaining to safely access sortable data.
    const activeContainer = active.data?.current?.sortable?.containerId;
    let overContainer = over.data?.current?.sortable?.containerId;

    // Fallback: if dropping into an empty column, over.data may be undefined.
    if (
      !overContainer &&
      typeof over.id === "string" &&
      over.id.startsWith("column-")
    ) {
      overContainer = over.id;
    }

    if (activeContainer && overContainer && activeContainer !== overContainer) {
      const activeTender = tenders.find((t) => t.id === active.id);
      if (activeTender) {
        // New status is derived from the container id (i.e. "column-todo" becomes "todo")
        const newStatus = overContainer.replace("column-", "") as
          | "todo"
          | "not-started"
          | "in-progress"
          | "completed";

        const updatedTender: Tender = { ...activeTender, status: newStatus };
        updateTender(updatedTender);
      }
    }
    setActiveId(null);
  };

  // Filter tenders by status.
  const todoTenders = tenders.filter((t) => t.status === "todo");
  const notStartedTenders = tenders.filter((t) => t.status === "not-started");
  const inProgressTenders = tenders.filter((t) => t.status === "in-progress");
  const completedTenders = tenders.filter((t) => t.status === "completed");

  // Mapping to get droppable container id from a tender status.
  const columnMapping: Record<string, string> = {
    todo: "column-todo",
    "not-started": "column-not-started",
    "in-progress": "column-in-progress",
    completed: "column-completed",
  };

  const activeTender = getActiveTender();

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={customCollisionDetection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}>
      {/* Horizontal scroll wrapper */}
      <div className="overflow-x-auto">
        {/* On mobile: stack as one column; on md+: force a minimum width so columns don’t shrink */}
        <div className="min-w-full md:min-w-[1500px] grid grid-cols-1 md:grid-cols-4 gap-6">
          <TenderColumn
            id="column-todo"
            title="To Do"
            tenders={todoTenders}
            count={todoTenders.length}
            color="yellow"
            onUpdateTender={updateTender}
          />
          <TenderColumn
            id="column-not-started"
            title="Not Started"
            tenders={notStartedTenders}
            count={notStartedTenders.length}
            color="orange"
            onUpdateTender={updateTender}
          />
          <TenderColumn
            id="column-in-progress"
            title="In Progress"
            tenders={inProgressTenders}
            count={inProgressTenders.length}
            color="blue"
            onUpdateTender={updateTender}
          />
          <TenderColumn
            id="column-completed"
            title="Completed"
            tenders={completedTenders}
            count={completedTenders.length}
            color="green"
            onUpdateTender={updateTender}
          />
        </div>
      </div>

      <DragOverlay>
        {activeTender && (
          <div className="w-full">
            <TenderCard
              tender={activeTender}
              onUpdateTender={updateTender}
              columnId={columnMapping[activeTender.status]}
              isDragging={true}
            />
          </div>
        )}
      </DragOverlay>
    </DndContext>
  );
}
