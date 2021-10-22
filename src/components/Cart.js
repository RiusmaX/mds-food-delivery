import Draggable from 'react-draggable'
import { actions, useCart } from '../contexts/CartContext'

import './styles/Cart.css'

function Cart () {
  const { state: { cart }, dispatch } = useCart()

  const removeItem = (item) => {
    dispatch({
      type: actions.REMOVE_ITEM_FROM_CART,
      data: item
    })
  }
  return (
    <Draggable>
      <div className='cart-container'>
        <h2>Votre commande</h2>
        {
          cart.map(item => {
            return (
              <div key={item.dish._id}>
                <h4>{item.dish.name}</h4>
                <p>{item.dish.price}</p>
                <p>{item.quantity}</p>
                <button onClick={() => removeItem(item)}>X</button>
              </div>
            )
          })
        }
      </div>
    </Draggable>
  )
}

export default Cart
