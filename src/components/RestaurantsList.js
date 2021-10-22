import React from 'react'
import RestaurantListItem from './RestaurantListItem'

import './styles/RestaurantList.css'

class RestaurantsList extends React.Component {
  render () {
    if (!this.props.restaurants || this.props.restaurants.length < 1) {
      return (
        <h1>Aucun restaurant n'a été trouvé :'(</h1>
      )
    }
    return (
      <div className='list-container'>
        {this.props.restaurants.map((restaurant) => {
          return (
            <RestaurantListItem key={restaurant._id} restaurant={restaurant} />
          )
        })}
      </div>
    )
  }
}

export default RestaurantsList
