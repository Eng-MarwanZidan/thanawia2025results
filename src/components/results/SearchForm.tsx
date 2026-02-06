import { useState } from "react";
import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import type { SearchType } from "@/types/result";

interface SearchFormProps {
  searchType: SearchType;
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export function SearchForm({ searchType, onSearch, isLoading }: SearchFormProps) {
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");

  const placeholder = searchType === "seat_number" 
    ? "أدخل رقم الجلوس..." 
    : "أدخل اسم الطالب...";

  const validateInput = (value: string): boolean => {
    if (!value.trim()) {
      setError(searchType === "seat_number" ? "يرجى إدخال رقم الجلوس" : "يرجى إدخال اسم الطالب");
      return false;
    }

    if (searchType === "seat_number") {
      if (!/^\d+$/.test(value.trim())) {
        setError("رقم الجلوس يجب أن يحتوي على أرقام فقط");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput(query)) {
      onSearch(query.trim());
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    if (error) setError("");
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <div className="relative">
        <Input
          type={searchType === "seat_number" ? "tel" : "text"}
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          className="h-14 text-lg pr-12 bg-card border-2 border-border/50 focus:border-primary transition-colors shadow-card"
          dir="rtl"
          disabled={isLoading}
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
      </div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-destructive text-sm font-medium"
        >
          {error}
        </motion.p>
      )}

      <Button
        type="submit"
        disabled={isLoading}
        className="w-full h-14 text-lg font-bold gradient-primary hover:opacity-90 transition-opacity shadow-elegant"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin ml-2" />
            جاري البحث...
          </>
        ) : (
          <>
            <Search className="w-5 h-5 ml-2" />
            بحث
          </>
        )}
      </Button>
    </motion.form>
  );
}
