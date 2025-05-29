import { useEffect, useState } from 'react'

import NavBar from './components/layout/NavBar'
import Main from './components/layout/Main'
import Search from './components/common/Search'
import NumResults from './components/common/NumResults'
import Box from './components/movies/Box'
import MovieList from './components/movies/MovieList'
import WatchedSummary from './components/watched/WatchedSummary'
import WatchedList from './components/watched/WatchedList'
import MovieDetails from './components/movies/MovieDetails'
import Loader from './components/common/Loader'
import ErrorMessage from './components/common/ErrorMessage'

const KEY = 'fdc9b2b2'

const App = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [watched, setWatched] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)

  /*
  useEffect(() => {
    console.log('After initial render')
  }, [])
  useEffect(() => {
    console.log('After every render')
  })

  useEffect(() => {
    console.log('D')
  }, [query])

  console.log('During render - always gets executed')
*/

  const handleSelectMovie = id => {
    setSelectedId(selectedId => (selectedId === id ? null : id))
  }

  const handleCloseMovie = () => {
    setSelectedId(null)
  }

  const handleWatchedMovie = movie => {
    console.log(movie, 'movie')
    setWatched(watched => [...watched, movie])
  }

  const handleDeleteMovie = id => {
    setWatched(watched => watched.filter(movie => movie.imdbID !== id))
  }

  useEffect(() => {
    const controller = new AbortController()

    const fetchMovies = async () => {
      if (query.length < 3) {
        setMovies([])
        setError('')
        return
      }

      try {
        setIsLoading(true)
        setError('')

        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {
          signal: controller.signal
        })

        if (!res.ok) throw new Error('Failed to fetch movies')

        const data = await res.json()

        if (data.Response === 'True') {
          setMovies(data.Search)
          setError('')
        } else {
          throw new Error(data.Error || 'Movie not found')
        }
      } catch (error) {
        if (error.name === 'AbortError') return
        console.error(`Error in fetchMovies method: ${error.message || error}`)
        setError(error.message || error)
      } finally {
        setIsLoading(false)
      }
    }
    handleCloseMovie()
    fetchMovies()

    return () => {
      controller.abort()
    }
  }, [query])

  return (
    <>
      <NavBar>
        <Search query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </NavBar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && (
            <MovieList movies={movies} onSelectedMovie={handleSelectMovie} />
          )}
          {error && <ErrorMessage message={error} />}
        </Box>
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