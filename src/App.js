import { useEffect, useState } from 'react'

import NavBar from './components/layout/NavBar'
import Main from './components/layout/Main'
import Search from './components/common/Search'
import NumResults from './components/common/NumResults'
import Box from './components/movies/Box'
import MovieList from './components/movies/MovieList'
import WatchedSummary from './components/watched/WatchedSummary'
import WatchedList from './components/watched/WatchedList'

// const tempMovieData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg'
//   },
//   {
//     imdbID: 'tt0133093',
//     Title: 'The Matrix',
//     Year: '1999',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg'
//   },
//   {
//     imdbID: 'tt6751668',
//     Title: 'Parasite',
//     Year: '2019',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg'
//   }
// ]
//
// const tempWatchedData = [
//   {
//     imdbID: 'tt1375666',
//     Title: 'Inception',
//     Year: '2010',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg',
//     runtime: 148,
//     imdbRating: 8.8,
//     userRating: 10
//   },
//   {
//     imdbID: 'tt0088763',
//     Title: 'Back to the Future',
//     Year: '1985',
//     Poster:
//       'https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg',
//     runtime: 116,
//     imdbRating: 8.5,
//     userRating: 9
//   }
// ]

// fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=interstellar`)
//   .then((res) => res.json())
//   .then((data) => setMovies(data.Search))

const KEY = 'fdc9b2b2'

const App = () => {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([])
  const [watched, setWatched] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const tempQuery = 'interstellar'
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

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setIsLoading(true)
        setError('')
        const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&s=${query}`)

        if (!res.ok) throw new Error('Failed to fetch movies')

        const data = await res.json()

        if (data.Response === 'True') {
          setMovies(data.Search)
        } else {
          throw new Error(data.Error) || 'Movie not found'
        }
      } catch (error) {
        console.error(`Error in fetchMovies method: ${error.message || error}`)
        setError(error.message || error)
      } finally {
        setIsLoading(false)
      }

      if (query.length < 3 ) {
        setMovies([])
        setError('')
        return
      }

    }
    fetchMovies()
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
          {!isLoading && !error && <MovieList movies={movies} />}
          {error && <ErrorMessage message={error} />}
        </Box>
        <Box>
          <WatchedSummary watched={watched} />
          <WatchedList watched={watched} />
        </Box>
      </Main>
    </>
  )
}

const Loader = () => {
  return (
    <div className="loader">
      <span>Loading...</span>
    </div>
  )
}

const ErrorMessage = ({message}) => {
  return (
    <div className="error">
      <span>Error... ⛔</span> {message}
    </div>
  )
}

export default App