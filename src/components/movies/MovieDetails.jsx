const MovieDetails = ({ id, onCloseMovie }) => {
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