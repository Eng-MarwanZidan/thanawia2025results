import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Hash, User } from "lucide-react";
import type { SearchType } from "@/types/result";

interface SearchTabsProps {
  activeTab: SearchType;
  onTabChange: (tab: SearchType) => void;
}

export function SearchTabs({ activeTab, onTabChange }: SearchTabsProps) {
  return (
    <Tabs value={activeTab} onValueChange={(value) => onTabChange(value as SearchType)} className="w-full">
      <TabsList className="grid w-full grid-cols-2 h-14 p-1.5 bg-secondary/50 backdrop-blur-sm">
        <TabsTrigger 
          value="seat_number" 
          className="flex items-center gap-2 text-base font-medium data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
        >
          <Hash className="w-5 h-5" />
          رقم الجلوس
        </TabsTrigger>
        <TabsTrigger 
          value="name" 
          className="flex items-center gap-2 text-base font-medium data-[state=active]:gradient-primary data-[state=active]:text-primary-foreground transition-all duration-300"
        >
          <User className="w-5 h-5" />
          الاسم
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
