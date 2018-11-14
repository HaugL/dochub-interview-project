import React from 'react';
import { connect } from 'react-redux';
import {
  fetchCityForecast
} from '../actions/ForecastActions'
import FetchComponent from '../utils/FetchComponent'
import {
  getCurrentCity,
  getCurrentCoordinates
} from '../reducers/LocationReducer'
import { getCityForecast } from '../reducers/ForecastReducer'
import WeekForecast from '../components/WeekForecast'
import './styles/ForecastContainer.sass'

class ForecastContainer extends FetchComponent {
  render() {
    const { forecast } = this.props
    if(forecast){
      return (
        <div className='forecast-container container'>
          <WeekForecast forecast={ forecast }/>
        </div>
      )
    } else {
      // show spinner
      return null
    }
  }

  fetchData(props, state){
    const {
      fetchCityForecast,
      city,
      coordinates
    } = props

    fetchCityForecast(city, coordinates)
  }
}

const mapStateToProps = (state, props) => {
  const city = getCurrentCity(state)
  return {
    city,
    coordinates: getCurrentCoordinates(state),
    forecast: getCityForecast(state, city)
  }
}

const mapDispatchToProps = {
  fetchCityForecast
}

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer)
