import { useEffect, useRef, useState } from 'react'
import StarRating from '../common/StarRating'
import Loader from '../common/Loader'

// API key for OMDB (Open Movie Database)
const KEY = 'fdc9b2b2'

/**
 * MovieDetails component displays detailed information about a selected movie
 * @param {string} id - IMDB ID of the movie
 * @param {function} onCloseMovie - Handler to close the movie details
 * @param {function} onWatchedMovie - Handler to add movie to watched list
 * @param {Array} watched - List of movies already watched
 */
const MovieDetails = ({ id, onCloseMovie, onWatchedMovie, watched }) => {
  // State management for movie details, loading state, and user rating
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  // Check if the movie is already in watched list
  const isWatched = watched.map(movie => movie.imdbID).includes(id)
  const watchedUserRating = watched.find(movie => movie.imdbID === id)?.userRating

  const countRef = useRef(0)

  useEffect(() => {
    if (userRating) countRef.current += 1
  }, [userRating])

  /**
   * Handles adding a movie to the watched list with user rating
   * Creates a new movie object with selected properties and converts numeric values
   */
  const handleAddMovie = () => {
    const newWatchedMovie = {
      imdbID: id,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(' ')[0]), // Extract numeric value from "123 min"
      userRating: Number(userRating),
      countRatingDecisions: countRef.current
    }
    onWatchedMovie(newWatchedMovie)
    onCloseMovie()
  }

  // Effect hook to handle ESC key press for closing movie details
  useEffect(() => {
    const callback = e => {
      if (e.key === 'Escape') {
        onCloseMovie()
      }
    }
    document.addEventListener('keydown', callback)
    return () => {
      document.removeEventListener('keydown', callback)
    }
  }, [onCloseMovie])

  // Effect hook to fetch movie details from OMDB API
  useEffect(() => {
    const getMovieDetails = async () => {
      setIsLoading(true)
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`)
      const data = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  }, [id])

  // Effect hook to update document title when movie details are loaded
  useEffect(() => {
    if (!movie.Title) return
    document.title = `${movie.Title} | Popcorn App`
    return () => {
      document.title = 'Popcorn App' // Reset title when component unmounts
    }
  }, [movie])

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {/* Movie header with poster and basic info */}
          <header>
            <button className={`btn-back`} onClick={onCloseMovie}>
              &larr;
            </button>
            <img src={movie.Poster} alt={movie.Title} />
            <div className="details-overview">
              <h2>{movie.Title}</h2>
              <p>
                {movie.Released} &bull; {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>
                <span>⭐</span>
                {movie.imdbRating} IMDB Rating
              </p>
            </div>
          </header>
          {/* Movie details section with rating and additional info */}
          <section>
            <div className="rating">
              {!isWatched ? (
                <>
                  <StarRating size={24} onSetRating={setUserRating} maxRating={10} />
                  {userRating > 0 && (
                    <button className="btn-add" onClick={handleAddMovie}>
                      + Add to list
                    </button>
                  )}
                </>
              ) : (
                <p>
                  You have already watched this movie:{' '}
                  <em>
                    {watchedUserRating} <span>⭐</span>
                  </em>
                </p>
              )}
            </div>
            <p>
              <em>{movie.Plot}</em>
            </p>
            <p>Starring: {movie.Actors}</p>
            <p>Directed by {movie.Director}</p>
          </section>
        </>
      )}
    </div>
  )
}

export default MovieDetails