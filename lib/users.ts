// This file would normally interact with a database
// For this example, we'll use mock data

import type { User } from "@/types"

// Mock users
const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    password: "password123", // In a real app, this would be hashed
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    password: "password456", // In a real app, this would be hashed
  },
]

// Function to get a user by email
export async function getUserByEmail(email: string): Promise<User | null> {
  const user = users.find((user) => user.email === email)
  return user || null
}

// Function to create a new user
export async function createUser(userData: { name: string; email: string; password: string }): Promise<User> {
  const newUser: User = {
    id: `${users.length + 1}`,
    ...userData,
  }

  users.push(newUser)

  return newUser
}
