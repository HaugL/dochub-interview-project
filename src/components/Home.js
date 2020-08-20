import React, { Component } from 'react';
import ForecastContainer from '../containers/ForecastContainer'
import AddressSearchContainer from '../containers/AddressSearchContainer'

class Home extends Component {
  render(){
    const queryString = this.props.location.query
    const dailyForecast = queryString.daily_forecast
    return (
      <div className='home-container'>
        <AddressSearchContainer />
        <ForecastContainer
          dailyForecast={ dailyForecast }
        />
      </div>
    )
  }
}

export default Home
