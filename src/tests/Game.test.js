import React from 'react';
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
  const timeout = 3000;

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
    }, { timeout: timeout },
    );
  });

  it('Testa se a categoria aparece', async () => {
    renderWithRouterAndRedux(<App />); 
    waitFor(() => {
      expect(screen.getByTestId('question-category')).toBeInTheDocument();
    });
  });

  it('Testa se a questão aparece', () => {
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
    }, { timeout: timeout });

    const name = screen.getByTestId('header-player-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Maria');
    
  });

  it('Testa se é renderizado o botão "next"', () => {
    renderWithRouterAndRedux(<App />);
    const buttonNext = screen.queryByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument;
  });
});
