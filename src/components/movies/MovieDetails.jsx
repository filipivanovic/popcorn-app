import { useEffect } from 'react'

const KEY = 'fdc9b2b2'

const MovieDetails = ({ id, onCloseMovie }) => {
  useEffect(() => {
    const getMovieDetails = async () => {
      const res = await fetch(`https://www.omdbapi.com/?apikey=${KEY}&i=${id}`)
      const data = await res.json()
      console.log(data)
    }
    getMovieDetails()
  }, [])

  return (
    <div className="details">
      <button className={`btn-back`} onClick={onCloseMovie}>
        &larr;
      </button>
      <p>{id}</p>
    </div>
  )
}

export default MovieDetails