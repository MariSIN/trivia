import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import HeaderUser from '../components/HeaderUser';
import gatim from '../style/imgs/gatim-batendo.gif';
import '../style/feedback.css';

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
    const { score, assertions, history, name, playerEmail } = this.props;
    const { message } = this.state;
    const hash = md5(playerEmail).toString();
    return (
      <div className="feedback-container">
        <HeaderUser />
        <div className="feedback">
          <img src={ gatim } alt="gatim" className="gatim" />
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt={ name }
            className="img-gravatar gravatar-feedback"
          />
          <div className="messages">
            <p data-testid="feedback-text" className="feedback-text">{ message }</p>
            <p>
              <span className="your-score">Your score is </span>
              <sapn
                className="total-score"
                data-testid="feedback-total-score"
              >
                { score }
              </sapn>
            </p>
            <p>
              <span className="your-assertions">Your assertions is </span>
              <span
                data-testid="feedback-total-question"
                className="total-score"
              >
                { assertions }
              </span>
            </p>
          </div>
          <div className="buttons">
            <button
              type="button"
              data-testid="btn-play-again"
              onClick={ this.playAgainButton }
              className="btn-play-again"
            >
              Play Again
            </button>
            <button
              type="button"
              data-testid="btn-ranking"
              onClick={ () => history.push('/ranking') }
              className="btn-ranking"
            >
              Ranking
            </button>
          </div>
        </div>
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
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
