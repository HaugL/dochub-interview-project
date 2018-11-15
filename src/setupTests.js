import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';
import sinon from 'sinon'
import mixpanel from 'mixpanel-browser';

configure({ adapter: new Adapter() });

let sessionStorage = {}

if (!global.window.localStorage) {
  global.window.localStorage = {
    getItem() { return '{}'; },
    setItem() {}
  };
  global.window.sessionStorage = {
    getItem(key) {
      return sessionStorage[key]
    },
    setItem(key, item) {
      sessionStorage[key] = item
    },
    removeItem(key){
      delete sessionStorage[key]
    }
  };
}

if(!global.window.gtag){
  global.window.gtag = () => {}
}

if(!global.window.matchMedia){
  global.window.matchMedia = () => { return { addListener: () => {}} }
}

global.window.google ={
  maps: {
    Marker:class{},
    Map:class{ setTilt(){} fitBounds(){}},
    LatLngBounds:class{},
    places:{
      Autocomplete: class {},
      AutocompleteService:class{},
      PlacesServiceStatus: {
        INVALID_REQUEST: 'INVALID_REQUEST',
        NOT_FOUND: 'NOT_FOUND',
        OK: 'OK',
        OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
        REQUEST_DENIED: 'REQUEST_DENIED',
        UNKNOWN_ERROR: 'UNKNOWN_ERROR',
        ZERO_RESULTS: 'ZERO_RESULTS',
      },
      PlacesAutocomplete:{
          INVALID_REQUEST: 'INVALID_REQUEST',
          NOT_FOUND: 'NOT_FOUND',
          OK: 'OK',
          OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
          REQUEST_DENIED: 'REQUEST_DENIED',
          UNKNOWN_ERROR: 'UNKNOWN_ERROR',
          ZERO_RESULTS: 'ZERO_RESULTS',
      }
    },
    MarkerClusterer:class{},
    GeocoderStatus: {
      INVALID_REQUEST: 'INVALID_REQUEST',
      NOT_FOUND: 'NOT_FOUND',
      OK: 'OK',
      OVER_QUERY_LIMIT: 'OVER_QUERY_LIMIT',
      REQUEST_DENIED: 'REQUEST_DENIED',
      UNKNOWN_ERROR: 'UNKNOWN_ERROR',
      ZERO_RESULTS: 'ZERO_RESULTS',
    },
    Geocoder:class{
      constructor() { this.maps = {GeocoderStatus: { OK: 'OK' }}} 
    },
  }
};

sinon.stub(mixpanel, 'track')
