import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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

  test('Testa cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favoritePokemon = screen.getByRole('checkbox', {
      name: /pokémon favoritado\?/i,
    });
    userEvent.click(favoritePokemon);

    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const favorites = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorites);

    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
