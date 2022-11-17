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
  it.only('Testa se as opções de resposta são renderizadas', async () => {
    
    const initialStateMock = {
      player: {
        name: 'Maria',
        email: 'maria@maria.com',
      }
    }

    renderWithRouterAndRedux(<App />, {
      initialState: initialStateMock,
      initialEntries: ['/game'],
    });    //já passar um pathname, passar name, email, token

    /*const inputEmail = screen.getByTestId(testIdEmail);
    const inputName = screen.getByTestId(testIdName);
    const buttonPlay = screen.getByTestId(testIdButton);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');
    userEvent.click(buttonPlay);*/
    //mockar os estados e passar um estado inicial(ver aula ao vivo)
    const corretAnswer = await screen.findByTestId(testIdCorrectAnswer);
    const wrongAnswer = await screen.findAllByTestId(testidWrongAnswer)[0];

    expect(corretAnswer).toBeInTheDocument();
    expect(wrongAnswer).toBeInTheDocument(); 

  });

  it('Testa se a categoria aparece', async () => {
    renderWithRouterAndRedux(<App />); 

    expect( await screen.findByTestId('question-category')).toBeInTheDocument();
  });

  it('Testa se a questão aparece', async () => {
    renderWithRouterAndRedux(<App />);

    expect( await screen.findByTestId('question-text')).toBeInTheDocument();

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


    const img = await screen.findByTestId('header-profile-picture');
    
    expect(img).toBeInTheDocument();

    const name =  await screen.findByTestId('header-player-name');
    expect(name).toBeInTheDocument();
    expect(name).toHaveTextContent('Maria'); 
  });

  it('Testa se é renderizado o botão "next"', async () => {
    renderWithRouterAndRedux(<App />);
    const buttonNext = await screen.findByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument;
  });

  it('Testa se receber um token inválido muda para a tela inicial', () => {

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


    const { pathname } = history.location;
    expect(pathname).toBe('/game');

  });

  it('Testa se o valor dos pontos mudam se acertar a questão', async () => {
    renderWithRouterAndRedux(<App />);

    const inputEmail = screen.queryByTestId(testIdEmail);
    const inputName = screen.queryByTestId(testIdName);
    const buttonPlay = screen.queryByTestId(testIdButton);

    userEvent.type(inputEmail, 'nome@nome.com');
    userEvent.type(inputName, 'Maria');
    userEvent.click(buttonPlay);


    expect( await screen.findByTestId('question-category')).toBeInTheDocument(), 
 

    userEvent.click( await screen.findByTestId('correct-answer'));
    
    expect( await screen.findByTestId('header-score')).toHaveTextContent('10');

  });
});
