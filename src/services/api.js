import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json'
  },
  timeout: 10000
})

// const old_getRestaurants = async () => {
//   try {
//     const response = await window.fetch('https://strapi.myidea.fr/restaurants')
//     const result = await response.json()
//     return result
//   } catch (e) {
//     console.error(e)
//   }
// }

const login = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials)
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
}

const register = async (registerInfos) => {
  try {
    const response = await api.post('/auth/register', registerInfos)
    if (response.data && response.data.token) {
      window.localStorage.setItem('token', response.data.token)
    }
    return {
      error: null,
      data: response.data
    }
  } catch (error) {
    return {
      error: error,
      data: null
    }
  }
}

const getRestaurants = async () => {
  try {
    const response = await api.get('/restaurants')
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getDishesByRestaurantId = async (restaurantId) => {
  try {
    const response = await api.get(`/dishes?id=${restaurantId}`)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

const getProfile = async () => {
  try {
    const token = window.localStorage.getItem('token')
    if (token) {
      const response = await api.get('/me', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      return response.data
    }
  } catch (error) {
    console.error(error)
  }
}

const createPaymentSession = async (cart, formData) => {
  try {
    const response = await api.post('/payment/create-session', { order: { cart, formData } })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

const createOrder = async (user, cart) => {
  try {
    // On recompose un tableau contenant les ID des plats du panier pour respecter le format de l'api
    const _cart = cart.map(item => item.dish._id)
    console.log(_cart)
    const response = await api.post('/order', { user, cart: _cart })
    return response.data
  } catch (error) {
    console.error(error)
  }
}

export {
  login,
  register,
  getProfile,
  getRestaurants,
  getDishesByRestaurantId,
  createPaymentSession,
  createOrder
}
