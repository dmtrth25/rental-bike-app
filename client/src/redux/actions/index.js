import {
  DELETE_AVAILABLE_BIKE,
  SET_AVAILABLE_BIKES, SET_RENTED_BIKES,
  MOVE_RENT_BIKE, MOVE_AVAILABLE_BIKE,
  CANCEL_RENT_BIKE
} from "./types"

export const deleteAvailableBike = (bikeId) => {
  return {type: DELETE_AVAILABLE_BIKE, id: bikeId}
}

export const setAvailableBikes = (availableBikes) => {
  return {type: SET_AVAILABLE_BIKES, availableBikes: availableBikes}
}

export const setRentedBikes = (rentedBikes) => {
  return {type: SET_RENTED_BIKES, rentedBikes: rentedBikes}
}

export const moveRentBike = (bike) => {
  return {type: MOVE_RENT_BIKE, bike: bike}
}

export const moveAvailableBike = (bike)=> {
  return {type:MOVE_AVAILABLE_BIKE, bike: bike}
}

export const cancelRentBike = (bikeId)=> {
  return {type:CANCEL_RENT_BIKE, id: bikeId}
}



/*export const rentBike = (bike) => {
  return {type: RENT_BIKE, _id: bike._id, name:bike.name,
    bikeType:bike.type, price: bike.price}
}*/
