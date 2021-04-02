import React, {useState} from "react"
import './bicycle-form.css'
import * as axios from "axios"
import {setAvailableBikes} from "../../redux/actions"

function BicycleForm(props) {
  const types = ['Custom', 'Sport', 'Casual', 'BMX']
  const [state, setState] = useState({
    name: '',
    type: types[0],
    price: 10
  })

  function addAvailableBile(e) {
    e.preventDefault();
    const bike = {name: state.name, type: state.type, price: state.price}

    Promise.all([
      axios.get('http://127.0.0.1:8000/bikes/available'),
      axios({
        method: 'POST',
        url: 'http://127.0.0.1:8000/bikes/available/create',
        data: bike
      })
    ])

    axios.get(`http://127.0.0.1:8000/bikes/available`)
      .then(res => {
        const bikes = res.data.bikes
        props.dispatch(setAvailableBikes(bikes))
      })


  }

  function handleChange(e) {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value
    });
  }

  return (
    <div>
      <div className="header-text">
        <h1>Awesome Bike Rental</h1>
        <h4>😃 Create new rent</h4>
      </div>
      <div className="form-container">
        <div>
          <form className="form-inline" action="">
            <div className="bike-name">
              <label htmlFor="name">Bike name</label><br/>
              <input value={state.name} onChange={handleChange} type="text" id="bike-name"
                     placeholder="Enter bike name" name="name" maxLength="56"/>
            </div>
            <div className="bike-type">
              <label htmlFor="bike-type">Bike type</label> <br/>

              <select value={state.type} name='type' onChange={handleChange}>
                {types.map((t) => <option value={t}>{t}</option>)}
              </select>
            </div>
            <div className="price">
              <label htmlFor="price">Rent Price($)</label> <br/>
              <input value={state.price} onChange={handleChange} type="number" step="any" id="price"
                     placeholder="Enter price" name="price"/>
            </div>
            <div>
              <br/>
              <button type="submit" onClick={addAvailableBile}>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export {
  BicycleForm
}