import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';
import { act } from 'react-dom/test-utils';
import Feedback from '../pages/Feedback.js';


describe('Testa a page <Feedback />', () => {
  it('Testa se a página tem a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  });

  it('Testa se existe um elemento onde é retornado o feedback', () => {
    renderWithRouterAndRedux(<Feedback />);
    const feedbackText = screen.queryByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();

  });

  it('Testa se existe um botão de jogar novamente', () => {
    renderWithRouterAndRedux(<Feedback />);
    const btnPlayAgain = screen.queryByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument();

  });

  it('Testa se ao clicar no botão de jogar novamente é redirecionado para página inicial', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));

    const btnPlayAgain = screen.queryByTestId('btn-play-again');
    userEvent.click(btnPlayAgain);

    const { pathname } = history.location;
    expect(pathname).toBe('/');

  });

  it('Testa se existe um botão para acessar o Ranking', () => {
    renderWithRouterAndRedux(<Feedback />);
    const btnRankig = screen.queryByTestId('btn-ranking');
    expect(btnRankig).toBeInTheDocument();
  });

  it('Testa se o botão para acessar o Rancking leva a outra página', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));

    const btnRankig = screen.queryByTestId('btn-ranking');
    userEvent.click(btnRankig);

    const { pathname } = history.location;
    expect(pathname).toBe('/ranking');

  });

  it('Testa se os acertos aparecem na página', () => {
    renderWithRouterAndRedux(<Feedback />);
    const assertions = screen.queryByTestId('feedback-total-question');
    expect(assertions).toBeInTheDocument();
  });

  it('Testa se o Score aparece na página', () => {
    renderWithRouterAndRedux(<Feedback />);
    const score = screen.queryByTestId('feedback-total-score');
    expect(score).toBeInTheDocument();
  });
});