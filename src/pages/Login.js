import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RiSettings3Fill } from 'react-icons/ri';
import { clearInfo, infoUser } from '../redux/actions/action';
import '../style/login.css';

class Login extends React.Component {
  state = {
    email: '',
    name: '',
    disabled: true,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(clearInfo());
  }

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    }, () => this.validateLogin());
  };

  validateLogin = () => {
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
    localStorage.setItem('token', await this.getToken());

    history.push('/game');
  };

  getToken = () => {
    const request = fetch('https://opentdb.com/api_token.php?command=request')
      .then((response) => response.json())
      .then((data) => data.token)
      .catch((error) => console.log(error));
    return request;
  };

  render() {
    const { email, name, disabled } = this.state;
    return (
      <div className="login">
        <div className="button-settings">
          <button
            type="button"
            data-testid="btn-settings"
            className="settings"
            onClick={
              () => { const { history } = this.props; history.push('/settings'); }
            }
          >
            <RiSettings3Fill />
          </button>
        </div>
        <div className="login-content">
          <label htmlFor="name">
            <input
              value={ name }
              name="name"
              id="name"
              className="name"
              type="text"
              data-testid="input-player-name"
              placeholder="Nome de Usuario"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="email">
            <input
              value={ email }
              name="email"
              id="email"
              className="email"
              type="email"
              data-testid="input-gravatar-email"
              placeholder="Email de Usuario"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            data-testid="btn-play"
            className="btn-play"
            disabled={ disabled }
            onClick={ this.exportInfoGlobal }
          >
            Play
          </button>
        </div>

      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Login);
