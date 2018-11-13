import { getState } from "./store"
import { requestAPI } from "../utils/API"

export function isValueCurrent(value) {
  if(!value || value.isEmpty()){
    return false;
  } else {
    return value.get('isFetching') || !value.get('isStale');
  }
}

export function getValue(entry) {
  return entry && entry.get('value');
}

export function fetchAction({shouldCallAPI, requestParams, requestAction, receivedAction, failureAction, onSuccess, onFailure}) {
  return function (dispatch) {
    if(shouldCallAPI(getState())){
      dispatch(requestAction())
      const newRequestParams = {
        success: (results) => {
          dispatch(receivedAction(results))
          if(onSuccess){
            onSuccess(results)
          }
        },
        failure: (error) => {
          if(onFailure){
            onFailure(error)
          }
          dispatch(failureAction(error))
        },
        ...requestParams
      }
      return requestAPI(newRequestParams);
    }
  };
}

export function simpleDispatchAction({ action }){
  return function (dispatch) {
    dispatch(action())
  }
}
