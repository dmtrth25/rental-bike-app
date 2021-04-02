import React, {useEffect} from "react"
import {RentedBicycles} from "./RentedBicycles"
import axios from "axios"
import {setRentedBikes} from "../../../redux/actions"

function RentedBicyclesContainer(props) {
  //const [rentedBikes, setRentedBikes] = useState([{}])
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/bikes/rented`)
      .then(res => {
        const bikes = res.data.bikes
        props.dispatch(setRentedBikes(bikes))
      })
  }, []);

  function countTotalPrice() {
    return Math.trunc((props.rentedBikes.reduce((acc, b) => acc + b.price, 0)) * 100) / 100
  }

  return (
    <div>
      <RentedBicycles bikes={props.rentedBikes} overallPrice={countTotalPrice()} swapRentedAvailable={props.swapRentedAvailable}/>
    </div>
  )
}

export {
  RentedBicyclesContainer
}