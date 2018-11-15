import { simpleDispatchAction } from "../utils/Actions"
import {
  CITY_STRING_CHANGED,
  COORDINATES_REQUESTED,
  COORDINATES_RECIEVED,
  COORDINATES_FAILED
} from '../utils/Constants'
import {
  geocodeByAddress,
} from 'react-places-autocomplete';

export function updateCityString(newCity) {
  return simpleDispatchAction({
    action: () => { return { type: CITY_STRING_CHANGED, payload: newCity } },
  })
}

export function fetchCoordinates(newCity){
  return function (dispatch) {
    dispatch({ type: COORDINATES_REQUESTED })
    geocodeByAddress(newCity)
    .then(results => {
      const lat = results[0].geometry.location.lat()
      const long = results[0].geometry.location.lng()
      if(lat && long){
        dispatch({ type: COORDINATES_RECIEVED, payload: { lat, long, city: newCity } })
      } else {
        dispatch({ type: COORDINATES_FAILED })
      }
    }).catch(error => {
      dispatch({ type: COORDINATES_FAILED })
    })
  }
}
