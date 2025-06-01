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

// Watched movie components
import WatchedSummary from './components/watched/WatchedSummary'
import WatchedList from './components/watched/WatchedList'
import { useMovies } from './hooks/useMovies'
import { useLocalStorageState } from './hooks/useLocalStorageState'

// API key for OMDB API
const KEY = 'fdc9b2b2'

const App = () => {
  // State management for the application
  const [query, setQuery] = useState('') // Search query
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
    // localStorage.setItem('watched', JSON.stringify([...watched, movie]))
  }

  // Removes a movie from the watched list
  const handleDeleteMovie = id => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  const { movies, error, isLoading } = useMovies(query)

  const [watched, setWatched] = useLocalStorageState([], 'watched')

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