import Immutable from 'immutable'
import { createReducer } from '../utils/Reducers'
import {
  CITY_STRING_CHANGED,
  COORDINATES_REQUESTED,
  COORDINATES_RECIEVED,
  COORDINATES_FAILED
} from '../utils/Constants'

export const stateKey = 'location'

let initialState = Immutable.Map({
  isFetching: false,
  isStale: false,
  currentCity: "New York, NY",
  values: Immutable.Map({ //Cache previously searched cities
    "New York, NY": {lat: 40.7648, long: -73.9808},
  })
})

const LocationReducer = (state = initialState, action) => {
  return createReducer(state, action, {
    [CITY_STRING_CHANGED]: (state, { payload }) => {
      return state.set('currentCity', payload)
    },
    [COORDINATES_REQUESTED]: (state) => {
      return state.set('isFetching', true)
    },
    [COORDINATES_RECIEVED]: (state, { payload }) => {
      return state.set('isFetching', false)
        .setIn(['values', payload.city], {lat: payload.lat, long: payload.long})
    },
    [COORDINATES_FAILED]: (state) => {
      return state.set('isFetching', false)
    }
  });
}

export const getCurrentCity = (globalState) => getLocationState(globalState).get('currentCity')
export const getCurrentCoordinates = (globalState) => {
  const state = getLocationState(globalState)
  return state.getIn(['values', state.get('currentCity')])
}

export const getLocationState = (globalState) => globalState[stateKey];
export default LocationReducer
