import { motion } from "framer-motion";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Hash, Award, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import type { StudentResult } from "@/types/result";

interface ResultCardProps {
  result: StudentResult;
  onSearchAgain: () => void;
}

const PASSING_GRADE = 205; // 50% of 410 total

export function ResultCard({ result, onSearchAgain }: ResultCardProps) {
  const isPassing = result.degree >= PASSING_GRADE;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
    >
      <Card className="overflow-hidden shadow-elegant border-0">
        {/* Status Header */}
        <CardHeader className={`py-6 ${isPassing ? 'gradient-success' : 'bg-destructive'}`}>
          <div className="flex items-center justify-center gap-3 text-white">
            {isPassing ? (
              <>
                <CheckCircle2 className="w-8 h-8" />
                <span className="text-2xl font-bold">ناجح</span>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8" />
                <span className="text-2xl font-bold">راسب</span>
              </>
            )}
          </div>
        </CardHeader>

        <CardContent className="p-6 space-y-6">
          {/* Student Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className="w-12 h-12 gradient-primary rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">اسم الطالب</p>
                <p className="text-xl font-bold">{result.name}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <Hash className="w-6 h-6 text-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">رقم الجلوس</p>
                <p className="text-xl font-bold font-mono" dir="ltr">{result.seat_number}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isPassing ? 'gradient-success' : 'bg-destructive'}`}>
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">المجموع</p>
                <div className="flex items-center gap-3">
                  <p className="text-3xl font-bold">{result.degree}</p>
                  <Badge variant={isPassing ? "default" : "destructive"} className={isPassing ? 'gradient-success border-0' : ''}>
                    {isPassing ? "ناجح" : "راسب"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Search Again Button */}
          <Button
            onClick={onSearchAgain}
            variant="outline"
            className="w-full h-12 text-base font-medium"
          >
            <RotateCcw className="w-5 h-5 ml-2" />
            بحث عن نتيجة أخرى
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}
