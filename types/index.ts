export interface Book {
  id: string
  title: string
  authors?: string[]
  description?: string
  price: number
  originalPrice?: number
  imageUrl?: string | null
  publisher?: string
  publishedDate?: string
  isbn?: string
  pageCount?: number
  categories?: string[]
}

export interface User {
  id: string
  name: string
  email: string
  password: string
}
