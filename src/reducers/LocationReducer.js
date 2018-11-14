import Immutable from 'immutable'
import { createReducer } from '../utils/Reducers'
import {
} from '../utils/Constants'

export const stateKey = 'location'

let initialState = Immutable.Map({
  isFetching: false,
  isStale: false,
  currentCoordinates: {
    lat: 40.7648,
    long: -73.9808
  },
  currentCity: "New York, NY",
  searchedCities: { //Cache previously searched cities
    "New York, NY": {lat: 40.7648, long: -73.9808},
  }
})

const LocationReducer = (state = initialState, action) => {
  return createReducer(state, action, {
  });
}

export const getCurrentCity = (globalState) => getLocationState(globalState).get('currentCity')
export const getCurrentCoordinates = (globalState) => getLocationState(globalState).get('currentCoordinates')

export const getLocationState = (globalState) => globalState[stateKey];
export default LocationReducer
