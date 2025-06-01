import { useEffect, useState } from 'react'

const KEY = 'fdc9b2b2'

export const useMovies = query => {
  const [movies, setMovies] = useState([]) // List of movies from search
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const [error, setError] = useState('') // Error handling
  useEffect(() => {
    // Controller for aborting fetch requests
    const controller = new AbortController()

    const fetchMovies = async () => {
      // Don't search if query is too short
      if (query.length < 3) {
        setMovies([])
        setError('')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        // Fetch movies from OMDB API
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal
        })

        if (!res.ok) throw new Error('Failed to fetch movies')

        const data = await res.json()

        // Handle successful response
        if (data.Response === 'True') {
          setMovies(data.Search)
          setError('')
        } else {
          throw new Error(data.Error || 'Movie not found')
        }
      } catch (error) {
        // Ignore abort errors (these happen when component unmounts)
        if (error.name === 'AbortError') return
        console.error(`Error in fetchMovies method: ${error.message || error}`)
        setError(error.message || error)
      } finally {
        setIsLoading(false)
      }
    }

    // handleCloseMovie() // Close movie details when search changes
    fetchMovies()

    // Cleanup function to abort fetch when component unmounts or query changes
    return () => {
      controller.abort()
    }
  }, [query])

  return { movies, isLoading, error }
}