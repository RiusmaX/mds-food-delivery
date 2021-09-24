import React from 'react';
import RestaurantsList from '../components/RestaurantsList';
import { getRestaurants } from '../services/api';

class Restaurants extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      restaurants: []
    }
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    const restaurants = await getRestaurants()
    this.setState({ restaurants })
  }

  render() {
    return (
      <RestaurantsList restaurants={this.state.restaurants} />
    )
  }
}

export default Restaurants;
