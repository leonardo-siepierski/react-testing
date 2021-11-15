import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente PokemonDetails', () => {
  test('Testa se aparecem as informações detalhadas', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const { id, name } = pokemon;
    const details = screen.getByRole('link', { name: /more details/i });

    history.push(`pokemons/${id}`);

    const title = screen.getByRole('heading', { name: `${name} Details` });
    expect(title).toBeInTheDocument();

    expect(details).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', { name: /summary/i });
    expect(summary).toBeInTheDocument();

    const text = screen.getByText(
      /this intelligent Pokémon roasts hard berries with electricity to make/i,
    );
    expect(text).toBeInTheDocument();
  });

  test('Testa se aparecem os elementos de localização do pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const { id, name, foundAt } = pokemon;
    history.push(`/pokemons/${id}`);

    const title = screen.getByRole('heading', { name: /game locations of pikachu/i });
    expect(title).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      expect(screen.getByText(location)).toBeInTheDocument();
      const images = screen.getAllByAltText(`${name} location`);
      expect(images[index]).toHaveAttribute('src', map);
    });
  });

  test('Testa se é possível favoritar um pokémon na página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const pokemon = pokemons[0];
    const { id, name } = pokemon;
    history.push(`/pokemons/${id}`);

    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const star = screen.getByRole('img', { name: `${name} is marked as favorite` });
    expect(star).toBeInTheDocument();

    userEvent.click(favorite);

    expect(star).not.toBeInTheDocument();
  });
});
