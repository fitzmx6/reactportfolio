import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from './not-found';

/* global describe, test, expect, beforeEach */

// Mock document.body to handle className manipulation
const mockBody = {
  className: '',
  classList: {
    remove: jest.fn()
  }
};

// Override global document for these tests
global.document = {
  ...global.document,
  body: mockBody
};

describe('NotFound Component', () => {
  beforeEach(() => {
    // Arrange - Reset mocks before each test
    mockBody.className = '';
    mockBody.classList.remove.mockClear();
  });

  test('renders 404 heading', () => {
    // Arrange & Act
    render(<NotFound />);

    // Assert
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  test('renders Killroy message with link', () => {
    // Arrange & Act
    render(<NotFound />);

    // Assert
    const killroyText = screen.getByText(/Killroy/);
    expect(killroyText).toBeInTheDocument();

    const killroyLink = screen.getByRole('link', { name: 'Killroy' });
    expect(killroyLink).toHaveAttribute('href', 'https://en.wikipedia.org/wiki/Kilroy_was_here');
  });

  test('renders Killroy image', () => {
    // Arrange & Act
    render(<NotFound />);

    // Assert
    const killroyImage = screen.getByAltText('Killroy');
    expect(killroyImage).toBeInTheDocument();
    expect(killroyImage).toHaveAttribute('src', '/images/killroy.svg');
  });

  test('component mounts and unmounts without errors', () => {
    const { unmount } = render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();

    unmount();
  });

  test('has correct container structure', () => {
    // Arrange & Act
    const { container } = render(<NotFound />);

    // Assert
    expect(container.querySelector('#not-found')).toBeInTheDocument();
  });

  test('renders complete error message', () => {
    // Arrange & Act
    render(<NotFound />);

    // Assert
    expect(screen.getByText(/didn't find a page either/)).toBeInTheDocument();
  });

  test('heading hierarchy is correct', () => {
    // Arrange & Act
    render(<NotFound />);

    // Assert
    const h2 = screen.getByRole('heading', { level: 2 });
    const h3 = screen.getByRole('heading', { level: 3 });

    expect(h2).toHaveTextContent('404');
    expect(h3).toHaveTextContent(/Killroy/);
  });

});