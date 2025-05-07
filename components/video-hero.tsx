"use client"

import { useRef, useState, useEffect } from "react"
import Link from "next/link"

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoError, setVideoError] = useState(false)

  useEffect(() => {
    const videoElement = videoRef.current
    if (!videoElement) return

    const handlePlay = () => {
      console.log("Video is playing")
    }

    const handleError = (e: Event) => {
      console.error("Video error:", e)
      setVideoError(true)
    }

    // Add event listeners
    videoElement.addEventListener("play", handlePlay)
    videoElement.addEventListener("error", handleError)

    // Attempt to play the video
    const playVideo = async () => {
      try {
        if (videoElement.paused) {
          await videoElement.play()
        }
      } catch (error) {
        console.error("Failed to play video:", error)
        setVideoError(true)
      }
    }

    playVideo()

    // Clean up
    return () => {
      videoElement.removeEventListener("play", handlePlay)
      videoElement.removeEventListener("error", handleError)
      videoElement.pause()
    }
  }, [])

  return (
    <section className="relative w-full overflow-hidden">
      <div className="relative w-full h-[60vh] max-h-[600px] overflow-hidden">
        {!videoError ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover"
            muted
            loop
            playsInline
            poster="/images/hero-fallback.png"
            preload="auto"
          >
            <source src="/videos/bookstore-video.mp4" type="video/mp4" />
            {/* Fallback for browsers that don't support video */}
            <img
              src="/images/hero-fallback.png"
              alt="BookHaven Hero"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </video>
        ) : (
          // Fallback image if video fails to load
          <img
            src="/images/hero-fallback.png"
            alt="BookHaven Hero"
            className="absolute inset-0 w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <div className="text-center text-white p-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Discover Your Next Adventure</h1>
            <p className="text-lg md:text-xl mb-8">Explore thousands of books in our collection</p>
            <Link href="/books">
              <button className="bg-primary hover:bg-primary/90 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                Start Exploring
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
