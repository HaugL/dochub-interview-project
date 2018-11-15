import React, { Component } from 'react';
import DayForecast from './DayForecast'
import ImmutablePropTypes from 'react-immutable-proptypes'

class WeekForecast extends Component {
  render(){
    return (
      <div>
        { this.renderDayForecasts() }
      </div>
    )
  }

  renderDayForecasts = () => {
    const { forecast } = this.props
    return forecast.toList().sortBy((f) => f.get('date')).map((f) => {
      return <DayForecast forecast={f} key={f.get('date')}/>
    }).toJS()
  }
}

WeekForecast.proptypes = {
  forecast: ImmutablePropTypes.list.isRequired
}

export default WeekForecast
