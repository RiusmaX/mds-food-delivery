const getRestaurants = async () => {
  try {
    const response = await window.fetch('https://strapi.myidea.fr/restaurants')
    const result = await response.json()
    return result
  } catch (e) {
    console.error(e)
  }
} 

module.exports = {
  getRestaurants
}