import { NextResponse } from "next/server"
import { createUser } from "@/lib/users"

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json()

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: "Name, email and password are required" }, { status: 400 })
    }

    // Check if user already exists
    // In a real app, this would check against a database

    // Create user
    const user = await createUser({ name, email, password })

    // Generate JWT token
    const token = "sample-jwt-token" // In a real app, this would be a proper JWT

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "Registration failed" }, { status: 500 })
  }
}
