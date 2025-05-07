"use client"

import { useState } from "react"
import Link from "next/link"

export function YouTubeHero() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-screen overflow-hidden bg-black">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
            <div className="animate-pulse text-white">Loading video...</div>
          </div>
        )}
        <div className="relative w-full h-full">
          <iframe
            className="absolute inset-0 w-full h-full"
            src="https://www.youtube.com/embed/ZNSA0NrDeb4?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=ZNSA0NrDeb4"
            title="BookHaven Library Background"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onLoad={() => setIsLoading(false)}
          ></iframe>
        </div>
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center pointer-events-none">
          <div className="text-center text-white p-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
            <p className="text-lg md:text-xl mb-8">Explore thousands of books in our collection</p>
            <Link href="/books" className="pointer-events-auto">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors shadow-lg">
                Start Exploring
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
