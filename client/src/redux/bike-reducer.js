import {
  CANCEL_RENT_BIKE,
  DELETE_AVAILABLE_BIKE, MOVE_AVAILABLE_BIKE, MOVE_RENT_BIKE, REVOME_AVAILABLE_BIKE,
  SET_AVAILABLE_BIKES, SET_RENTED_BIKES
} from "./actions/types"

const initialState = {
  availableBikes: [],
  rentedBikes: []
}

const bikeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AVAILABLE_BIKES:
      console.log('in set avail bikes !')
      return {...state, availableBikes: action.availableBikes}
    case SET_RENTED_BIKES:
      return {...state, rentedBikes: action.rentedBikes}
    case MOVE_RENT_BIKE :
      return {
        ...state,
        rentedBikes: [
          ...state.rentedBikes,
          {
            _id: action.bike._id,
            name: action.bike.name,
            type: action.bike.type,
            price: action.bike.price,
            available: !action.bike.available,
            rented: !action.bike.rented,
            discountedOnce: false
          }
        ]
      }
    case MOVE_AVAILABLE_BIKE :
      return {
        ...state,
        availableBikes: [
          ...state.availableBikes,
          {
            _id: action.bike._id,
            name: action.bike.name,
            type: action.bike.type,
            price: action.discountedOnce ? action.bike.price*2 : action.bike.price,
            available: !action.bike.available,
            rented: !action.bike.rented,
            discountedOnce: false
          }
        ]
      }
    case CANCEL_RENT_BIKE:
      return {
        ...state,
        rentedBikes: state.rentedBikes.filter(b => b._id !== action.id)
      }
    case DELETE_AVAILABLE_BIKE:
      return {
        ...state,
        availableBikes: state.availableBikes.filter(b => b._id !== action.id)
      }
    default:
      return state
  }
}

export {
  bikeReducer
}