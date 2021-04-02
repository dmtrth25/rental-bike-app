import React, {useEffect} from 'react';
import axios from "axios"
import {BicycleForm} from "./Forms/BicycleForm"
import {RentedBicyclesContainer} from "./Bicycles/RentedBicycles/RentedBicyclesContainer"
import {AvailableBicyclesContainer} from "./Bicycles/AvailableBicycles/AvailableBicyclesContainer"
import {cancelRentBike, deleteAvailableBike, moveAvailableBike, moveRentBike} from "../redux/actions"

function BikeApp(props) {
  useEffect(()=>{
    console.log(props)
  })

  function swapRentedAvailable(bike, flag, id) {
    let sendData = flag
      ? {rented:true, available:false}
      : {rented:false, available:true}
    axios({
      method: 'PATCH',
      url: `http://127.0.0.1:8000/bikes/move-available-rented/${id}`,
      data: sendData
    });

    if(flag) {
      props.dispatch(deleteAvailableBike(id))
      props.dispatch(moveRentBike(bike))
    } else {
      props.dispatch(moveAvailableBike(bike))
      props.dispatch(cancelRentBike(id))
    }
  }

  return (
    <div className="App">
      <BicycleForm {...props}/>
      <RentedBicyclesContainer swapRentedAvailable={swapRentedAvailable} {...props}/>
      <AvailableBicyclesContainer swapRentedAvailable={swapRentedAvailable} {...props}/>
    </div>
  );
}

export default BikeApp;
