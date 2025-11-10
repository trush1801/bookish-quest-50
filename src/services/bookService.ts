export interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

export const searchBooks = async (query: string): Promise<Book[]> => {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&limit=20`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    const data = await response.json();

    return data.docs.map((doc: any) => ({
      id: doc.key,
      title: doc.title || "Unknown Title",
      author: doc.author_name?.[0] || "Unknown Author",
      coverUrl: doc.cover_i
        ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
        : "https://via.placeholder.com/300x450/f59e0b/ffffff?text=No+Cover",
    }));
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
