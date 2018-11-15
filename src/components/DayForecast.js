import React, { Component } from 'react';
import moment from 'moment'
import './styles/DayForecast.sass'
import ImmutablePropTypes from 'react-immutable-proptypes'
import cloudsIcon from '../../public/assets/icons/clouds.svg'
import hazeIcon from '../../public/assets/icons/haze.svg'
import rainIcon from '../../public/assets/icons/rain.svg'
import snowIcon from '../../public/assets/icons/snow.svg'
import sunIcon from '../../public/assets/icons/sun.svg'
import thunderIcon from '../../public/assets/icons/thunder.svg'


class Home extends Component {
  render(){
    const { forecast } = this.props
    return (
      <div className='day-forecast-container'>
        <div className='row'>
          <div className='col-xs-6'>
            <h3 className='day-title'>
              { moment(forecast.get('date')).format('dddd') }
            </h3>
            <div className='weather-description'>
              { forecast.get('description') }
            </div>
            <div className='row temp-ranges'>
              <div className='col-xs-6 min-temp'>{Math.floor(forecast.get('minTemp'))}°F</div>
              <div className='max-temp'>{Math.floor(forecast.get('maxTemp'))}°F</div>
            </div>
          </div>
          <div className='col-xs-6 icon-column'>
            <img alt="weather icon" src={ this.getIcon() }/>
          </div>
        </div>
      </div>
    )
  }

  getIcon = () => {
    const { forecast } = this.props
    switch(forecast.get('icon')) {
      case "01":
        return sunIcon
      case "02":
      case "03":
      case "04":
        return cloudsIcon
      case "09":
      case "10":
        return rainIcon
      case "11":
      return thunderIcon
      case "13":
        return snowIcon
      default:
        return hazeIcon
    }
  }
}

Home.proptypes = {
  forecast: ImmutablePropTypes.map.isRequired
}

export default Home
