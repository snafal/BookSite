// This file would normally interact with a database or external API
// For this example, we'll use mock data and the Google Books API

import type { Book } from "@/types"

// Mock featured books with reliable image paths
const mockBooks: Book[] = [
  {
    id: "1",
    title: "The Great Gatsby",
    authors: ["F. Scott Fitzgerald"],
    description: "A story of wealth, love, and tragedy set in the Roaring Twenties.",
    price: 12.99,
    // Using direct placeholder images that don't require file uploads
    imageUrl: "https://m.media-amazon.com/images/I/71FTb9X6wsL._AC_UF1000,1000_QL80_.jpg",
    publisher: "Scribner",
    publishedDate: "1925-04-10",
    isbn: "9780743273565",
    pageCount: 180,
    categories: ["Fiction", "Classics"],
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    authors: ["Harper Lee"],
    description: "A powerful story of racial injustice and moral growth in the American South.",
    price: 14.99,
    imageUrl: "https://m.media-amazon.com/images/I/71FxgtFKcQL._AC_UF1000,1000_QL80_.jpg",
    publisher: "HarperCollins",
    publishedDate: "1960-07-11",
    isbn: "9780061120084",
    pageCount: 336,
    categories: ["Fiction", "Classics"],
  },
  {
    id: "3",
    title: "1984",
    authors: ["George Orwell"],
    description: "A dystopian novel about totalitarianism, surveillance, and thought control.",
    price: 11.99,
    imageUrl: "https://m.media-amazon.com/images/I/71kxa1-0mfL._AC_UF1000,1000_QL80_.jpg",
    publisher: "Penguin Books",
    publishedDate: "1949-06-08",
    isbn: "9780451524935",
    pageCount: 328,
    categories: ["Fiction", "Dystopian"],
  },
  {
    id: "4",
    title: "Pride and Prejudice",
    authors: ["Jane Austen"],
    description: "A romantic novel of manners that satirizes issues of marriage and social class.",
    price: 9.99,
    imageUrl: "https://m.media-amazon.com/images/I/71Q1tPupKjL._AC_UF1000,1000_QL80_.jpg",
    publisher: "Penguin Classics",
    publishedDate: "1813-01-28",
    isbn: "9780141439518",
    pageCount: 432,
    categories: ["Fiction", "Romance", "Classics"],
  },
  {
    id: "5",
    title: "The Hobbit",
    authors: ["J.R.R. Tolkien"],
    description: "A fantasy novel about the adventures of hobbit Bilbo Baggins.",
    price: 13.99,
    imageUrl: "https://m.media-amazon.com/images/I/710+HcoP38L._AC_UF1000,1000_QL80_.jpg",
    publisher: "Houghton Mifflin Harcourt",
    publishedDate: "1937-09-21",
    isbn: "9780547928227",
    pageCount: 304,
    categories: ["Fiction", "Fantasy"],
  },
  {
    id: "6",
    title: "Harry Potter and the Philosopher's Stone",
    authors: ["J.K. Rowling"],
    description: "The first novel in the Harry Potter series, following a young wizard's journey.",
    price: 15.99,
    imageUrl: "https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg",
    publisher: "Bloomsbury",
    publishedDate: "1997-06-26",
    isbn: "9780747532743",
    pageCount: 223,
    categories: ["Fiction", "Fantasy", "Young Adult"],
  },
  {
    id: "7",
    title: "The Catcher in the Rye",
    authors: ["J.D. Salinger"],
    description: "A novel about teenage alienation and loss of innocence.",
    price: 10.99,
    imageUrl: "https://m.media-amazon.com/images/I/61fgOuZfBGL._AC_UF1000,1000_QL80_.jpg",
    publisher: "Little, Brown and Company",
    publishedDate: "1951-07-16",
    isbn: "9780316769488",
    pageCount: 277,
    categories: ["Fiction", "Coming-of-age"],
  },
  {
    id: "8",
    title: "The Lord of the Rings",
    authors: ["J.R.R. Tolkien"],
    description: "An epic high-fantasy novel set in Middle-earth.",
    price: 19.99,
    imageUrl: "https://m.media-amazon.com/images/I/71jLBXtWJWL._AC_UF1000,1000_QL80_.jpg",
    publisher: "Allen & Unwin",
    publishedDate: "1954-07-29",
    isbn: "9780618640157",
    pageCount: 1178,
    categories: ["Fiction", "Fantasy"],
  },
]

// Function to get featured books
export async function getFeaturedBooks(): Promise<Book[]> {
  // In a real app, this would fetch from an API or database
  return mockBooks
}

// Function to search books using Google Books API
export async function searchBooks(query: string, page = 1, limit = 10): Promise<Book[]> {
  if (!query) {
    return mockBooks
  }

  try {
    const startIndex = (page - 1) * limit
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=${limit}`,
    )

    if (!response.ok) {
      throw new Error("Failed to fetch books")
    }

    const data = await response.json()

    if (!data.items) {
      return mockBooks
    }

    return data.items.map((item: any) => ({
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ["Unknown Author"],
      description: item.volumeInfo.description || "No description available",
      price: item.saleInfo?.retailPrice?.amount || 9.99,
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Cover",
      publisher: item.volumeInfo.publisher || "Unknown Publisher",
      publishedDate: item.volumeInfo.publishedDate || "Unknown Date",
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || "Unknown ISBN",
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || ["Uncategorized"],
    }))
  } catch (error) {
    console.error("Error searching books:", error)
    return mockBooks
  }
}

// Function to get a book by ID
export async function getBookById(id: string): Promise<Book | null> {
  // First check mock books
  const mockBook = mockBooks.find((book) => book.id === id)
  if (mockBook) {
    return mockBook
  }

  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)

    if (!response.ok) {
      throw new Error("Book not found")
    }

    const item = await response.json()

    return {
      id: item.id,
      title: item.volumeInfo.title,
      authors: item.volumeInfo.authors || ["Unknown Author"],
      description: item.volumeInfo.description || "No description available",
      price: item.saleInfo?.retailPrice?.amount || 9.99,
      imageUrl: item.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/128x192?text=No+Cover",
      publisher: item.volumeInfo.publisher || "Unknown Publisher",
      publishedDate: item.volumeInfo.publishedDate || "Unknown Date",
      isbn: item.volumeInfo.industryIdentifiers?.[0]?.identifier || "Unknown ISBN",
      pageCount: item.volumeInfo.pageCount || 0,
      categories: item.volumeInfo.categories || ["Uncategorized"],
    }
  } catch (error) {
    console.error("Error fetching book:", error)
    return null
  }
}

// Function to get related books
export async function getRelatedBooks(bookId: string): Promise<Book[]> {
  // In a real app, this would fetch related books based on the book's categories or author
  // For this example, we'll just return some mock books
  return mockBooks.filter((book) => book.id !== bookId)
}

// Function to get all books
export async function getAllBooks(): Promise<Book[]> {
  return mockBooks
}
