import { useCart, actions } from '../contexts/CartContext'

function DishesListItem ({ dish }) {
  const { dispatch } = useCart()

  const addToCart = () => {
    dispatch({
      type: actions.ADD_ITEM_TO_CART,
      data: dish
    })
  }

  return (
    <div className='card'>
      <h2>{dish.name}</h2>
      <p>{dish.description}</p>
      <button onClick={addToCart}>Ajouter au panier</button>
    </div>
  )
}

export default DishesListItem
