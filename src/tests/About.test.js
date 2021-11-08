import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente About', () => {
  test('Testa o h2 about pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutHeading = screen
      .getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testa a src da imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  test('Testa os dois parágrafos', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');

    const parag1 = screen
      .getByText(/this application simulates a pokédex/i);
    expect(parag1).toBeInTheDocument();

    const parag2 = screen
      .getByText(/one can filter pokémons by type/i);
    expect(parag2).toBeInTheDocument();
  });
});
