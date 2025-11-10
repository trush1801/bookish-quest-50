import { useState, useEffect } from "react";
import { BookOpen } from "lucide-react";
import { SearchBar } from "@/components/SearchBar";
import { BookCard } from "@/components/BookCard";
import { EmptyState } from "@/components/EmptyState";
import { LoadingState } from "@/components/LoadingState";
import { searchBooks, Book } from "@/services/bookService";
import { useToast } from "@/components/ui/use-toast";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const handleSearch = async (query: string) => {
    setIsLoading(true);
    setSearchQuery(query);
    
    try {
      const results = await searchBooks(query);
      setBooks(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: "Try searching with different keywords.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch books. Please try again.",
        variant: "destructive",
      });
      setBooks([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="p-2 bg-primary rounded-lg">
              <BookOpen className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl font-bold text-foreground">Book Finder</h1>
          </div>
          <SearchBar onSearch={handleSearch} isLoading={isLoading} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {isLoading ? (
          <LoadingState />
        ) : books.length > 0 ? (
          <>
            <p className="text-sm text-muted-foreground mb-6">
              Found {books.length} results for "{searchQuery}"
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard
                  key={book.id}
                  title={book.title}
                  author={book.author}
                  coverUrl={book.coverUrl}
                />
              ))}
            </div>
          </>
        ) : (
          <EmptyState query={searchQuery} />
        )}
      </main>
    </div>
  );
};

export default Index;
