import React, { Component } from 'react';
import PropTypes from 'prop-types';
import HeaderUser from '../components/HeaderUser';

class Feedback extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <HeaderUser />
        <p data-testid="feedback-text">Feedback</p>
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

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default Feedback;
