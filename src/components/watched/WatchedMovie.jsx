// Component that displays a single watched movie with its details and delete button
const WatchedMovie = ({ movie, onDeleteWatchedMovie }) => {
  return (
    // Each movie item in the list with poster, title, ratings, and runtime
    <li key={movie.imdbID}>
      {/* Movie poster */}
      <img src={movie.Poster} alt={`${movie.Title} poster`} />

      {/* Movie title */}
      <h3>{movie.Title}</h3>

      <div>
        {/* IMDb rating */}
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>

        {/* User's personal rating */}
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>

        {/* Movie runtime in minutes */}
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>

        {/* Delete button to remove movie from watched list */}
        <button className="btn-delete" onClick={() => onDeleteWatchedMovie(movie.imdbID)}>
          X
        </button>
      </div>
    </li>
  )
}

export default WatchedMovie