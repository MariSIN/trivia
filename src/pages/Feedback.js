import React, { Component } from 'react';
import HeaderUser from '../components/HeaderUser';

class Feedback extends Component {
  render() {
    return (
      <div>
        <HeaderUser />
        <p data-testid="feedback-text">Feedback</p>
      </div>
    );
  }
}

export default Feedback;
