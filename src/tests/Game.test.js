import React from 'react';
import '@testing-library/jest-dom';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';


const testIdEmail = 'input-gravatar-email'
const testIdName = 'input-player-name'
const testIdButton = 'btn-play';
const testIdCorrectAnswer = 'correct-answer';
const testidWrongAnswer = /wrong-answer-0/i;

describe('Testa a page <Game />', () => {
  jest.setTimeout(60000);

  it('Testa se as opções de resposta são renderizadas', async () => {
    renderWithRouterAndRedux(<App />);    

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputName = screen.getByTestId(testIdName);
    const buttonPlay = screen.getByTestId(testIdButton);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');
    userEvent.click(buttonPlay);

    await waitFor(() => { 
      expect(screen.queryByTestId(testIdCorrectAnswer)).toBeInTheDocument();
      expect(screen.queryAllByTestId(testidWrongAnswer)[0]).toBeInTheDocument(); 
    }, { timeout: 3000 },
    );
  });

  it('Testa se a categoria aparece', async () => {
    renderWithRouterAndRedux(<App />); 
    waitFor(() => {
      expect(screen.getByTestId('question-category')).toBeInTheDocument();
    });
  });

  it('Testa se a questão aparece', async () => {
    renderWithRouterAndRedux(<App />);
    waitFor(() => {
      expect(screen.getByTestId('question-text')).toBeInTheDocument();
    });
  });

  it('Testa se as informações do jogador aparecem na tela', async () => {

    localStorage.setItem('token', '	123456asdfgq');

    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token: '123456asdfg' }),
    });
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputName = screen.getByTestId(testIdName);
    const buttonPlay = screen.getByTestId(testIdButton);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');
    userEvent.click(buttonPlay);

    await waitFor(() => {
      const img = screen.getByTestId('header-profile-picture');
      expect(img).toBeInTheDocument();
    }, 3000);

    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Maria'); 
  });

  it('Testa se é renderizado o botão "next"', () => {
    renderWithRouterAndRedux(<App />);
    const buttonNext = screen.queryByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument;
  });

  it('Testa se receber um token inválido muda para a tela inicial', async () => {

    localStorage.setItem('token', '');
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue({ token: 'adsadsad' }),
    });

    const {history} = renderWithRouterAndRedux(<App />);

    const inputEmail = screen.getByTestId(testIdEmail);
    const inputName = screen.getByTestId(testIdName);
    const buttonPlay = screen.getByTestId(testIdButton);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');
    userEvent.click(buttonPlay);

    await waitFor(() => {
      const { pathname } = history.location;
      expect(pathname).toBe('/game');
    }, { timeout: timeout });
  });

  it('Testa se o valor dos pontos mudam se acertar a questão', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.queryByTestId(testIdEmail);
    const inputName = screen.queryByTestId(testIdName);
    const buttonPlay = screen.queryByTestId(testIdButton);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');
    userEvent.click(buttonPlay);

    await waitFor(() => 
    expect(screen.getByTestId('question-category')).toBeInTheDocument(), 
    { timeout: 5000 });

    userEvent.click(screen.getByTestId('correct-answer'));
    
    expect(screen.getByTestId('header-score')).toHaveTextContent('10');

  });
});
