import Immutable from 'immutable'
import { createReducer } from '../utils/Reducers'
import {
  FORECAST_REQUESTED,
  FORECAST_RECIEVED,
  FORECAST_FAILED
} from '../utils/Constants'
import moment from 'moment'

export const stateKey = 'forecast'

let initialState = Immutable.fromJS({
  isFetching: false,
  isStale: false,
  values: {}
})

const ForecastReducer = (state = initialState, action) => {
  return createReducer(state, action, {
    [FORECAST_REQUESTED]: (state) => {
      return state.set('isFetching', true)
    },
    [FORECAST_RECIEVED]: (state, { payload }) => {
      state = state.merge({ isFetching: false, isStale: false })
      const formattedData = {}
      payload.results.list.forEach((data) => {
        const key = moment(data.dt_txt).format("YYYY-MM-DD")
        const existingData = formattedData[key]
        const icon = data.weather[0].icon.slice(0,2)
        if(existingData){
          // Find lowest temp
          if(data.main.temp_min < existingData.minTemp){
            existingData.minTemp = data.main.temp_min
          }
          // Find highest temp
          if(data.main.temp_max > existingData.maxTemp){
            existingData.maxTemp = data.main.temp_max
          }
          // Find most severe weather for description
          if(icon > existingData.icon){
            existingData.icon = icon
            existingData.description = data.weather[0].description
          }
        } else {
          formattedData[key] = {
            date: key,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            description: data.weather[0].description,
            icon // See link for docs: https://openweathermap.org/weather-conditions
          }
        }
      })
      return state.setIn(['values', payload.city], Immutable.fromJS(formattedData))
    },
    [FORECAST_FAILED]: (state) => {
      return state.set('isFetching', false)
    },
  });
}



export const shouldFetchForecast = (globalState, city) => {
  const state = getForecastState(globalState)
  if(state.get('isFetching')){
    return false
  } else {
    return state.get('isStale') || !getCityForecast(globalState, city)
  }
}

export const getCityForecast = (globalState, city) => getForecastState(globalState).getIn(['values', city])

export const getForecastState = (globalState) => globalState[stateKey];
export default ForecastReducer
