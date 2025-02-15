import { useState } from "react";
import { Send, Paperclip } from "lucide-react";
import { Tender } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { getPriorityClass, getStatusClassBG } from "@/lib/utils";

interface TaskDetailDialogProps {
  tender: Tender;
  isOpen: boolean;
  onClose: () => void;
  onAddComment: (comment: string) => void;
}

export default function TaskDetailDialog({
  tender,
  isOpen,
  onClose,
  onAddComment,
}: TaskDetailDialogProps) {
  const [newComment, setNewComment] = useState("");

  const handleSubmitComment = () => {
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-[#262626] text-white">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl font-semibold">
            {tender.title}
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-2 mb-4">
          <div
            className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-xs ${getStatusClassBG(
              tender.status
            )}`}>
            <span>
              {tender.status === "in-progress"
                ? "In Progress"
                : tender.status === "not-started"
                ? "Not Started"
                : tender.status === "todo"
                ? "To Do"
                : "Completed"}
            </span>
          </div>
          <div
            className={`text-xs px-2 py-0.5 rounded-full ${getPriorityClass(
              tender.priority
            )}`}>
            {tender.priority.charAt(0).toUpperCase() + tender.priority.slice(1)}{" "}
            Priority
          </div>
        </div>

        <div className="mb-4">
          <h4 className="text-sm text-gray-400 mb-1">Description</h4>
          <p className="text-sm">{tender.description}</p>
        </div>

        <div className="flex justify-between mb-6">
          <div>
            <h4 className="text-sm text-gray-400 mb-1">Assignee</h4>
            <div className="flex items-center gap-2">
              <Avatar className="h-6 w-6">
                <AvatarImage src={tender.assigneeAvatar} />
                <AvatarFallback>{tender.assignee.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{tender.assignee}</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm text-gray-400 mb-1">Due Date</h4>
            <span className="text-sm">{tender.dueDate}</span>
          </div>
          <div>
            <h4 className="text-sm text-gray-400 mb-1">Attachments</h4>
            <div className="flex items-center gap-1">
              <Paperclip className="h-4 w-4" />
              <span className="text-sm">{tender.attachments}</span>
            </div>
          </div>
        </div>

        {/* Comments Section */}
        <div className="mt-6">
          <h3 className="font-medium mb-4">
            Comments ({tender.commentsList?.length || 0})
          </h3>

          <div className="space-y-4 max-h-[300px] overflow-y-auto mb-4">
            {tender.commentsList?.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={comment.authorAvatar} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">
                      {comment.author}
                    </span>
                    <span className="text-gray-400 text-xs">
                      {comment.createdAt}
                    </span>
                  </div>
                  <p className="text-sm">{comment.text}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-3 items-start">
            <Avatar className="h-8 w-8">
              <AvatarFallback>U</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <Textarea
                placeholder="Add a comment..."
                className="bg-[#333] border-none focus:ring-primary min-h-[80px] text-sm"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button
                  onClick={handleSubmitComment}
                  className="bg-primary hover:bg-primary/90">
                  <Send className="h-4 w-4 mr-2" />
                  Send
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
