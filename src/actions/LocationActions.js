import { simpleDispatchAction } from "../utils/Actions"
import { LEGACY_CSS_LOADED, UPDATED_CSS_LOADED } from '../utils/Constants'

export function getBrowserLocation() {
  console.log("HEYY")
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log(position)
  });
  return simpleDispatchAction({
  action: () => { return { type: "HI" } },
  })
}
