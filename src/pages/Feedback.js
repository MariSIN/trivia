import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderUser from '../components/HeaderUser';
import { connect } from 'react-redux';

class Feedback extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    this.feedbackMessage();
  };
  
  playAgainButton = () => {
   const { history } = this.props;
   history.push('/');
  };
  
  feedbackMessage = () => {
    const { assertions } = this.props;
    const number3 = 3;
    if (assertions < number3) {
      this.setState({
        message: 'Could be better...',
      });
    } else {
      this.setState({
        message: 'Well Done!',
      });
    }
  };

  render() {
    const { score, assertions } = this.props;
    const { message } = this.state;
    return (
      <div>
        <HeaderUser />
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ this.playAgainButton }
        >
          Play Again
        </button>
        <p data-testid="feedback-total-score">{ score }</p>
        <p data-testid="feedback-total-question">{ assertions }</p>
        <p data-testid="feedback-text">{ message }</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
