import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o component Not Found', () => {
  test('Testa o header h2', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const notFoundHeading = screen
      .getByRole('heading', { level: 2, name: /page requested not found crying emoji/i });
    expect(notFoundHeading).toBeInTheDocument();
  });

  test('Testa se aparece o gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const gif = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(gif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
