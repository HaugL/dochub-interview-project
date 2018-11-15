import React from 'react';
import { connect } from 'react-redux';
import {
  fetchCityForecast
} from '../actions/ForecastActions'
import FetchComponent from '../utils/FetchComponent'
import {
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
      coordinates
    } = props

    fetchCityForecast(coordinates)
  }
}

const mapStateToProps = (state, props) => {
  const coordinates = getCurrentCoordinates(state)
  return {
    coordinates,
    forecast: getCityForecast(state, coordinates)
  }
}

const mapDispatchToProps = {
  fetchCityForecast
}

export default connect(mapStateToProps, mapDispatchToProps)(ForecastContainer)
