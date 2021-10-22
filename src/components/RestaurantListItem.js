import React from 'react'
import { Link } from 'react-router-dom'

import './styles/Restaurant.css'

class RestaurantListItem extends React.Component {
  render () {
    const { restaurant } = this.props
    if (!restaurant) {
      return <h1>Pas de donnée</h1>
    }
    return (
      <Link to={`/restaurant/${restaurant._id}`}>
        <div className='card'>
          {restaurant.Photos &&
            <img src={`https://strapi.myidea.fr${restaurant.Photos[0].url}`} className='main-img' />}
          <h2>{restaurant.name}</h2>
          <p>{restaurant.description}</p>
        </div>
      </Link>
    )
  }
}

export default RestaurantListItem
