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
import PlacesAutocomplete, {
  // geocodeByAddress,
  // getLatLng,
} from 'react-places-autocomplete';
import './styles/AddressSearchContainer.sass'
import searchIcon from '../../public/assets/icons/search.svg'

class AddressSearchContainer extends FetchComponent {
  render() {
    const { city } = this.props
    const inputProps = {
      value: city,
      onChange: this.onAddressChange,
      onSelect: this.onAddressSelect,
      placeholder: "Delivery address"
    }
    return (
      <div className='address-search container'>
        <div className='search-input'>
          <PlacesAutocomplete inputProps={inputProps} />
          <img src={searchIcon} alt="search icon"/>
        </div>
      </div>
    )
  }

  onAddressChange = (result) => {

  }

  onAddressSelect = (result) => {

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
