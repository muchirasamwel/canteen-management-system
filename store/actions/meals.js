export const TOGGLE_FAV = 'TOGGLE_FAVOURITE'
export const ADD_CART = 'ADD CART'

export const toggleFav = id => {
  return { type: TOGGLE_FAV, mealId: id }
}

export const addToCart = id => {
  return { type: ADD_CART, id }
}
