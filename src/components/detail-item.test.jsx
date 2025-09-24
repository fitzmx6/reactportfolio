import React from 'react';
import { render, screen } from '@testing-library/react';
import DetailItemContent from './detail-item';

/* global describe, test, expect */

const mockProps = {
  location: { pathname: '/dev/jj' }
};

describe('DetailItemContent Component', () => {
  test('renders detail item for dev category', () => {
    render(<DetailItemContent {...mockProps} />);

    expect(screen.getByText('J&J')).toBeInTheDocument();
  });

  test('renders description when available', () => {
    render(<DetailItemContent {...mockProps} />);

    expect(screen.getByText(/Software Tech Lead/)).toBeInTheDocument();
    expect(screen.getByText(/J&J MedTech division/)).toBeInTheDocument();
  });

  test('renders images from subContent', () => {
    const { container } = render(<DetailItemContent {...mockProps} />);

    const images = container.querySelectorAll('img');
    expect(images.length).toBeGreaterThan(0);

    images.forEach(img => {
      expect(img).toHaveAttribute('src');
      expect(img).toHaveAttribute('alt');
    });
  });

  test('renders link when subContent has link property', () => {
    const propsWithLink = {
      location: { pathname: '/dev/evans-open' }
    };

    render(<DetailItemContent {...propsWithLink} />);

    const linkElement = screen.getByText(/Visit The Site/);
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', 'http://www.evansopen.com/');
    expect(linkElement.closest('a')).toHaveAttribute('target', '_blank');
    expect(linkElement.closest('a')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  test('renders title as link when subContent has link', () => {
    const propsWithLink = {
      location: { pathname: '/dev/evans-open' }
    };

    render(<DetailItemContent {...propsWithLink} />);

    const titleLink = screen.getByRole('heading', { level: 2 }).querySelector('a');
    expect(titleLink).toBeInTheDocument();
    expect(titleLink).toHaveAttribute('href', 'http://www.evansopen.com/');
  });

  test('renders title without link when no link in subContent', () => {
    render(<DetailItemContent {...mockProps} />);

    const heading = screen.getByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();
    expect(heading.querySelector('a')).toBeNull();
  });

  test('renders video when videoLink is present', () => {
    const propsWithVideo = {
      location: { pathname: '/design/washed-away' }
    };

    render(<DetailItemContent {...propsWithVideo} />);

    const video = screen.getByText(/This web browser does not support HTML5/);
    expect(video.closest('video')).toBeInTheDocument();
    expect(video.closest('video')).toHaveAttribute('preload', 'true');
    expect(video.closest('video')).toHaveAttribute('controls');
  });

  test('has correct container structure', () => {
    const { container } = render(<DetailItemContent {...mockProps} />);

    expect(container.querySelector('#sub-content')).toBeInTheDocument();
    expect(container.querySelector('.grid-d-12')).toBeInTheDocument();
    expect(container.querySelector('.images')).toBeInTheDocument();
  });

  test('finds correct item from different categories', () => {
    const designProps = {
      location: { pathname: '/design/washed-away' }
    };

    render(<DetailItemContent {...designProps} />);

    expect(screen.getByText('Washed Away')).toBeInTheDocument();
  });

  test('finds correct item from photo category', () => {
    const photoProps = {
      location: { pathname: '/photo/garden' }
    };

    render(<DetailItemContent {...photoProps} />);

    expect(screen.getByText('Garden')).toBeInTheDocument();
  });

  test('renders HTML content safely with dangerouslySetInnerHTML', () => {
    const propsWithHtml = {
      location: { pathname: '/dev/google-fitbit' }
    };

    render(<DetailItemContent {...propsWithHtml} />);

    expect(screen.getByText(/Core Tools team at Google \+ Fitbit/)).toBeInTheDocument();
  });

  test('parses path correctly to find category and item', () => {
    const complexPath = {
      location: { pathname: '/dev/marsh-mcLennan-agency' }
    };

    render(<DetailItemContent {...complexPath} />);

    expect(screen.getByText('Marsh & McLennan Agency')).toBeInTheDocument();
  });

  test('handles items without description', () => {
    const propsNoDesc = {
      location: { pathname: '/dev/earx' }
    };

    render(<DetailItemContent {...propsNoDesc} />);

    expect(screen.getByText('EARX')).toBeInTheDocument();
  });

  test('video sources have correct attributes', () => {
    const propsWithVideo = {
      location: { pathname: '/design/washed-away' }
    };

    const { container } = render(<DetailItemContent {...propsWithVideo} />);

    const webmSource = container.querySelector('source[type*="webm"]');
    const mp4Source = container.querySelector('source[type*="mp4"]');

    expect(webmSource).toHaveAttribute('src', '/videos/washed_away_small.webm');
    expect(mp4Source).toHaveAttribute('src', '/videos/washed_away_small.mp4');
  });
});