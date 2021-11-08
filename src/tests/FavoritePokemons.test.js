import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa favorites', () => {
  test('Testa se o texto aparece caso não haja pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const noFavorites = screen
      .getByText(/no favorite pokemon found/i);
    expect(noFavorites).toBeInTheDocument();
  });
});
