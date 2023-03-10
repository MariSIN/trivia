import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { HiStar } from 'react-icons/hi';
import '../style/ranking.css';

class Ranking extends React.Component {
  state = {
    rankPlayer: [],
  };

  componentDidMount() {
    const rankPlayer = JSON.parse(localStorage.getItem('playerRank')) || [];

    this.setState({
      rankPlayer: this.rankeia(rankPlayer),
    });
  }

  rankeia = (players) => {
    const playerRank = players.sort((as, b) => b.score - as.score);
    return playerRank;
  };

  render() {
    const { rankPlayer } = this.state;
    return (
      <div>
        <div />
        <div className="ranking">
          <h1 data-testid="ranking-title" className="ranking-title">Ranking</h1>
          {
            rankPlayer.map((item, index) => {
              const hash = md5(item.email).toString();
              return (
                <div key={ `${index}${item.score}` } className="ranking-container list">
                  <img
                    src={ `https://www.gravatar.com/avatar/${hash}` }
                    alt="Imagem do Player do jogador"
                    className="img-ranking"
                  />
                  <p
                    data-testid={ `player-name-${index}` }
                    className="player-ranking"
                  >
                    {item.name}

                  </p>
                  <p
                    className="score-ranking"
                  >
                    <HiStar className="star star-ranking" />
                    <span
                      data-testid={ `player-score-${index}` }
                      className="total-score-ranking"
                    >
                      { item.score }
                    </span>
                    pontos
                  </p>
                </div>
              );
            })
          }

          <button
            type="button"
            data-testid="btn-go-home"
            className="button-go-home"
            onClick={ () => {
              const { history } = this.props;
              history.push('/');
            } }
          >
            Go Home
          </button>
        </div>

      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Ranking);
