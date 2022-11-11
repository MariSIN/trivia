import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App.js';
import { act } from 'react-dom/test-utils';
import HeaderUser from '../components/HeaderUser';

describe('Testa a page <Feedback />', () => {
  it('Testa se a página tem a rota correta', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    const { pathname } = history.location;
    expect(pathname).toBe('/feedback');
  });

  it('Testa se existe um elemento onde é retornado o feedback', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => history.push('/feedback'));
    const feedbackText = screen.queryByTestId('feedback-text');
    expect(feedbackText).toBeInTheDocument();
  });
});
