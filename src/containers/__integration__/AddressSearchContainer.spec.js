import React from 'react';
import { mountComponentWithStore, mockAPI } from '../../test_utils/integration'
import AddressSearchContainer from '../AddressSearchContainer'
import sinon from 'sinon'
import Immutable from 'immutable'

const stubCollection = sinon.sandbox.create()

const renderContainer = (props, config) => {
  const containerProps = {
    ...props,
  };

  return mountComponentWithStore((<AddressSearchContainer {...containerProps} />), { collection: stubCollection, config: {} })
};

describe('AddressSearchContainer', () => {
  let container, wrapper;

  const refreshWrapper = () => {
    wrapper.update()
    container = wrapper.find(AddressSearchContainer)
  }

  beforeEach(() => {
    mockAPI(stubCollection, {
      ['url']: (config) => denverForecast
    });
    ({wrapper} = renderContainer({}, {}))
    container = wrapper.find(AddressSearchContainer)
  })

  afterEach(() => {
    stubCollection.restore()
  });

  describe('initial rendering', () => {
    it('renders correct address', () => {
      expect(container.find("INPUT CLASS").val).toBe('Denver, CO')
    })
  })

  describe('updating value', () => {
    beforeEach(() => {
      // code that updates the value and blurs
    })

    it('updates value in input', () => {
      expect(container.find("INPUT CLASS").value()).toBe('NEW VALUE')
    })

    it('queries google for coordinates', () => {
      expect(container.find("INPUT CLASS").value()).toBe('NEW VALUE')
    })
  })
})
