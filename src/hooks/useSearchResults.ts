import { useState, useCallback } from "react";
import type { StudentResult, SearchType } from "@/types/result";

// This will be replaced with actual API call once Django backend is ready
const MOCK_DELAY = 1500;

// Mock data for demonstration
const MOCK_RESULTS: StudentResult[] = [
  { name: "أحمد محمد علي", seat_number: "123456", degree: 385 },
  { name: "فاطمة أحمد حسن", seat_number: "654321", degree: 290 },
  { name: "محمود سامي عبدالله", seat_number: "111222", degree: 180 },
];

interface UseSearchResultsReturn {
  result: StudentResult | null;
  isLoading: boolean;
  error: string | null;
  notFound: boolean;
  lastQuery: string;
  search: (query: string, type: SearchType) => Promise<void>;
  reset: () => void;
}

export function useSearchResults(): UseSearchResultsReturn {
  const [result, setResult] = useState<StudentResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [lastQuery, setLastQuery] = useState("");

  const search = useCallback(async (query: string, type: SearchType) => {
    setIsLoading(true);
    setError(null);
    setNotFound(false);
    setResult(null);
    setLastQuery(query);

    try {
      // Simulate API call - replace with actual fetch when API is ready
      await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));

      // Mock search logic
      const found = MOCK_RESULTS.find(r => 
        type === "seat_number" 
          ? r.seat_number === query 
          : r.name.includes(query)
      );

      if (found) {
        setResult(found);
      } else {
        setNotFound(true);
      }

      // Actual API call would look like:
      // const endpoint = type === "seat_number" 
      //   ? `/api/results/seat/${query}`
      //   : `/api/results/name/${encodeURIComponent(query)}`;
      // const response = await fetch(`${API_BASE_URL}${endpoint}`);
      // 
      // if (response.status === 404) {
      //   setNotFound(true);
      //   return;
      // }
      // 
      // if (!response.ok) {
      //   throw new Error("حدث خطأ أثناء البحث");
      // }
      // 
      // const data = await response.json();
      // setResult(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ غير متوقع");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setResult(null);
    setError(null);
    setNotFound(false);
    setLastQuery("");
  }, []);

  return {
    result,
    isLoading,
    error,
    notFound,
    lastQuery,
    search,
    reset,
  };
}
