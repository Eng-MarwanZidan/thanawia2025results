import { motion } from "framer-motion";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCcw } from "lucide-react";

interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <Alert variant="destructive" className="border-destructive/50">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="font-bold">خطأ</AlertTitle>
        <AlertDescription className="mt-2">
          {message}
        </AlertDescription>
      </Alert>
      
      <Button
        onClick={onRetry}
        variant="outline"
        className="w-full mt-4 h-12"
      >
        <RotateCcw className="w-5 h-5 ml-2" />
        حاول مرة أخرى
      </Button>
    </motion.div>
  );
}
