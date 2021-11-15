import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Testa o componente Pokemon', () => {
  test('Testa o card', () => {
    renderWithRouter(<App />);

    const pokémon = pokemons[0];
    const { name, type, averageWeight, image } = pokémon;

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByRole('img', { name: `${name} sprite` });

    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${averageWeight.value} ${averageWeight.measurementUnit}`,
    );
    expect(pokemonImage).toHaveAttribute('src', image);
  });

  test('Testa os detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokémon = pokemons[0];
    const { id } = pokémon;

    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toHaveAttribute('href', `/pokemons/${id}`);

    userEvent.click(details);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Checa o ícone de estrela nos pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const pokémon = pokemons[0];
    const { name } = pokémon;
    history.push('/pokemons/25');

    const favoriteBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(favoriteBox);

    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);

    const star = screen.getByAltText(`${name} is marked as favorite`);
    expect(star).toHaveAttribute('src', '/star-icon.svg');
  });
});
