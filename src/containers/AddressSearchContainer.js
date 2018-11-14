import React from 'react';
import { connect } from 'react-redux';
import {
} from '../actions/LocationActions'
import FetchComponent from '../utils/FetchComponent'
import {
  getCurrentCity
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
  city: getCurrentCity(state)
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearchContainer)
