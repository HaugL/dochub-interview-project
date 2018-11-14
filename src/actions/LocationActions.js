import { getState } from "../utils/store"
import { fetchAction } from '../utils/Actions'
import {
  shouldFetchCurrentCoordinates,
  shouldResolveCurrentCity
} from '../reducers/LocationReducer'
import {
  BROWSER_LOCATION_RECIEVED,
  BROWSER_LOCATION_FAILED,
  BROWSER_CITY_REQUESTED,
  BROWSER_CITY_RECIEVED,
} from '../utils/Constants'
