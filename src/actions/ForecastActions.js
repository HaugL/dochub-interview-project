import { fetchAction } from '../utils/Actions'
import { shouldFetchForecast } from '../reducers/ForecastReducer'
import {
  FORECAST_REQUESTED,
  FORECAST_RECIEVED,
  FORECAST_FAILED
} from '../utils/Constants'

export function fetchCityForecast(coordinates) {
  return fetchAction({
    shouldCallAPI: (state) => coordinates && shouldFetchForecast(state, coordinates),
    requestParams: {
      method: 'GET',
      url: 'https://api.openweathermap.org/data/2.5/forecast',
      qs: {
        lat: coordinates.lat,
        lon: coordinates.long,
        APPID: '2c94176579c2f5614423c777df774c43',
        units: 'imperial'
      }
    },
    requestAction: () => { return { type: FORECAST_REQUESTED } },
    receivedAction: (results) => { return { type: FORECAST_RECIEVED, payload: { results, coordinates} }},
    failureAction: (error) => { return { type: FORECAST_FAILED, payload: { error } } }
  });
}
