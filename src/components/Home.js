import React, { Component } from 'react';
import ForecastContainer from '../containers/ForecastContainer'

class Home extends Component {
  render(){
    return (
      <div className='home-container'>
        <ForecastContainer />
      </div>
    )
  }
}

export default Home
