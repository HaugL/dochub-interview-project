import React from 'react';
import { connect } from 'react-redux';
import { getBrowserLocation } from '../actions/LocationActions'
import FetchComponent from '../utils/FetchComponent'
// import './styles/AddressSearchContainer.sass'

class AddressSearchContainer extends FetchComponent {
  render(){
    return (
      <div className='address-search'>
        Hi
      </div>
    )
  }

  fetchData(props, state){
    props.getBrowserLocation()
  }
}

const mapStateToProps = (state, props) => ({
})

const mapDispatchToProps = {
  getBrowserLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(AddressSearchContainer)
