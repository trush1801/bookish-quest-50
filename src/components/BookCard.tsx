import { Card, CardContent } from "@/components/ui/card";

interface BookCardProps {
  title: string;
  author: string;
  coverUrl: string;
}

export const BookCard = ({ title, author, coverUrl }: BookCardProps) => {
  return (
    <Card className="group overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="aspect-[2/3] overflow-hidden bg-muted">
          <img
            src={coverUrl}
            alt={`Cover of ${title}`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/300x450/f59e0b/ffffff?text=No+Cover";
            }}
          />
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 mb-2 text-foreground">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-1">
            {author}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
