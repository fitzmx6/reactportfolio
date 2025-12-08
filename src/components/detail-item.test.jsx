import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import DetailItemContent from './detail-item';

/* global describe, test, expect */

const renderWithRouter = (path) => {
  return render(
    <MemoryRouter initialEntries={[path]} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/:category/:item" element={<DetailItemContent />} />
      </Routes>
    </MemoryRouter>
  );
};

describe('DetailItemContent Component', () => {
  test('renders detail item for dev category', () => {
    renderWithRouter('/dev/jj');

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });

  test('renders description when available', () => {
    renderWithRouter('/dev/jj');

    expect(screen.getByText(/Software Tech Lead/)).toBeInTheDocument();
    expect(screen.getByText(/J&J MedTech division/)).toBeInTheDocument();
  });

  test('renders images from subContent', () => {
    const { container } = renderWithRouter('/dev/jj');

    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);

    images.forEach(img => {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });
  });

  test('renders title as plain text', () => {
    renderWithRouter('/dev/jj');

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.textContent).toBe('J&J');
  });

  test('renders video when videoLink is present', () => {
    renderWithRouter('/design/washed-away');

    const video = screen.getByText(/This web browser does not support HTML5/);
    expect(video.closest('video')).toBeInTheDocument();
    expect(video.closest('video')).toHaveAttribute('preload', 'true');
    expect(video.closest('video')).toHaveAttribute('controls');
  });

  test('has correct container structure', () => {
    const { container } = renderWithRouter('/dev/jj');

    expect(container.querySelector('#sub-content')).toBeInTheDocument();
    expect(container.querySelector('.grid-d-12')).toBeInTheDocument();
    expect(container.querySelector('.images')).toBeInTheDocument();
  });

  test('finds correct item from different categories', () => {
    renderWithRouter('/design/washed-away');

    expect(screen.getByText('Washed Away')).toBeInTheDocument();
  });

  test('finds correct item from photo category', () => {
    renderWithRouter('/photo/garden');

    expect(screen.getByText('Garden')).toBeInTheDocument();
  });

  test('renders HTML content safely with dangerouslySetInnerHTML', () => {
    renderWithRouter('/dev/google-fitbit');

    expect(screen.getByText(/Core Tools team at Google \+ Fitbit/)).toBeInTheDocument();
  });

  test('parses path correctly to find category and item', () => {
    renderWithRouter('/dev/marsh-mcLennan-agency');

    expect(screen.getByText('Marsh & McLennan Agency')).toBeInTheDocument();
  });

  test('handles items without description', () => {
    renderWithRouter('/dev/earx');

    expect(screen.getByText('EARX')).toBeInTheDocument();
  });

  test('video sources have correct attributes', () => {
    const { container } = renderWithRouter('/design/washed-away');

    const webmSource = container.querySelector('source[type*="webm"]');
    const mp4Source = container.querySelector('source[type*="mp4"]');

    expect(webmSource).toHaveAttribute('src', '/videos/washed_away_small.webm');
    expect(mp4Source).toHaveAttribute('src', '/videos/washed_away_small.mp4');
  });

  test('shows "Item not found" when category does not exist', () => {
    renderWithRouter('/invalid-category/some-item');

    expect(screen.getByText('Item not found')).toBeInTheDocument();
  });

  test('shows "Item not found" when item does not exist in valid category', () => {
    renderWithRouter('/dev/non-existent-item');

    expect(screen.getByText('Item not found')).toBeInTheDocument();
  });
});