import React from 'react';
import './App.css';
import BikeApp from "./components/BikeApp"
import {connect} from "react-redux"

function App(props) {
  return (
    <div className="App">
      <BikeApp {...props}/>
    </div>
  );
}

const mapStateToProps = state => {
  return {
    availableBikes: state.availableBikes,
    rentedBikes: state.rentedBikes
  }
}

export default connect(mapStateToProps)(App);
