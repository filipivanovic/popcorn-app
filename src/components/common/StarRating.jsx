import { useState } from 'react'

import Star from './Star'

const containerStyle = {
  display: 'flex',
  gap: '16px',
  alignItems: 'center'
}

const starContainerStyle = {
  display: 'flex'
}

const textStyle = {
  lineHeight: '1',
  margin: '0'
}

const StarRating = ({ maxRating = 5 }) => {
  const [rating, setRating] = useState(0)
  const [tempRating, setTempRating] = useState(0)

  const handleRating = rating => {
    setRating(rating)
  }

  return (
    <div style={containerStyle}>
      <div style={starContainerStyle}>
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            full={tempRating ? tempRating >= i + 1 : rating >= i + 1}
            onRate={() => handleRating(i + 1)}
            onHoverIn={() => setTempRating(i + 1)}
            onHoverOut={() => setTempRating(0)}
          />
        ))}
      </div>
      <p style={textStyle}>{tempRating || rating || ''}</p>
    </div>
  )
}

export default StarRating