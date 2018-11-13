import { browserHistory } from 'react-router'
import { getURLPrefix } from './API'

export function getUrl(){
  return window.location.href
}

export function getSlug(){
  const currentLocation = browserHistory.getCurrentLocation()
  return `${currentLocation.pathname}${currentLocation.search}`
}

export function isProduction(){
  return getURLPrefix().indexOf('production') > -1
}

export function getSitePrefix(){
  return getUrl().match(/.+\.com|.+localhost:\d+/)[0]
}
