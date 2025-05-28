import { useEffect, useState } from 'react'

const KEY = 'fdc9b2b2'

const MovieDetails = ({ id, onCloseMovie }) => {
  const [movie, setMovie] = useState({})

  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`)
      const data = await res.json()
      setMovie(data)
    }
    getMovieDetails()
  }, [id])

  return (
    <div className="details">
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
          <p>Starring: {movie.Actors}</p>
          <p>Directed by {movie.Director}</p>
        </div>
      </header>
    </div>
  )
}

export default MovieDetails