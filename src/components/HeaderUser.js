import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/headerUser.css';
import md5 from 'crypto-js/md5';

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
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">{ score }</p>
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
