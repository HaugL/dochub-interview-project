import React from 'react';
import { mountComponentWithStore } from '../../test_utils/integration'
import AddressSearchContainer from '../AddressSearchContainer'
import sinon from 'sinon'

const stubCollection = sinon.sandbox.create()

const renderContainer = (props, config) => {
  const containerProps = {
    ...props,
  };

  return mountComponentWithStore((<AddressSearchContainer {...containerProps} />), { collection: stubCollection, config: {} })
};

describe('AddressSearchContainer', () => {
  let container, wrapper, geocodeRan;

  const refreshWrapper = () => {
    wrapper.update()
    container = wrapper.find(AddressSearchContainer)
  }

  beforeEach(() => {
    geocodeRan = false
    global.window.google ={
      maps: {
        places:{
          Autocomplete: class {},
          AutocompleteService:class{},
          PlacesServiceStatus: {
            OK: 'OK',
          },
        },
        GeocoderStatus: {
          OK: 'OK',
        },
        Geocoder:class{
          constructor() { this.maps = {GeocoderStatus: { OK: 'OK' }}}
          geocode(){ geocodeRan = true }
        },
      }
    };
    ({wrapper} = renderContainer({}, {}))
    container = wrapper.find(AddressSearchContainer)
  })

  afterEach(() => {
    stubCollection.restore()
  });

  describe('initial rendering', () => {
    it('renders correct address', () => {
      expect(container.find(".search-input input").prop('value')).toBe('New York, NY')
    })
  })

  describe('updating value', () => {
    beforeEach(() => {
      container.find('.search-input input').simulate('change', {target: {value: 'Denver, CO'}});
      container.find('.search-input input').simulate('blur')
      refreshWrapper()
    })

    it('updates value in input', () => {
      expect(container.find(".search-input input").prop('value')).toBe('Denver, CO')
    })

    it('queries google for coordinates', () => {
      expect(geocodeRan).toBe(true)
    })
  })
})
