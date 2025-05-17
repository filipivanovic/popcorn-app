import ListBox from '../movies/ListBox'
import WatchedBox from '../watched/WatchedBox'

const Main = ({ watched, movies, average }) => {
  return (
    <main className="main">
      <ListBox movies={movies} />
      <WatchedBox watched={watched} average={average} />
    </main>
  )
}

export default Main