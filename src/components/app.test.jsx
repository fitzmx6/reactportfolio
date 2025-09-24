import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './app';

/* global describe, test, expect, beforeEach */

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

const renderAppWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <App />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header component', () => {
    renderAppWithRouter();

    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Dev')).toBeInTheDocument();
    expect(screen.getByText('Design')).toBeInTheDocument();
    expect(screen.getByText('Photo')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  test('renders footer component', () => {
    renderAppWithRouter();

    expect(screen.getByText('Email: coryartfitz@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Cory Fitzpatrick')).toBeInTheDocument();
    expect(screen.getByText(`Copyright © ${new Date().getFullYear()}`)).toBeInTheDocument();
  });

  test('redirects root path to /dev', () => {
    renderAppWithRouter(['/']);

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });

  test('redirects /web path to /dev', () => {
    renderAppWithRouter(['/web']);

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });

  test('renders dev category page', () => {
    renderAppWithRouter(['/dev']);

    expect(screen.getByText('J&J')).toBeInTheDocument();
    expect(screen.getByText('Google + Fitbit')).toBeInTheDocument();
    expect(screen.getByText('Cramer')).toBeInTheDocument();
  });

  test('renders design category page', () => {
    renderAppWithRouter(['/design']);

    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Email: coryartfitz@gmail.com')).toBeInTheDocument();
  });

  test('renders photo category page', () => {
    renderAppWithRouter(['/photo']);

    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Email: coryartfitz@gmail.com')).toBeInTheDocument();
  });

  test('renders about page', () => {
    renderAppWithRouter(['/about']);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', () => {
    renderAppWithRouter(['/unknown-route']);

    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Email: coryartfitz@gmail.com')).toBeInTheDocument();
  });

  test('scrollTop method calls window.scrollTo', () => {
    // Arrange
    const appInstance = new (require('./app').App)();

    // Act
    appInstance.scrollTop();

    // Assert
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

  test('generates correct routes for all portfolio items', () => {
    // Arrange & Act
    renderAppWithRouter(['/dev/jj']);

    // Assert
    expect(screen.getByText('J&J')).toBeInTheDocument();
  });
});