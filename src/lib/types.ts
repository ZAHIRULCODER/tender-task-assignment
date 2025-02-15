export interface Tender {
  id: string;
  title: string;
  description: string;
  status: "todo" | "in-progress" | "not-started" | "completed";
  priority: "low" | "medium" | "high";
  assignee: string;
  assigneeAvatar?: string;
  dueDate: string;
  comments: number;
  attachments: number;
  commentsList?: Comment[];
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  authorAvatar?: string;
  createdAt: string;
}
