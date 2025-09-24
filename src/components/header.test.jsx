import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from './header';

/* global describe, test, expect, beforeEach */

const renderHeaderWithRouter = () => {
  return render(
    <MemoryRouter>
      <Header />
    </MemoryRouter>
  );
};

describe('Header Component', () => {
  test('renders logo with correct text', () => {
    renderHeaderWithRouter();

    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
  });

  test('renders all navigation links', () => {
    renderHeaderWithRouter();

    expect(screen.getByRole('link', { name: 'Dev' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Design' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Photo' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'About' })).toBeInTheDocument();
  });

  test('navigation links have correct href attributes', () => {
    renderHeaderWithRouter();

    expect(screen.getByRole('link', { name: 'Dev' })).toHaveAttribute('href', '/dev');
    expect(screen.getByRole('link', { name: 'Design' })).toHaveAttribute('href', '/design');
    expect(screen.getByRole('link', { name: 'Photo' })).toHaveAttribute('href', '/photo');
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  test('logo link has correct href attribute', () => {
    renderHeaderWithRouter();

    expect(screen.getByRole('link', { name: 'Cory Fitzpatrick | Software Tech Lead' })).toHaveAttribute('href', '/dev');
  });

  test('mobile navigation toggle works', () => {
    const { container } = renderHeaderWithRouter();

    const mobileNavLink = container.querySelector('.mobile-nav-link');
    const header = container.querySelector('header');

    expect(header).not.toHaveClass('open-nav');

    fireEvent.click(mobileNavLink);
    expect(header).toHaveClass('open-nav');

    fireEvent.click(mobileNavLink);
    expect(header).not.toHaveClass('open-nav');
  });

  test('navigation links close mobile nav when clicked', () => {
    const { container } = renderHeaderWithRouter();

    const mobileNavLink = container.querySelector('.mobile-nav-link');
    const devLink = screen.getByRole('link', { name: 'Dev' });
    const header = container.querySelector('header');

    fireEvent.click(mobileNavLink);
    expect(header).toHaveClass('open-nav');

    fireEvent.click(devLink);
    expect(header).not.toHaveClass('open-nav');
  });

  test('logo link closes mobile nav when clicked', () => {
    const { container } = renderHeaderWithRouter();

    const mobileNavLink = container.querySelector('.mobile-nav-link');
    const logoLink = screen.getByRole('link', { name: 'Cory Fitzpatrick | Software Tech Lead' });
    const header = container.querySelector('header');

    fireEvent.click(mobileNavLink);
    expect(header).toHaveClass('open-nav');

    fireEvent.click(logoLink);
    expect(header).not.toHaveClass('open-nav');
  });

  test('header has correct structure', () => {
    const { container } = renderHeaderWithRouter();

    expect(container.querySelector('header')).toBeInTheDocument();
    expect(container.querySelector('.grid-d-12')).toBeInTheDocument();
    expect(container.querySelector('.top-header')).toBeInTheDocument();
    expect(container.querySelector('#logo')).toBeInTheDocument();
    expect(container.querySelector('.mobile-nav-link')).toBeInTheDocument();
    expect(container.querySelector('nav')).toBeInTheDocument();
    expect(container.querySelector('nav ul')).toBeInTheDocument();
  });

  test('initial state has mobile nav closed', () => {
    const { container } = renderHeaderWithRouter();
    const header = container.querySelector('header');

    expect(header).not.toHaveClass('open-nav');
  });

  test('mobile nav link is clickable', () => {
    const { container } = renderHeaderWithRouter();
    const mobileNavLink = container.querySelector('.mobile-nav-link');

    expect(mobileNavLink).toBeInTheDocument();
    fireEvent.click(mobileNavLink);
  });
});