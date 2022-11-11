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
  }

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
    const { message } = this.state;
    return (
      <div>
        <HeaderUser />
        <p data-testid="feedback-text">{message}</p>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  assertions: state.player.assertions,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
