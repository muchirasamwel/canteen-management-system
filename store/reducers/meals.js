import { MEALS } from '../../data/dummy-data'
import { ADD_CART, TOGGLE_FAV } from '../actions/meals'
const initialState = {
  meals: MEALS,
  filteredMeals: MEALS,
  cart: []
}

const mealReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_FAV:
      let meals = state.meals.map(meal => {
        if (meal.id == action.mealId) {
          const fav = meal.hasOwnProperty('fav') ? !meal.fav : true
          meal = { ...meal, fav: fav }
        }
        return meal
      })
      return { ...state, meals: meals }
    case ADD_CART:
      let cartMeal = state.meals.find(meal => meal.id == action.id)
      return { ...state, meals: [...state.meals, cartMeal] }
    default:
      return state
  }
}

export default mealReducer
