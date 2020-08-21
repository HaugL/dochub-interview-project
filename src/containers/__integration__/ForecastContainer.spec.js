import React from 'react';
import { mountComponentWithStore, mockAPI } from '../../test_utils/integration'
import ForecastContainer from '../ForecastContainer'
import sinon from 'sinon'
import { denverForecast } from '../../test_utils/forecast/schema/denver_forecast'
import LoadingSpinner from '../../components/LoadingSpinner'
import ForecastListItem from '../../components/ForecastListItem'

const stubCollection = sinon.sandbox.create()

const renderContainer = (props, config) => {
  const containerProps = {
    ...props,
  };

  return mountComponentWithStore((<ForecastContainer {...containerProps} />), { collection: stubCollection, config: {} })
};

describe('ForecastContainer', () => {
  let container, wrapper;

  afterEach(() => {
    stubCollection.restore()
  });

  describe('when the forecast is loading', () => {
    beforeEach(() => {
      ({wrapper} = renderContainer({}, {}))
      container = wrapper.find(ForecastContainer)
    })

    it('renders a loading spinner', () => {
      expect(container.find(LoadingSpinner).length).toBe(1)
    })

    it('does not render the forecast', () => {
      expect(container.find(ForecastListItem).length).toBe(0)
    })
  })

  describe('when the forecast has loaded', () => {
    describe('weekly forecast', () => {
      beforeEach(() => {
        mockAPI(stubCollection, {
          ['https://api.openweathermap.org/data/2.5/forecast']: (config) => denverForecast // eslint-disable-line no-useless-computed-key
        });
        ({wrapper} = renderContainer({}, {}))
        container = wrapper.find(ForecastContainer)
      })

      it('loads forecast for 5 days', () => {
        expect(container.find(ForecastListItem).length).toBe(6)
      })

      it('loads correct dates in order as links', () => {
        const dates = container.find(ForecastListItem).find('a .forecast-list-item-title')
        expect(dates.map((f) => f.text())).toEqual([
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
          "Monday",
          "Tuesday"
        ])
      })

      it('loads correct min temperatures for each date', () => {
        const minTemps = container.find(ForecastListItem).find('.min-temp')
        expect(minTemps.map((f) => f.text())).toEqual([
          "53°F",
          "16°F",
          "12°F",
          "12°F",
          "12°F",
          "13°F",
        ])
      })

      it('loads correct max temperatures for each date', () => {
        const maxTemps = container.find(ForecastListItem).find('.max-temp')
        expect(maxTemps.map((f) => f.text())).toEqual([
          "57°F",
          "57°F",
          "44°F",
          "43°F",
          "50°F",
          "48°F",
        ])
      })

      it('loads most severe weather description for each date', () => {
        const descriptions = container.find(ForecastListItem).find('.weather-description')
        expect(descriptions.map((f) => f.text())).toEqual([
          "clear sky",
          "scattered clouds",
          "light snow",
          "light snow",
          "clear sky",
          "clear sky",
        ])
      })

      it('shows correct weather icon', () => {
        const icons = container.find(ForecastListItem).find('.weather-icon')
        expect(icons.map((f) => f.prop('alt'))).toEqual([
          "sun icon",
          "clouds icon",
          "snow icon",
          "snow icon",
          "sun icon",
          "sun icon",
        ])
      })
    })
  })

  describe('daily forecast', () => {
    beforeEach(() => {
      mockAPI(stubCollection, {
        ['https://api.openweathermap.org/data/2.5/forecast']: (config) => denverForecast // eslint-disable-line no-useless-computed-key
      });
      ({wrapper} = renderContainer({ dailyForecast: '2018-11-16' }, {}))
      container = wrapper.find(ForecastContainer)
    })

    it('loads forecast for 8 times', () => {
      expect(container.find(ForecastListItem).length).toBe(8)
    })

    it('loads correct dates in order', () => {
      const dates = container.find(ForecastListItem).find('.forecast-list-item-title')
      expect(dates.map((f) => f.text())).toEqual([
        "12 am",
        "3 am",
        "6 am",
        "9 am",
        "12 pm",
        "3 pm",
        "6 pm",
        "9 pm"
      ])
    })

    it('does not render times as links', () => {
      expect(container
        .find(ForecastListItem)
        .find('a .forecast-list-item-title')
        .length
      ).toEqual(0)
    })
  })
})
