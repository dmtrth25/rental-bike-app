import React from "react"
import {Bicycle} from "../Bicycle"
import '../styles.css'

function AvailableBicycles({bikes, onDeleteBicycle, swapRentedAvailable}) {
  return (
    <div>
      <h4 className="text">🚲 Available bicycles ({bikes.length})</h4>
      {!bikes.length && <p className="text">There are no available bicycles</p>}
      <ul>
        {bikes.map((bike) => <Bicycle id={bike._id}
                                      name={bike.name}
                                      type={bike.type}
                                      price={bike.price}
                                      available={true}
                                      bike={bike}
                                      onDeleteBicycle={onDeleteBicycle}
                                      swapRentedAvailable={swapRentedAvailable}/>
        )}
      </ul>
    </div>
  )
}

export {
  AvailableBicycles
}