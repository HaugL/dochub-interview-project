import { isProduction } from './url'
import Raven from "raven-js"
import Immutable from 'immutable'
import moment from 'moment'

export const trackMetric = (title, attributes = {}, debug_attributes = []) => {
  window.gtag('event', title);
  if(isProduction()){
    try {
      // Send metrics here
    } catch (e) {
      Raven.captureException(e)
    }
  }
}
