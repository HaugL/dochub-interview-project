import React, { Component } from 'react';
import { PacmanLoader } from 'halogen'

class LoadingSpinner extends Component {
  render(){
    const { color } = this.props
    return (
      <div className='loading-spinner-container' style={{color: '#00b5e2'}}>
        <div className='spinner'>
          <PacmanLoader color={color || '#00b5e2'}/>
        </div>
        <h3>Your Clouds Are Loading</h3>
      </div>
    )
  }
}

export default LoadingSpinner
