import { Search, BarChart2, Phone, Menu } from "lucide-react";

export default function Sidebar() {
  return (
    <div className="w-16 bg-[#1a1a1a] flex flex-col items-center py-4 border-r border-[#333]">
      <button className="w-10 h-10 rounded-md bg-[#333] mb-8 flex items-center justify-center">
        <Menu size={20} />
      </button>

      <div className="flex flex-col gap-8 items-center">
        <button className="text-white p-2 rounded-md hover:bg-[#333]">
          <Search size={20} />
        </button>
        <button className="text-white p-2 rounded-md hover:bg-[#333]">
          <BarChart2 size={20} />
        </button>
        <button className="text-white p-2 rounded-md hover:bg-[#333]">
          <Phone size={20} />
        </button>
      </div>
    </div>
  );
}
