import Movie from './Movie'

const MovieList = ({ movies, onSelectedMovie }) => {
  return (
    <ul className="list list-movies">
      {movies?.map(movie => (
        <Movie onSelectedMovie={onSelectedMovie} movie={movie} key={movie.imdbID} />
      ))}
    </ul>
  )
}

export default MovieList