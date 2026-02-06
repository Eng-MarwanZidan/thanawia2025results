import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { SearchX, RotateCcw } from "lucide-react";

interface NotFoundStateProps {
  searchQuery: string;
  onRetry: () => void;
}

export function NotFoundState({ searchQuery, onRetry }: NotFoundStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="text-center py-8 space-y-4"
    >
      <div className="w-20 h-20 mx-auto bg-secondary rounded-full flex items-center justify-center">
        <SearchX className="w-10 h-10 text-muted-foreground" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-xl font-bold">لم يتم العثور على نتيجة</h3>
        <p className="text-muted-foreground">
          لا توجد نتيجة مطابقة لـ "{searchQuery}"
        </p>
        <p className="text-sm text-muted-foreground">
          يرجى التأكد من صحة البيانات المدخلة والمحاولة مرة أخرى
        </p>
      </div>

      <Button
        onClick={onRetry}
        variant="outline"
        className="h-12 px-8"
      >
        <RotateCcw className="w-5 h-5 ml-2" />
        بحث جديد
      </Button>
    </motion.div>
  );
}
