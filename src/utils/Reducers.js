export function createReducer(state, action, handlers) {
  const handler = handlers[action.type]
  if(handler){
    return handlers[action.type](state, action)
  } else {
    return state
  }
}

export function shouldFetchValue(state, value) {
  if(state.get('isFetching')){
    return false
  } else if (state.get('isStale')){
    return true
  } else {
    return !value
  }
}
