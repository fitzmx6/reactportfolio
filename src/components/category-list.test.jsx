import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CategoryList from './category-list';

/* global describe, test, expect, beforeEach */

const mockProps = {
  location: { pathname: '/dev' },
  navToggle: jest.fn()
};

const renderCategoryListWithRouter = (props = mockProps) => {
  return render(
    <MemoryRouter>
      <CategoryList {...props} />
    </MemoryRouter>
  );
};

describe('CategoryList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dev category items', () => {
    renderCategoryListWithRouter({ location: { pathname: '/dev' } });

    expect(screen.getByText('J&J')).toBeInTheDocument();
    expect(screen.getByText('Google + Fitbit')).toBeInTheDocument();
    expect(screen.getByText('Cramer')).toBeInTheDocument();
    expect(screen.getByText('EARX')).toBeInTheDocument();
  });

  test('renders design category items', () => {
    renderCategoryListWithRouter({ location: { pathname: '/design' } });

    expect(screen.getByText('Washed Away')).toBeInTheDocument();
    expect(screen.getByText('More Than Design')).toBeInTheDocument();
    expect(screen.getByText('Peoples Inc.')).toBeInTheDocument();
    expect(screen.getByText('Swiss Style')).toBeInTheDocument();
  });

  test('renders photo category items', () => {
    renderCategoryListWithRouter({ location: { pathname: '/photo' } });

    expect(screen.getByText('Garden')).toBeInTheDocument();
    expect(screen.getByText('Hoops')).toBeInTheDocument();
    expect(screen.getByText('Pinhole 1')).toBeInTheDocument();
    expect(screen.getByText('Silence')).toBeInTheDocument();
  });

  test('falls back to web category for unknown paths', () => {
    renderCategoryListWithRouter({ location: { pathname: '/unknown' } });

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });

  test('renders correct number of items for each category', () => {
    const { rerender } = renderCategoryListWithRouter({ location: { pathname: '/dev' } });
    let items = screen.getAllByRole('link');
    expect(items.length).toBeGreaterThan(10);

    rerender(
      <MemoryRouter>
        <CategoryList location={{ pathname: '/design' }} />
      </MemoryRouter>
    );
    items = screen.getAllByRole('link');
    expect(items.length).toBe(6);

    rerender(
      <MemoryRouter>
        <CategoryList location={{ pathname: '/photo' }} />
      </MemoryRouter>
    );
    items = screen.getAllByRole('link');
    expect(items.length).toBe(12);
  });

  test('each item has correct link structure', () => {
    renderCategoryListWithRouter({ location: { pathname: '/dev' } });

    const firstItem = screen.getByText('J&J');
    const link = firstItem.closest('a');

    expect(link).toHaveAttribute('href', '/dev/jj');
  });

  test('renders images with correct attributes', () => {
    renderCategoryListWithRouter({ location: { pathname: '/dev' } });

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    images.forEach(img => {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });
  });

  test('renders figcaptions with View text', () => {
    renderCategoryListWithRouter({ location: { pathname: '/dev' } });

    const viewTexts = screen.getAllByText('View');
    expect(viewTexts.length).toBeGreaterThan(0);
  });

  test('has correct container structure', () => {
    const { container } = renderCategoryListWithRouter();

    expect(container.querySelector('#content')).toBeInTheDocument();
    expect(container.querySelector('.grid-panel')).toBeInTheDocument();
    expect(container.querySelector('figure')).toBeInTheDocument();
    expect(container.querySelector('figcaption')).toBeInTheDocument();
  });

  test('handles missing navToggle prop gracefully', () => {
    renderCategoryListWithRouter({ location: { pathname: '/dev' } });

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  test('grid classes are applied correctly', () => {
    const { container } = renderCategoryListWithRouter();

    const gridPanels = container.querySelectorAll('.grid-d-4.grid-t-6.grid-panel');
    expect(gridPanels.length).toBeGreaterThan(0);
  });

  test('processes pathname correctly', () => {
    renderCategoryListWithRouter({ location: { pathname: '/dev/' } });

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });
});