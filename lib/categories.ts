// This file would normally interact with a database
// For this example, we'll use mock data

// Mock categories
const categories = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Biography",
  "History",
  "Self-Help",
  "Business",
  "Children's",
  "Young Adult",
  "Science",
  "Technology",
  "Art",
  "Cooking",
  "Travel",
  "Religion",
  "Philosophy",
]

// Function to get all categories
export async function getAllCategories(): Promise<string[]> {
  return categories
}
