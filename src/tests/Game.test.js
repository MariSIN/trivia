import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';

const testIdEmail = 'input-gravatar-email'
const testIdName = 'input-player-name'
const testIdButton = 'btn-play';
const inputEmail = screen.queryByTestId(testIdEmail);
const inputName = screen.queryByTestId(testIdName);
const buttonPlay = screen.queryByTestId(testIdButton);

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
      expect(screen.queryByTestId('correct-answer')).toBeInTheDocument();
      expect(screen.queryAllByTestId(/wrong-answer-0/i)[0]).toBeInTheDocument(); 
    }, { timeout: timeout },
    );

  });

  it('Testa se é renderizado o botão "next"', () => {
    renderWithRouterAndRedux(<App />);
    const buttonNext = screen.queryByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument;
  });
});
