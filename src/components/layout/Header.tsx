import { Bell, Search, ViewIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  viewMode: "list" | "board";
  setViewMode: (mode: "list" | "board") => void;
}

export default function Header({ viewMode, setViewMode }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-background px-3 md:px-6 py-4">
      {/* Top row: Title + Bell + Avatar */}
      <div className="flex justify-between border-b border-border pb-4 items-center">
        <h1 className="text-2xl font-semibold">Tender Tasks</h1>
        <div className="flex items-center gap-4">
          {/* Search input visible only on md+ */}
          <div className="relative hidden md:block">
            <Input
              type="text"
              placeholder="Search for Tenders"
              className="w-96 bg-white border-border text-black"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
              <Search className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          <Button variant="ghost" className="p-2">
            <Bell className="h-5 w-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-[#e74c3c] flex items-center justify-center">
            <span className="text-white text-sm">C</span>
          </div>
        </div>
      </div>

      {/* Mobile-only Search Row */}
      <div className="mt-4 block md:hidden">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search for Tenders"
            className="w-full bg-white border-border text-black"
          />
          <button className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>

      {/* Second row: View toggles and action buttons */}
      <div className="mt-4 flex flex-col md:flex-row items-center gap-2">
        <div className="bg-black rounded-full border border-border w-full">
          <button
            onClick={() => setViewMode("list")}
            className={`px-5 py-2.5 rounded-full ${
              viewMode === "list"
                ? "border border-yellow-200 text-foreground"
                : "text-muted-foreground"
            }`}>
            List View
          </button>
          <button
            onClick={() => setViewMode("board")}
            className={`px-5 py-2.5 rounded-full ${
              viewMode === "board"
                ? "border border-yellow-200 text-foreground"
                : "text-muted-foreground"
            }`}>
            Board View
          </button>
        </div>
        <div className="flex-grow"></div>
        <Button
          variant="outline"
          className="border-border bg-black text-foreground w-full md:w-auto">
          View Tender Details
        </Button>
        <Button
          variant="outline"
          className="border-border text-foreground rounded-full w-full md:w-auto">
          <ViewIcon className="mr-2 h-4 w-4" />
          Columns
        </Button>
      </div>
    </header>
  );
}
