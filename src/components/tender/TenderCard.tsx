import { useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Calendar,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
} from "lucide-react";
import { Tender } from "@/lib/types";
import TenderDetailDialog from "./TaskDetailDialog";
import {
  getPriorityClass,
  getStatusClass,
  getStatusClassBG,
} from "@/lib/utils";

interface TenderCardProps {
  tender: Tender;
  onUpdateTender: (tender: Tender) => void;
  columnId: string;
  isDragging?: boolean;
}

export default function TenderCard({
  tender,
  onUpdateTender,
  columnId,
  isDragging = false,
}: TenderCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: tender.id,
      data: {
        type: "tender",
        tender,
        // Pass the container id so we know which column this card belongs to
        sortable: { containerId: columnId },
      },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleOpenDialog = () => {
    if (!tender.commentsList) {
      onUpdateTender({ ...tender, commentsList: [] });
    }
    setIsDialogOpen(true);
  };

  const handleAddComment = (text: string) => {
    const newComment = {
      id: Math.random().toString(36).substring(2, 9),
      text,
      author: "You",
      createdAt: new Date().toLocaleString(),
    };
    const updatedCommentsList = [...(tender.commentsList || []), newComment];
    onUpdateTender({
      ...tender,
      commentsList: updatedCommentsList,
      comments: updatedCommentsList.length,
    });
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className="bg-[#262626] rounded-xl p-4 shadow transition-colors">
        {/* Draggable Upper Section */}
        <div {...attributes} {...listeners} className="cursor-grab">
          <div className="flex items-center justify-between mb-3">
            <div
              className={`flex items-center gap-2 mb-2 ${getStatusClassBG(
                tender.status
              )} rounded-full px-2 py-0.5 max-w-fit`}>
              <div
                className={`w-2 h-2 rounded-full ${getStatusClass(
                  tender.status
                )}`}></div>
              <span className="text-xs text-white">
                {tender.status === "todo"
                  ? "To Do"
                  : tender.status === "in-progress"
                  ? "In Progress"
                  : tender.status === "not-started"
                  ? "Not Started"
                  : "Completed"}
              </span>
            </div>
            <div className="flex-grow" />
            <button
              className="text-gray-400 hover:text-white"
              onClick={(e) => e.stopPropagation()}>
              <MoreHorizontal size={16} />
            </button>
          </div>

          <h3 className="text-white font-medium mb-1">{tender.title}</h3>
          <p className="text-gray-400 text-sm mb-3">{tender.description}</p>

          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-gray-400 text-xs">Assignee</span>
            <div className="w-6 h-6 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
              {tender.assigneeAvatar ? (
                <img
                  src={tender.assigneeAvatar}
                  alt={tender.assignee}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-white text-xs">
                  {tender.assignee.charAt(0)}
                </span>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-1 text-gray-400 text-xs">
              <Calendar size={12} />
              <span>{tender.dueDate}</span>
            </div>
            <div
              className={`text-xs px-2 py-0.5 rounded ${getPriorityClass(
                tender.priority
              )}`}>
              {tender.priority.charAt(0).toUpperCase() +
                tender.priority.slice(1)}
            </div>
          </div>

          <div className="-mx-4 border-t border-border my-4" />
        </div>

        {/* Clickable Lower Section */}
        <div className="cursor-pointer" onClick={handleOpenDialog}>
          <div className="flex items-center gap-4 text-gray-400 text-xs">
            <div className="flex items-center gap-1">
              <MessageSquare size={12} />
              <span>{tender.comments} Comments</span>
            </div>
            <div className="flex items-center gap-1">
              <Paperclip size={12} />
              <span>{tender.attachments} Attachments</span>
            </div>
          </div>
        </div>
      </div>

      {isDialogOpen && (
        <TenderDetailDialog
          tender={tender}
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onAddComment={handleAddComment}
        />
      )}
    </>
  );
}
