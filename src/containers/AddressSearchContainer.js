import React from 'react';
import { connect } from 'react-redux';
import {
  fetchCityForecast
} from '../actions/ForecastActions'
import FetchComponent from '../utils/FetchComponent'
import {
  getCurrentCity,
  getCurrentCoordinates
} from '../reducers/LocationReducer'
// import './styles/AddressSearchContainer.sass'

class AddressSearchContainer extends FetchComponent {
  render() {
    const { city } = this.props
    return (
      <div className='address-search'>
        { city }
      </div>
    )
  }

  fetchData(props, state){
  }
}

const mapStateToProps = (state, props) => ({
  city: getCurrentCity(state),
  coordinates: getCurrentCoordinates(state)
})

const mapDispatchToProps = {
  fetchCityForecast
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearchContainer)
