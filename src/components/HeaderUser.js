import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/headerUser.css';
import md5 from 'crypto-js/md5';
import { HiStar } from 'react-icons/hi';

class HeaderUser extends Component {
  render() {
    const { email, name, score } = this.props;
    const hash = md5(email).toString();
    return (
      <header className="header-user">
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ name }
          className="img-gravatar"
        />
        <p data-testid="header-player-name" className="player">{ name }</p>
        <span className="score">
          <p className="title-score">
            <HiStar className="star" />
            Score:
          </p>
          <span data-testid="header-score" className="total-score">{ score }</span>
        </span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
  score: state.player.score,
});

HeaderUser.propTypes = ({
  email: PropTypes.string,
  name: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(HeaderUser);
