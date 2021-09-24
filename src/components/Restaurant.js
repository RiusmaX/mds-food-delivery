import React from 'react';

import './styles/Restaurant.css'

class Restaurant extends React.Component {
  render() {
    const { restaurant } = this.props
    if (!restaurant) {
      return <h1>Pas de donnée</h1>
    }
    return (
      <div className='card'>
        <img src={`https://strapi.myidea.fr${restaurant.Photos[0].url}`} className='main-img' />
        <h2>{restaurant.title}</h2>
        <p>{restaurant.description}</p>
      </div>
    )
  }
}

export default Restaurant;
