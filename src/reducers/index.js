import { combineReducers } from 'redux'

import LocationReducer from './LocationReducer'
import ForecastReducer from './ForecastReducer'

const reducers = combineReducers({
  'location': LocationReducer || null,
  'forecast': ForecastReducer || null
})

export default reducers
