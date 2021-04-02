import { createStore } from 'redux';
import {bikeReducer} from "../bike-reducer"

export default createStore(
  bikeReducer,
  undefined,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);