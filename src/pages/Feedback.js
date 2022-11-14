import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import HeaderUser from '../components/HeaderUser';

class Feedback extends Component {
  state = {
    message: '',
  };

  componentDidMount() {
    this.feedbackMessage();
    const { playerEmail, playerName, score } = this.props;
    const rankPlayer = JSON.parse(localStorage.getItem('playerRank')) || [];
    const infoPLayer = {
      name: playerName,
      email: playerEmail,
      score,
    };
    rankPlayer.push(infoPLayer);
    localStorage.setItem('playerRank', JSON.stringify(rankPlayer));
  }

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
    const { score, assertions, history } = this.props;
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
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => history.push('/ranking') }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
  score: state.player.score,
  playerEmail: state.player.email,
  playerName: state.player.name,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  playerEmail: PropTypes.string.isRequired,
  playerName: PropTypes.string.isRequired,

};

export default connect(mapStateToProps)(Feedback);
