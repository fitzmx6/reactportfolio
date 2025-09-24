import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

/* global describe, test, expect */

describe('Footer Component', () => {
  test('renders email link with correct attributes', () => {
    const expectedEmail = 'coryartfitz@gmail.com';

    render(<Footer />);

    const emailLink = screen.getByText(`Email: ${expectedEmail}`);
    expect(emailLink).toBeInTheDocument();
    expect(emailLink.closest('a')).toHaveAttribute('href', `mailto:${expectedEmail}`);
  });

  test('renders name', () => {
    const expectedName = 'Cory Fitzpatrick';

    render(<Footer />);

    expect(screen.getByText(expectedName)).toBeInTheDocument();
  });

  test('renders current year in copyright', () => {
    const currentYear = new Date().getFullYear();

    render(<Footer />);

    expect(screen.getByText(`Copyright © ${currentYear}`)).toBeInTheDocument();
  });

  test('has correct footer structure', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('footer')).toBeInTheDocument();
    expect(container.querySelector('.grid-d-12')).toBeInTheDocument();
    expect(container.querySelector('ul')).toBeInTheDocument();
  });

  test('has correct list item IDs', () => {
    const { container } = render(<Footer />);

    expect(container.querySelector('#email')).toBeInTheDocument();
    expect(container.querySelector('#footer-name')).toBeInTheDocument();
    expect(container.querySelector('#copy')).toBeInTheDocument();
  });

  test('renders all list items', () => {
    const { container } = render(<Footer />);

    const listItems = container.querySelectorAll('li');
    expect(listItems).toHaveLength(3);
  });

  test('copyright updates with year change', () => {
    const originalYear = Date.prototype.getFullYear;
    const mockYear = 2025;
    Date.prototype.getFullYear = jest.fn(() => mockYear);

    render(<Footer />);

    expect(screen.getByText(`Copyright © ${mockYear}`)).toBeInTheDocument();

    Date.prototype.getFullYear = originalYear;
  });
});