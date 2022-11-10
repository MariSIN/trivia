import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Game extends React.Component {
  render() {
    const { email, name } = this.props;
    const hash = md5(email).toString();
    return (
      <>
        <header>
          <img
            data-testid="header-profile-picture"
            src={ `https://www.gravatar.com/avatar/${hash}` }
            alt={ name }
          />
          <p data-testid="header-player-name">{ name }</p>
          <p data-testid="header-score">Score: 0</p>
        </header>
        <h1>Game</h1>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Game.propTypes = ({
  email: PropTypes.string,
  name: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(Game);
