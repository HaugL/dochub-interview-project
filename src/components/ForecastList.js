import React, { Component } from 'react';
import ForecastListItem from './ForecastListItem'
import ImmutablePropTypes from 'react-immutable-proptypes'
import PropTypes from 'prop-types';

class ForecastList extends Component {
  render(){
    return (
      <div>
        { this.renderForecastListItems() }
      </div>
    )
  }

  renderForecastListItems = () => {
    const { forecast, onForecastClick } = this.props
    return forecast.toList().sortBy((f) => f.get('key')).map((f) => {
      return (
        <ForecastListItem
          forecast={f}
          key={f.get('key')}
          onForecastClick={ onForecastClick }
        />
      )
    }).toJS()
  }
}

ForecastList.proptypes = {
  forecast: ImmutablePropTypes.list.isRequired,
  onForecastClick: PropTypes.func
}

export default ForecastList
