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

sinon.stub(mixpanel, 'track')
