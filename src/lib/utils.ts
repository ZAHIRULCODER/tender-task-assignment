import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getPriorityClass = (priority: string) => {
  switch (priority) {
    case "low":
      return "bg-green-600 text-white";
    case "medium":
      return "bg-yellow-600 text-white";
    case "high":
      return "bg-red-600 text-white";
    default:
      return "bg-gray-600 text-white";
  }
};

export const getStatusClass = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-gray-600";
    case "in-progress":
      return "bg-blue-600";
    case "not-started":
      return "bg-orange-600";
    case "completed":
      return "bg-green-600";
    default:
      return "bg-gray-600";
  }
};

export const getStatusClassBG = (status: string) => {
  switch (status) {
    case "todo":
      return "bg-gray-400/70";
    case "in-progress":
      return "bg-blue-400/70";
    case "not-started":
      return "bg-orange-400/70";
    case "completed":
      return "bg-green-400/70";
    default:
      return "bg-gray-400/70";
  }
};

export const getColumnColorClass = (color: string) => {
  switch (color) {
    case "yellow":
      return "bg-yellow-500";
    case "blue":
      return "bg-blue-500";
    case "orange":
      return "bg-orange-500";
    case "green":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};
