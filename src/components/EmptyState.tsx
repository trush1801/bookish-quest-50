import { BookOpen } from "lucide-react";

interface EmptyStateProps {
  query?: string;
}

export const EmptyState = ({ query }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <BookOpen className="w-10 h-10 text-primary" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-foreground">
        {query ? "No books found" : "Start your search"}
      </h3>
      <p className="text-muted-foreground text-center max-w-md">
        {query
          ? `We couldn't find any books matching "${query}". Try searching with different keywords.`
          : "Enter a book title or author name to discover amazing books."}
      </p>
    </div>
  );
};
