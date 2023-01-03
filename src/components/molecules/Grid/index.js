import React from 'react'
import './grid.css'
import listImages from '../../../dummy/imageList'

function Grid() {
  return (
    <div className='container-grid'>
        <div className="card-list">
        {listImages.data.map((pic) => (
          <div className="card" key={pic.id}>
            <img
              className="card--image"
              alt={pic.alt_description}
              src={pic.imageUrl}
              width="50%"
              height="50%"
            ></img>
          </div>
        ))}{" "}
      </div>
    </div>
  )
}

export default Grid