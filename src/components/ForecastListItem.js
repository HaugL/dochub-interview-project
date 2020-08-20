import React, { Component } from 'react';
import './styles/ForecastListItem.sass'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types';
import ForecastIcon from './ForecastIcon'

class ForecastListItem extends Component {
  render(){
    const { forecast } = this.props
    return (
      <div className='forecast-list-item-container'>
        <div className='row'>
          <div className='col-xs-6'>
            { this.renderTitle() }
            <div className='weather-description'>
              { forecast.get('description') }
            </div>
            <div className='row temp-ranges'>
              <div className='col-xs-6 min-temp'>{Math.floor(forecast.get('minTemp'))}°F</div>
              <div className='max-temp'>{Math.floor(forecast.get('maxTemp'))}°F</div>
            </div>
          </div>
          <div className='col-xs-6 icon-column'>
            <ForecastIcon icon={ forecast.get('icon') } />
          </div>
        </div>
      </div>
    )
  }

  renderTitle = () => {
    const { forecast, onForecastClick } = this.props
    if(onForecastClick) {
      return (
        <a
          className='clickable-forecast-list-item-title'
          onClick={ () => onForecastClick(forecast.get('key')) }
        >
          <h3 className='forecast-list-item-title'>
            { forecast.get('title') }
          </h3>
        </a>
      )
    } else {
      return (
        <h3 className='forecast-list-item-title'>
          { forecast.get('title') }
        </h3>
      )
    }
  }
}

ForecastListItem.proptypes = {
  forecast: ImmutablePropTypes.map.isRequired,
  onForecastClick: PropTypes.func
}

export default ForecastListItem
