import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { infoUser } from '../redux/actions/action';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    disabled: true,
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.validaEntrada());
  };

  validaEntrada = () => {
    const { email, name } = this.state;
    const emailRegex = /\S+@\S+\.\S+/;
    const emailValido = emailRegex.test(email);
    const nameValido = name.length > 0;

    const validaSeiLa = emailValido && nameValido;

    this.setState({
      disabled: !validaSeiLa,
    });
  };

  exportInfoGlobal = async () => {
    const { dispatch, history } = this.props;

    dispatch(infoUser(this.state));
    this.setState({
      email: '',
      name: '',
      disabled: true,
    });
    history.push('/game');

    const fetchToken = await this.token();

    localStorage.setItem('userToken', await fetchToken);
  };

  token = async () => {
    try {
      const response = await fetch('https://opentdb.com/api_token.php?command=request');
      const data = await response.json();
      return data.token;
    } catch (error) {
      return console.error;
    }
  };

  render() {
    const { email, name, disabled } = this.state;
    return (
      <div>
        <label htmlFor="name">
          Nome da pessoa
          <input
            value={ name }
            name="name"
            id="name"
            type="text"
            data-testid="input-player-name"
            placeholder="Nome de Usuario"
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="email">
          Email
          <input
            value={ email }
            name="email"
            id="email"
            type="email"
            data-testid="input-gravatar-email"
            placeholder="Email de Usuario"
            onChange={ this.handleChange }
          />
        </label>

        <button
          type="button"
          data-testid="btn-play"
          disabled={ disabled }
          onClick={ this.exportInfoGlobal }
        >
          Play
        </button>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
