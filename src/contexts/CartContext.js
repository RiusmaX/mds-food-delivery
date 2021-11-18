/**
 * 1) Ecrire le contexte
 * - actionTypes : ADD_ITEM_TO_CART, REMOVE_ITEM_FROM_CART
 * - Etat Initial : cart = array contenant les items
 * 2) Brancher le contexte sur les plats et sur le composant Cart
 */
import React, { useEffect } from 'react'

// Création du contexte
const CartContext = React.createContext()

// Création des actionTypes
const actionTypes = {
  ADD_ITEM_TO_CART: 'ADD_ITEM_TO_CART',
  REMOVE_ITEM_FROM_CART: 'REMOVE_ITEM_FROM_CART'
}

// Etat initial
// On charge l'état sauvegardé dans le localStorage ou on initialise les valeurs
const initialState = JSON.parse(window.localStorage.getItem('CART')) || {
  cart: [],
  total: 0
}

// const cartItem = {
//   dish: plat,
//   quantity: quantité
// }

const CartReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.ADD_ITEM_TO_CART:
      // Si mon élément est déjà présent dans mon panier, j'incrémente la quantité
      if (state.cart.some(item => item.dish._id === action.data._id)) {
        return {
          ...state,
          cart: state.cart.map(item => {
            // Je récupère l'élément à modifier
            if (item.dish._id === action.data._id) {
              // Je met à jour la quantité
              return { ...item, quantity: item.quantity + 1 }
            } else {
              // On retourne les items non concernés par le changement de quantité
              return item
            }
          }),
          // Calcul du total : si le panier contient des items, on les additionne avec la méthode Array.reduce()
          // Sinon, on retourne le prix du produit courrant
          total: state.cart.length > 0
            ? state.cart.reduce((prev, cur) => prev + (cur.dish.price * cur.quantity), action.data.price)
            : action.data.price
        }
      } else {
        // On retourne le nouvel état
        // ...state = on conserve l'état courant
        // On concatène le tableau de l'état courant avec notre item a ajouter
        // https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
        return {
          ...state,
          cart: state.cart.concat([{ dish: action.data, quantity: 1 }]),
          total: state.cart.length > 0
            ? state.cart.reduce((prev, cur) => prev + (cur.dish.price * cur.quantity), action.data.price)
            : action.data.price
        }
      }

    case actionTypes.REMOVE_ITEM_FROM_CART:
      return {
        ...state,
        cart: state.cart.map(item => {
          if (item.dish._id === action.data.dish._id) {
            return {
              ...item, quantity: item.quantity - 1
            }
          } else {
            return item
          }
          // On retire les éléments ayant une quantité < 1 ou on conserve ceux qui ont une quantité > 0
        }).filter(item => item.quantity > 0),
        total: state.cart.length > 0
          ? state.cart.reduce((prev, cur) => prev + (cur.dish.price * cur.quantity), -action.data.dish.price)
          : 0
      }
      // state.cart.filter(item => item.dish._id !== action.data.dish._id)
    default:
      throw new Error(`Unhandled action type : ${action.type}`)
  }
}

// Composant Provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = React.useReducer(CartReducer, initialState)

  // Enregistre automatiquement l'état dans le localStorage à chaque changement
  useEffect(() => {
    window.localStorage.setItem('CART', JSON.stringify(state))
  }, [state])

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>
}

const useCart = () => {
  const context = React.useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider')
  }
  return context
}

export {
  CartProvider,
  useCart,
  actionTypes
}
