import React from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router'
import {
  fetchCityForecast
} from '../actions/ForecastActions'
import FetchComponent from '../utils/FetchComponent'
import {
  getCurrentCoordinates
} from '../reducers/LocationReducer'
import {
  getWeeklyCityForecast,
  getDailyCityForecast
} from '../reducers/ForecastReducer'
import ForecastList from '../components/ForecastList'
import LoadingSpinner from '../components/LoadingSpinner'
import './styles/ForecastContainer.sass'
import backArrowIcon from '../../public/assets/icons/back_arrow.svg'

class ForecastContainer extends FetchComponent {
  render() {
    return (
      <div className='forecast-container container'>
        { this.renderBackButton() }
        { this.renderForecast() }
      </div>
    )
  }

  renderBackButton = () => {
    const { forecastType } = this.props
    if(forecastType === 'daily') {
      return (
        <a className='navigate-weekly-weather' onClick={ this.navigateToWeeklyWeather }>
          <img src={ backArrowIcon } alt='back arrow'/>
          See Weekly Weather
        </a>
      )
    } else {
      return null
    }
  }

  renderForecast = () => {
    const { forecast, forecastType } = this.props
    if(forecast){
      return (
        <ForecastList
          forecast={ forecast }
          onForecastClick={ forecastType === 'daily' ? null: this.onForecastClick }
        />
      )
    } else {
      return (
        <LoadingSpinner />
      )
    }
  }

  onForecastClick = (key) => {
    browserHistory.push(`?daily_forecast=${key}`)
  }

  navigateToWeeklyWeather = () => {
    browserHistory.push('/')
  }

  fetchData(props, state){
    const {
      fetchCityForecast,
      coordinates
    } = props

    fetchCityForecast(coordinates)
  }
}

const mapStateToProps = (state, props) => {
  const coordinates = getCurrentCoordinates(state)
  let forecast = getWeeklyCityForecast(state, coordinates)
  let forecastType = 'weekly'
  if(props.dailyForecast) {
    const dailyForecast = getDailyCityForecast(state, coordinates, props.dailyForecast)
    if(!dailyForecast && forecast) {
      browserHistory.push('/')
    } else {
      forecast = dailyForecast
      forecastType = 'daily'
    }
  }

  return {
    coordinates,
    forecast,
    forecastType
  }
}

const mapDispatchToProps = {
  fetchCityForecast
}

ForecastContainer.proptypes = {
  forecast: ImmutablePropTypes.map,
  fetchCityForecast: PropTypes.func.isRequired,
  dailyForecast: PropTypes.string.isRequired,
  forecastType: PropTypes.string.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer)
