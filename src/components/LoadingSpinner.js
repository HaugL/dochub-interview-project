import React, { Component } from 'react';
import Spinner from 'react-spinkit'
import PropTypes from 'prop-types'

class LoadingSpinner extends Component {
  render(){
    const { color } = this.props
    return (
      <div className='loading-spinner-container'>
        <div className='spinner'>
          <Spinner name="ball-scale-multiple" color={color || "#00b5e2"}/>
        </div>
        <h3>Your Clouds Are Loading</h3>
      </div>
    )
  }
}

LoadingSpinner.propTypes = {
  color: PropTypes.string
}

export default LoadingSpinner
