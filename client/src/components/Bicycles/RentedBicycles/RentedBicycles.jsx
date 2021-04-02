import React from "react"
import {Bicycle} from "../Bicycle"
import '../styles.css'

function RentedBicycles({bikes, overallPrice, swapRentedAvailable}) {
  return (
    <div>
      <h4 className="text">♿ You have {bikes.length} rented {bikes.length === 1 ? 'bike' : 'bikes'} . Your rent(Total:
        ${overallPrice})</h4>
      {!bikes.length && <p className="text">You have no rented bicycles</p>}
      <ul>
        {bikes.map((bike) => <Bicycle id={bike._id}
                                      name={bike.name}
                                      type={bike.type}
                                      price={bike.price}
                                      bike={bike}
                                      rented={true}
                                      discountedPriceOnce={bike.discountedPriceOnce}
                                      swapRentedAvailable={swapRentedAvailable}/>)}
      </ul>
    </div>
  )
}

export {
  RentedBicycles
}