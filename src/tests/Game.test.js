import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';

describe('Testa a page <Game />', () => {
  it('Testa se é renderizado o botão "next"', () => {
    renderWithRouterAndRedux(<App />);
    const buttonNext = screen.queryByTestId('btn-next');
    expect(buttonNext).toBeInTheDocument;
  });
});
