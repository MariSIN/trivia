import React from 'react';
import PropTypes from 'prop-types';
import hourglass from '../style/imgs/timer.gif';
import alarm from '../style/imgs/alarm.gif';

class Timer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <p className="timer-container">
        { timer === 0 ? (
          <span className="alarm timer">
            <img src={ alarm } alt="alarm" className="alarm-time" />
          </span>)
          : (
            <span className="timer">
              <span className="timer-count">{timer}</span>
              <img src={ hourglass } alt="time" className="hourglass" />
            </span>) }
      </p>
    );
  }
}

Timer.propTypes = ({
  timer: PropTypes.number,
}).isRequired;

export default Timer;
