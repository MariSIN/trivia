import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
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
                <div key={ `${index}${item.score}` } className="ranking-container">
                  <img
                    src={ `https://www.gravatar.com/avatar/${hash}` }
                    alt="Imagem do Player do jogador"
                  />
                  <p
                    data-testid={ `player-name-${index}` }
                  >
                    {item.name}

                  </p>
                  <p data-testid={ `player-score-${index}` }>
                    {item.score}

                  </p>
                </div>
              );
            })
          }

          <button
            type="button"
            data-testid="btn-go-home"
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
