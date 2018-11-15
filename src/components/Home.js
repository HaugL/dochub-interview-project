import React, { Component } from 'react';
import ForecastContainer from '../containers/ForecastContainer'
import AddressSearchContainer from '../containers/AddressSearchContainer'

class Home extends Component {
  render(){
    return (
      <div className='home-container'>
        <AddressSearchContainer />
        <ForecastContainer />
      </div>
    )
  }
}

export default Home
