import React from "react"
import './styles.css'

function Bicycle({id, name, type, price, available, rented, bike, onDeleteBicycle,discountedPriceOnce, swapRentedAvailable}) {
  return (
    <li>
      <div className="bicycle">
        {available &&
        <div className="bicycle__available-data">
          {name} / {type} / ${Math.trunc((price) * 100) / 100}
          <button className="bicycle__btn-delete" onClick={() => onDeleteBicycle(id)}>Delete</button>
          <button className="bicycle__btn-rent" onClick={() => swapRentedAvailable(bike, true, id)}>Rent</button>
        </div>
        }

        {rented &&
        <div className="bicycle__rented-data">
          {name} / {type} / ${Math.trunc((price) * 100) / 100} {discountedPriceOnce && <>(Reduced to half)</>}
          <button className="bicycle__btn-cancel" onClick={() => swapRentedAvailable(bike, false, id)}>Cancel</button>
        </div>
        }
      </div>
    </li>
  )
}

export {
  Bicycle
}