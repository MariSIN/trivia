import React from 'react';
import PropTypes from 'prop-types';
import hourglass from '../style/imgs/timer.gif';

class Timer extends React.Component {
  render() {
    const { timer } = this.props;
    return (
      <span className="timer-container">
        <p>{ timer }</p>
        <p className="timer">
          { timer === 0 ? 0
            : (
              <span>
                {timer}
                <img src={ hourglass } alt="time" />
              </span>) }
        </p>
      </span>
    );
  }
}

Timer.propTypes = ({
  timer: PropTypes.number,
}).isRequired;

export default Timer;
