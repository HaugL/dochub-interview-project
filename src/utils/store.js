import Raven from "raven-js"
import Immutable from 'immutable'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers'
import createRavenMiddleware from "raven-for-redux";
import { isProduction } from './url'

let store
if(isProduction()){
  Raven.config('https://452a37a195c8485299f1757a2c285214@sentry.io/280259').install()
  store = createStore(reducers, applyMiddleware(thunk, createRavenMiddleware(Raven, {})))
} else {
  store = createStore(reducers, applyMiddleware(thunk))
}

export function getStore(){ return store };
export function getState(){ return store.getState() };
export function createTestStore(){
  store = createStore(reducers, applyMiddleware(thunk))
  return store
}

// Local Storage
export function getImmutableFromLocalStorage(key){
  const val = getFromLocalStorage(key);
  if(val){
    return Immutable.fromJS(val)
  }
}

export function getFromLocalStorage(key){
  try {
    const val = localStorage.getItem(key)
    if(val){
      return JSON.parse(val)
    }
  } catch(e) {
    return;
  }
}

export function setToLocalStorage(key, obj) {
  localStorage.setItem(key, JSON.stringify(obj));
}

export function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

// Session Storage
export function setToSessionStorage(key, obj) {
  sessionStorage.setItem(key, JSON.stringify(obj));
}

export function getFromSessionStorage(key){
  try {
    const val = sessionStorage.getItem(key)
    if(val){
      return JSON.parse(val)
    }
  } catch(e) {
    return;
  }
}

export function getImmutableFromSessionStorage(key){
  const val = getFromSessionStorage(key);
  if(val){
    return Immutable.fromJS(val)
  }
}

export function removeFromSessionStorage(key) {
  sessionStorage.removeItem(key);
}
