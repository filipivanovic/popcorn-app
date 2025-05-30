import { useEffect, useState } from 'react'

// Layout components
import NavBar from './components/layout/NavBar'
import Main from './components/layout/Main'

// Common components
import Search from './components/common/Search'
import NumResults from './components/common/NumResults'
import Loader from './components/common/Loader'
import ErrorMessage from './components/common/ErrorMessage'

// Movie-related components
import Box from './components/movies/Box'
import MovieList from './components/movies/MovieList'
import MovieDetails from './components/movies/MovieDetails'

// Watched movies components
import WatchedSummary from './components/watched/WatchedSummary'
import WatchedList from './components/watched/WatchedList'

// API key for OMDB API
const KEY = 'fdc9b2b2'

const App = () => {
  // State management for the application
  const [query, setQuery] = useState('') // Search query
  const [movies, setMovies] = useState([]) // List of movies from search
  const [watched, setWatched] = useState([]) // List of watched movies
  const [isLoading, setIsLoading] = useState(false) // Loading state
  const [error, setError] = useState('') // Error handling
  const [selectedId, setSelectedId] = useState(null) // Currently selected movie

  // Handles movie selection - toggles selection if clicking same movie
  const handleSelectMovie = id => {
    setSelectedId(selectedId => (selectedId === id ? null : id))
  }

  // Closes the movie details panel
  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  // Adds a movie to the watched list
  const handleWatchedMovie = movie => {
    setWatched(watched => [...watched, movie])
  }

  // Removes a movie from the watched list
  const handleDeleteMovie = id => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  // Effect for fetching movies when search query changes
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

    handleCloseMovie() // Close movie details when search changes
    fetchMovies()

    // Cleanup function to abort fetch when component unmounts or query changes
    return () => {
      controller.abort()
    }
  }, [query])

  return (
    <>
      {/* Navigation bar with search and results count */}
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      {/* Main content area */}
      <Main>
        {/* Left box: Movie search results */}
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
        {/* Right box: Movie details or watched list */}
        <Box>
          {selectedId ? (
            <MovieDetails
              watched={watched}
              onWatchedMovie={handleWatchedMovie}
              onCloseMovie={handleCloseMovie}
              id={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList watched={watched} onDeleteWatchedMovie={handleDeleteMovie} />
            </>
          )}
        </Box>
      </Main>
    </>
  )
}

export default App