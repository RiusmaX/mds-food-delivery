import { useCart, actionTypes } from '../contexts/CartContext'

function DishesListItem ({ dish }) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: actionTypes.ADD_ITEM_TO_CART,
      data: dish
    })
  }

  return (
    <div className='card'>
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <p>{dish.price.toFixed(2)}€</p>
      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
  )
}

export default DishesListItem
