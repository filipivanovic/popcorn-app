import WatchedMovie from './WatchedMovie'

/**
 * Component that renders a list of watched movies
 * @param {Object[]} watched - Array of watched movie objects
 * @param {Function} onDeleteWatchedMovie - Callback function to handle movie deletion
 * @returns {JSX.Element} Unordered list containing WatchedMovie components
 */
const WatchedList = ({ watched, onDeleteWatchedMovie }) => {
  return (
    <ul className="list">
      {/* Map through watched movies array and render individual WatchedMovie components */}
      {watched.map(movie => (
        <WatchedMovie
          onDeleteWatchedMovie={onDeleteWatchedMovie}
          movie={movie}
          key={movie.imdbID} // Using imdbID as unique key for optimal rendering
        />
      ))}
    </ul>
  )
}

export default WatchedList