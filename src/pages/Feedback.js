import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderUser from '../components/HeaderUser';

class Feedback extends Component {
  playAgainButton = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    return (
      <div>
        <HeaderUser />
        <p data-testid="feedback-text">Feedback</p>
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgainButton }
        >
          Play Again
        </button>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
