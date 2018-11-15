import React from 'react';
import { connect } from 'react-redux';
import {
  fetchCityForecast
} from '../actions/ForecastActions'
import {
  updateCityString,
  fetchCoordinates
} from '../actions/LocationActions'
import FetchComponent from '../utils/FetchComponent'
import {
  getCurrentCity
} from '../reducers/LocationReducer'
import PlacesAutocomplete from 'react-places-autocomplete';
import './styles/AddressSearchContainer.sass'
import searchIcon from '../../public/assets/icons/search.svg'

class AddressSearchContainer extends FetchComponent {
  render() {
    const { city } = this.props
    const inputProps = {
      value: city,
      onChange: this.onAddressChange,
      onBlur: this.onAddressSelect,
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
    this.props.updateCityString(result)
  }

  onAddressSelect = (result) => {
    this.props.fetchCoordinates(result.target.value)
  }

  fetchData(props, state){
  }
}

const mapStateToProps = (state, props) => ({
  city: getCurrentCity(state),
})

const mapDispatchToProps = {
  fetchCityForecast,
  updateCityString,
  fetchCoordinates
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearchContainer)
