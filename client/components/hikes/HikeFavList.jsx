import React from 'react';
import HikeFav from './HikeFav.jsx';

const HikeFavList = ({ favHikes, getFavHikes, allTags }) => {

  return (
    <div className="fav-hike-list">
      {
        favHikes.map((favHike, i) => {
          return (
            <HikeFav
              favHike={ favHike }
              key={`${favHike}-${i}`}
              getFavHikes={ getFavHikes }
              allTags={allTags}
            />
          )
        })
      }
    </div>
  )
}

export default HikeFavList;