import { useEffect, useState } from 'react'
import StarRating from '../common/StarRating'
import Loader from '../common/Loader'

const KEY = 'fdc9b2b2'

const MovieDetails = ({ id, onCloseMovie, onWatchedMovie }) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const handleAddMovie = () => {
    console.log('test')
    const newWatchedMovie = {
      imdbID: id,
      Title: movie.Title,
      Year: movie.Year,
      Poster: movie.Poster,
      imdbRating: Number(movie.imdbRating),
      runtime: Number(movie.Runtime.split(' ')[0])
    }
    console.log(newWatchedMovie)
    onWatchedMovie(newWatchedMovie)
    onCloseMovie()
  }

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
              <StarRating maxRating={10} size={24} />
              <button className={`btn-add`} onClick={handleAddMovie}>
                + Add to list
              </button>
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