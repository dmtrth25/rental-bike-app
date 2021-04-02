import React, {useEffect, useState} from "react"
import {AvailableBicycles} from "./AvailableBicycles"
import axios from 'axios';
import {deleteAvailableBike, setAvailableBikes} from "../../../redux/actions"

function AvailableBicyclesContainer(props) {
  //const [availableBikes, setAvailableBikes] = useState([{}])
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/bikes/available`)
      .then(res => {
        const bikes = res.data.bikes
        props.dispatch(setAvailableBikes(bikes))
      })
  }, []);

  function onDeleteBicycle(bikeId) {
    axios({
      method: 'DELETE',
      url: `http://127.0.0.1:8000/bikes/available/${bikeId}`
    });
    props.dispatch(deleteAvailableBike(bikeId))
  }

  return (
    <div>
      <AvailableBicycles bikes={props.availableBikes} onDeleteBicycle={onDeleteBicycle}
                         swapRentedAvailable={props.swapRentedAvailable}/>
    </div>
  )
}

export {
  AvailableBicyclesContainer
}