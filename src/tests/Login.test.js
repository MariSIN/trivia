import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';

const testIdEmail = 'input-gravatar-email'
const testIdName = 'input-player-name'
const testIdButton = 'btn-play';

describe('Testa o componente <Login />', () => {
  it('Testa se a aplicação contém um input para email', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIdEmail);

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveAttribute('type', 'email');
  });
  it('Testa se a aplicação contém um input para nome', () => {
    renderWithRouterAndRedux(<App />);
    const inputName = screen.getByTestId(testIdName);

    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveAttribute('type', 'text');
  });
  it('Testa se é possível escrever nos inputs', () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByTestId(testIdEmail);
    const inputName = screen.getByTestId(testIdName);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');
  });
  it('Testa se o botão é habilitado quando digitado corretamente nos inputs', () => {
    renderWithRouterAndRedux(<App />);

    const buttonPlay = screen.getByTestId(testIdButton);

    expect(buttonPlay).toBeDisabled();

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputName = screen.getByTestId(testIdName);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');

    expect(buttonPlay).toBeEnabled();
  });

  it('Testa se é renderizado o botão de configurações', () => {
    renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');
    expect(buttonSettings).toBeInTheDocument();
  });

  it('Testa se o botão de configurações redireciona para a página /settings', () => {
    const {history} = renderWithRouterAndRedux(<App />);
    const buttonSettings = screen.getByTestId('btn-settings');

    userEvent.click(buttonSettings);
    
    const { pathname } = history.location;
    expect(pathname).toBe('/settings');
  });

  it('Testa se ao clicar no botão é direcionado para a página do Game', async () => {
  jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue ({token:'123456asdfg'})
      });

    const { history } = renderWithRouterAndRedux(<App />);    

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputName = screen.getByTestId(testIdName);
    const buttonPlay = screen.getByTestId(testIdButton);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');

    userEvent.click(buttonPlay);

    await waitFor(() => expect(history.location.pathname).toBe('/game'), 1000);
  });
});