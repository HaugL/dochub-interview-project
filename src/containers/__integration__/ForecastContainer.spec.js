import React from 'react';
import { mountComponentWithStore, mockAPI } from '../../test_utils/integration'
import ForecastContainer from '../ForecastContainer'
import sinon from 'sinon'
import Immutable from 'immutable'
import { denverForecast } from '../../test_utils/forecast/schema/denver_forecast'

const stubCollection = sinon.sandbox.create()

const renderContainer = (props, config) => {
  const containerProps = {
    ...props,
  };

  return mountComponentWithStore((<ForecastContainer {...containerProps} />), { collection: stubCollection, config: {} })
};

describe('ForecastContainer', () => {
  let container, wrapper;

  const refreshWrapper = () => {
    wrapper.update()
    container = wrapper.find(ForecastContainer)
  }

  afterEach(() => {
    stubCollection.restore()
  });

  describe('when the forecast is loading', () => {
    beforeEach(() => {
      ({wrapper} = renderContainer({}, {}))
      container = wrapper.find(ForecastContainer)
    })

    it('renders a loading spinner', () => {
      expect(container.find('LOADING SPINNER CLASS').length).toBe(1)
    })

    it('does not render the forecast', () => {
      expect(container.find('SUB FORECAST CLASS').length).toBe(0)
    })
  })

  describe('when the forecast has loaded', () => {
    beforeEach(() => {
      mockAPI(stubCollection, {
        ['https://api.openweathermap.org/data/2.5/forecast']: (config) => denverForecast
      });
      ({wrapper} = renderContainer({}, {}))
      container = wrapper.find(ForecastContainer)
    })

    it('loads forecast for 5 days', () => {
      expect(container.find('SUB FORECAST CLASS').length).toBe(5)
    })

    it('loads correct dates in order', () => {
      expect(container.find('SUB FORECAST DATE TITLE CLASS').length).toEqual([

      ])
    })

    it('loads correct min temperatures for each date', () => {
      expect(container.find('SUB FORECAST DATE MIN TEMP CLASS').length).toEqual([

      ])
    })

    it('loads correct max temperatures for each date', () => {
      expect(container.find('SUB FORECAST DATE MAX TEMP CLASS').length).toEqual([

      ])
    })

    it('loads most severe weather description for each date', () => {
      expect(container.find('SUB FORECAST DATE DESCRIPTION CLASS').length).toEqual([

      ])
    })
  })
})
