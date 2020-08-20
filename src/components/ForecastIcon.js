import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cloudsIcon from '../../public/assets/icons/clouds.svg'
import hazeIcon from '../../public/assets/icons/haze.svg'
import rainIcon from '../../public/assets/icons/rain.svg'
import snowIcon from '../../public/assets/icons/snow.svg'
import sunIcon from '../../public/assets/icons/sun.svg'
import thunderIcon from '../../public/assets/icons/thunder.svg'

class ForecastIcon extends Component {
  render(){
    const iconInfo = this.getIconInfo()
    return <img className='weather-icon' alt={ iconInfo.alt } src={ iconInfo.source }/>
  }

  test = () => {
    console.log("TEST")
  }

  getIconInfo = () => {
    const { icon } = this.props
    switch(icon) {
      case "01":
        return {source: sunIcon, alt: 'sun icon'}
      case "02":
      case "03":
      case "04":
        return {source: cloudsIcon, alt: 'clouds icon'}
      case "09":
      case "10":
        return {source: rainIcon, alt: 'rain icon'}
      case "11":
      return {source: thunderIcon, alt: 'thunder icon'}
      case "13":
        return {source: snowIcon, alt: 'snow icon'}
      default:
        return {source: hazeIcon, alt: 'haze icon'}
    }
  }
}

ForecastIcon.proptypes = {
  icon: PropTypes.number
}

export default ForecastIcon
