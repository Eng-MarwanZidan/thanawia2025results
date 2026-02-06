import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SearchTabs } from "@/components/results/SearchTabs";
import { SearchForm } from "@/components/results/SearchForm";
import { ResultCard } from "@/components/results/ResultCard";
import { LoadingState } from "@/components/results/LoadingState";
import { ErrorState } from "@/components/results/ErrorState";
import { NotFoundState } from "@/components/results/NotFoundState";
import { useSearchResults } from "@/hooks/useSearchResults";
import type { SearchType } from "@/types/result";

const Index = () => {
  const [searchType, setSearchType] = useState<SearchType>("seat_number");
  const [isDark, setIsDark] = useState(false);
  const { result, isLoading, error, notFound, lastQuery, search, reset } = useSearchResults();

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle("dark");
  };

  const handleSearch = (query: string) => {
    search(query, searchType);
  };

  const showSearchForm = !result && !error && !notFound && !isLoading;

  return (
    <div className="min-h-screen bg-background">
      {/* Decorative Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 py-4 px-4">
        <div className="container max-w-lg mx-auto flex justify-between items-center">
          <div className="w-10" /> {/* Spacer */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container max-w-lg mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          {/* Logo/Icon */}
          <div className="w-24 h-24 mx-auto mb-6 gradient-primary rounded-3xl flex items-center justify-center shadow-elegant">
            <GraduationCap className="w-12 h-12 text-primary-foreground" />
          </div>

          <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-l from-primary to-primary/70 bg-clip-text text-transparent">
            نتائج الثانوية العامة
          </h1>
          <p className="text-muted-foreground text-lg">
            ابحث عن نتيجتك برقم الجلوس أو الاسم
          </p>
        </motion.div>

        {/* Search Card */}
        <Card className="p-6 shadow-elegant border-0 bg-card/80 backdrop-blur-sm">
          <AnimatePresence mode="wait">
            {showSearchForm && (
              <motion.div
                key="search"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-6"
              >
                <SearchTabs activeTab={searchType} onTabChange={setSearchType} />
                <SearchForm
                  searchType={searchType}
                  onSearch={handleSearch}
                  isLoading={isLoading}
                />
              </motion.div>
            )}

            {isLoading && (
              <motion.div key="loading">
                <LoadingState />
              </motion.div>
            )}

            {error && (
              <motion.div key="error">
                <ErrorState message={error} onRetry={reset} />
              </motion.div>
            )}

            {notFound && (
              <motion.div key="not-found">
                <NotFoundState searchQuery={lastQuery} onRetry={reset} />
              </motion.div>
            )}
          </AnimatePresence>
        </Card>

        {/* Result Card (shown outside the search card) */}
        <AnimatePresence>
          {result && (
            <motion.div
              key="result"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6"
            >
              <ResultCard result={result} onSearchAgain={reset} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Demo Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-sm text-muted-foreground mt-8"
        >
          جرب البحث بـ: 123456 أو 654321 أو 111222
        </motion.p>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 text-center text-sm text-muted-foreground">
        <p>نتائج الثانوية العامة © 2024</p>
      </footer>
    </div>
  );
};

export default Index;
