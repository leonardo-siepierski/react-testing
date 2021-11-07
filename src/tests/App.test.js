import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testando os links de navegação', () => {
  test('Testa se o documento possui o link home', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });

  test('Testa se o documento possui o link about', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /about/i });
    expect(linkHome).toBeInTheDocument();
  });

  test('Testa se o documento possui o link favorite pokemons', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkHome).toBeInTheDocument();
  });
});

describe('Testa redirecionamento dos links de navegação', () => {
  test('Testa home', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    expect(history.location.pathname).toBe('/');
  });

  test('Testa about', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    expect(history.location.pathname).toBe('/about');
  });

  test('Testa favorites', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    expect(history.location.pathname).toBe('/favorites');
  });

  test('Testa pagina desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/not-found');
    const notFound = screen
      .getByRole('heading', { level: 2, name: /page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
});
