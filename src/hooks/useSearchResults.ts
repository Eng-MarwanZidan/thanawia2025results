import { useState, useCallback } from "react";
import type { StudentResult, SearchType } from "@/types/result";

const API_BASE_URL = "http://127.0.0.1:8000/api/results/search";

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
      const endpoint = type === "seat_number" 
        ? `${API_BASE_URL}/seat/number/${query}/`
        : `${API_BASE_URL}/name/${encodeURIComponent(query)}/`;
      
      const response = await fetch(endpoint);
      
      if (response.status === 404) {
        setNotFound(true);
        return;
      }
      
      if (!response.ok) {
        throw new Error("حدث خطأ أثناء البحث");
      }
      
      const data = await response.json();
      setResult(data);

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
