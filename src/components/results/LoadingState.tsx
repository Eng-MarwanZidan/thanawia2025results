import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";

export function LoadingState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="bg-card rounded-xl p-6 shadow-card space-y-4">
        <Skeleton className="h-16 w-full rounded-lg" />
        <div className="space-y-3">
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
          <Skeleton className="h-20 w-full rounded-xl" />
        </div>
        <Skeleton className="h-12 w-full rounded-lg" />
      </div>
    </motion.div>
  );
}
