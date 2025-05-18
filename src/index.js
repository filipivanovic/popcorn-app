import React from 'react'
import ReactDOM from 'react-dom/client'
import StarRating from './components/common/StarRating'
// import './index.css'
// import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    {/*<App />*/}
    <StarRating
      maxRating={5}
      color="red"
      size={24}
      messages={['Terrible', 'Bad', 'Average', 'Good', 'Great']}
    />
    <StarRating maxRating={10} defaultRating={3} />
  </React.StrictMode>
)