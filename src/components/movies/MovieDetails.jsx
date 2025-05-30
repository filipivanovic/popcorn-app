import { useEffect, useState } from 'react'
import StarRating from '../common/StarRating'
import Loader from '../common/Loader'

const KEY = 'fdc9b2b2'

const MovieDetails = ({ id, onCloseMovie, onWatchedMovie, watched }) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState('')

  const isWatched = watched.map(movie => movie.imdbID).includes(id)
  const watchedUserRating = watched.find(movie => movie.imdbID === id)?.userRating

  const handleAddMovie = () => {
    const newWatchedMovie = {
      imdbID: id,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(' ')[0]),
      userRating: Number(userRating)
    }
    onWatchedMovie(newWatchedMovie)
    onCloseMovie()
  }

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

  useEffect(() => {
    if (!movie.Title) return
    document.title = `${movie.Title} | Popcorn App`
    return () => {
      document.title = 'Popcorn App'
    }
  }, [movie])

  return (
    <div className="details">
      {isLoading ? (
        <Loader />
      ) : (
        <>
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