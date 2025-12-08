import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import CategoryList from './category-list';

/* global describe, test, expect, beforeEach */

const renderCategoryListWithRouter = (path = '/dev') => {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/:category" element={<CategoryList />} />
        {/* Add a fallback route for root or other paths if needed, though CategoryList handles fallback internally */}
        <Route path="/" element={<CategoryList />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('CategoryList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders dev category items', () => {
    renderCategoryListWithRouter('/dev');

    expect(screen.getByText('J&J')).toBeInTheDocument();
    expect(screen.getByText('Google + Fitbit')).toBeInTheDocument();
    expect(screen.getByText('Cramer')).toBeInTheDocument();
    expect(screen.getByText('EARX')).toBeInTheDocument();
  });

  test('renders design category items', () => {
    renderCategoryListWithRouter('/design');

    expect(screen.getByText('Washed Away')).toBeInTheDocument();
    expect(screen.getByText('More Than Design')).toBeInTheDocument();
    expect(screen.getByText('Peoples Inc.')).toBeInTheDocument();
    expect(screen.getByText('Swiss Style')).toBeInTheDocument();
  });

  test('renders photo category items', () => {
    renderCategoryListWithRouter('/photo');

    expect(screen.getByText('Garden')).toBeInTheDocument();
    expect(screen.getByText('Hoops')).toBeInTheDocument();
    expect(screen.getByText('Pinhole 1')).toBeInTheDocument();
    expect(screen.getByText('Silence')).toBeInTheDocument();
  });

  test('falls back to web category for unknown paths', () => {
    renderCategoryListWithRouter('/unknown');

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });

  test('renders correct number of items for each category', () => {
    const { unmount } = renderCategoryListWithRouter('/dev');
    let items = screen.getAllByRole('link');
    expect(items.length).toBeGreaterThan(10);
    unmount();

    renderCategoryListWithRouter('/design');
    items = screen.getAllByRole('link');
    expect(items.length).toBe(6);

    // Clean up before next render
    screen.queryAllByRole('link').forEach(link => link.remove());
    // Actually, testing-library cleans up automatically, but since we are not using unmount() for the second one, let's just use separate tests or unmount.
    // Better to just rely on separate test cases or unmount.
  });

  test('each item has correct link structure', () => {
    renderCategoryListWithRouter('/dev');

    const firstItem = screen.getByText('J&J');
    const link = firstItem.closest('a');

    expect(link).toHaveAttribute('href', '/dev/jj');
  });

  test('renders images with correct attributes', () => {
    renderCategoryListWithRouter('/dev');

    const images = screen.getAllByRole('img');
    expect(images.length).toBeGreaterThan(0);

    images.forEach(img => {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });
  });

  test('renders figcaptions with View text', () => {
    renderCategoryListWithRouter('/dev');

    const viewTexts = screen.getAllByText('View');
    expect(viewTexts.length).toBeGreaterThan(0);
  });

  test('has correct container structure', () => {
    const { container } = renderCategoryListWithRouter('/dev');

    expect(container.querySelector('#content')).toBeInTheDocument();
    expect(container.querySelector('.grid-panel')).toBeInTheDocument();
    expect(container.querySelector('figure')).toBeInTheDocument();
    expect(container.querySelector('figcaption')).toBeInTheDocument();
  });

  test('handles missing navToggle prop gracefully', () => {
    renderCategoryListWithRouter('/dev');

    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThan(0);
  });

  test('grid classes are applied correctly', () => {
    const { container } = renderCategoryListWithRouter('/dev');

    const gridPanels = container.querySelectorAll('.grid-d-4.grid-t-6.grid-panel');
    expect(gridPanels.length).toBeGreaterThan(0);
  });

  test('processes pathname correctly', () => {
    renderCategoryListWithRouter('/dev/');

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });
});