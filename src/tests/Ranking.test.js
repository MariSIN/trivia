import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { act } from 'react-dom/test-utils';
import App from '../App.js';
import Ranking from '../pages/Ranking.js';
import Feedback from '../pages/Feedback.js';

describe('Testa a página Ranking', () => {
  it('Testa se na página é renderizado o botão de voltar ao início', () => {
    renderWithRouterAndRedux(<Ranking />);
    const btnGoHome = screen.queryByTestId('btn-go-home');
    expect(btnGoHome).toBeInTheDocument();
  });

  it('Testa se o botão direciona para a página incial', () => {
    localStorage.setItem(
      'player',
      JSON.stringify([
        { name: 'Mariana', score: 80, email: 'mariana@gmail.com' },
        { name: 'Tarcísio', score: 135, email: 'tarcisio@hotmail.com' },
      ])
    );

    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/ranking');
    });

    const btnGoHome = screen.queryByTestId('btn-go-home');

    userEvent.click(btnGoHome);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

});
