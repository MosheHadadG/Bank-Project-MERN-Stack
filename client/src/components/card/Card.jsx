import React from 'react'
import './Card.css'

function Card({srcIcon, title, desc}) {
  return (
    <div className='card-container'>
      <div className="card-icon">
        {srcIcon}
      </div>
      <div className="card-title">
        <h3>{title}</h3>
      </div>
      <div className="card-description">
        {desc}
      </div>
    </div>
  )
}

export default Card