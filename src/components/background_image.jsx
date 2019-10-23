import React from 'react'

import '../css/components/button.css'

const BackgroundImage = props => {
  const { url, classList = 'image-centered', minHeight = '200px' } = props
  return (
    <div
      className={`image-centered ${classList}`}
      style={{ backgroundImage: `url(${url})`, minHeight }}
      data-animation="fade-in"
    />
  )
}

export default BackgroundImage
