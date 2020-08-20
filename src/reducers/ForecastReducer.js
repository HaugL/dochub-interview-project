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
  values: {
    daily: {}
  }
})

const ForecastReducer = (state = initialState, action) => {
  return createReducer(state, action, {
    [FORECAST_REQUESTED]: (state) => {
      return state.set('isFetching', true)
    },
    [FORECAST_RECIEVED]: (state, { payload }) => {
      state = state.merge({ isFetching: false, isStale: false })
      const formattedWeekData = {}
      const formattedDailyData = {}
      payload.results.list.forEach((data) => {
        const key = moment(data.dt_txt).format("YYYY-MM-DD")
        const existingData = formattedWeekData[key]
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
          formattedWeekData[key] = {
            title: moment(key).format('dddd'),
            key,
            maxTemp: data.main.temp_max,
            minTemp: data.main.temp_min,
            description: data.weather[0].description,
            icon // See link for docs: https://openweathermap.org/weather-conditions
          }

        }

        const timeKey = moment(data.dt_txt).format("h a")
        formattedDailyData[key] = formattedDailyData[key] || []
        formattedDailyData[key].push({
          title: timeKey,
          key: data.dt_txt,
          maxTemp: data.main.temp_max,
          minTemp: data.main.temp_min,
          description: data.weather[0].description,
          icon // See link for docs: https://openweathermap.org/weather-conditions
        })
      })
      return state.setIn(['values', getValueKeyFromCoordinates(payload.coordinates)],
        Immutable.fromJS({
          weekly: formattedWeekData,
          daily: formattedDailyData
        })
      )
    },
    [FORECAST_FAILED]: (state) => {
      return state.set('isFetching', false)
    },
  });
}

const getValueKeyFromCoordinates = (coordinates = {}) => {
  return `${coordinates.lat},${coordinates.long}`
}



export const shouldFetchForecast = (globalState, city) => {
  const state = getForecastState(globalState)
  if(state.get('isFetching')){
    return false
  } else {
    return state.get('isStale') || !getWeeklyCityForecast(globalState, city)
  }
}

export const getWeeklyCityForecast = (globalState, coordinates) => getForecastState(globalState).getIn(['values', getValueKeyFromCoordinates(coordinates), 'weekly'])
export const getDailyCityForecast = (globalState, coordinates, date) => getForecastState(globalState).getIn(['values', getValueKeyFromCoordinates(coordinates), 'daily', date])

export const getForecastState = (globalState) => globalState[stateKey];
export default ForecastReducer
