import React, { Component } from 'react';
import moment from 'moment'
import { Row, Col } from 'react-bootstrap'
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
        <Row>
          <Col xs={6}>
            <h3>{ moment(forecast.get('date')).format('dddd') }</h3>
            { forecast.get('description') }
            <Row className='temp-ranges'>
              <Col xs={6} className='min-temp'>{Math.floor(forecast.get('minTemp'))}°F</Col>
              <Col xs={6} className='max-temp'>{Math.floor(forecast.get('maxTemp'))}°F</Col>
            </Row>
          </Col>
          <Col xs={6} className='icon-column'>
            <img alt="weather icon" src={ this.getIcon() }/>
          </Col>
        </Row>
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
