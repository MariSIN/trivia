import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class HeaderUser extends Component {
  render() {
    const { email, name } = this.props;
    const hash = md5(email).toString();
    return (
      <header>
        <img
          data-testid="header-profile-picture"
          src={ `https://www.gravatar.com/avatar/${hash}` }
          alt={ name }
        />
        <p data-testid="header-player-name">{ name }</p>
        <p data-testid="header-score">Score: 0</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.player.email,
  name: state.player.name,
});

HeaderUser.propTypes = ({
  email: PropTypes.string,
  name: PropTypes.string,
}).isRequired;

export default connect(mapStateToProps)(HeaderUser);
