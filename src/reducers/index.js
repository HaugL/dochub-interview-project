import { combineReducers } from 'redux'

import LocationReducer from './LocationReducer'

const reducers = combineReducers({
  'location': LocationReducer || null,
})

export default reducers
