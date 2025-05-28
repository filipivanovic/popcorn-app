const ErrorMessage = ({ message }) => {
  return (
    <div className="error">
      <span>Error... ⛔</span> {message}
    </div>
  )
}

export default ErrorMessage