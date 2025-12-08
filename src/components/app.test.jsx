import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App, { AppContent } from './app';

/* global describe, test, expect, beforeEach */

Object.defineProperty(window, 'scrollTo', {
  value: jest.fn(),
  writable: true
});

// Mock scrollIntoView for chatbot component
Element.prototype.scrollIntoView = jest.fn();

const renderAppWithRouter = (initialEntries = ['/']) => {
  return render(
    <MemoryRouter initialEntries={initialEntries} future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <AppContent />
    </MemoryRouter>
  );
};

describe('App Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders header component', () => {
    const { container } = renderAppWithRouter();

    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    // Check header nav links specifically
    const header = container.querySelector('header');
    expect(header).toHaveTextContent('Dev');
    expect(header).toHaveTextContent('Design');
    expect(header).toHaveTextContent('Photo');
  });

  test('renders footer component', () => {
    renderAppWithRouter();

    expect(screen.getByText('Email: coryartfitz@gmail.com')).toBeInTheDocument();
    expect(screen.getByText('Cory Fitzpatrick')).toBeInTheDocument();
    expect(screen.getByText(`Copyright © ${new Date().getFullYear()}`)).toBeInTheDocument();
  });

  test('processes pathname correctly', () => {
    renderAppWithRouter(['/dev/']);
    expect(screen.getByText('J&J')).toBeInTheDocument();
  });

  test('scrolls to hash element', async () => {
    // Mock scrollIntoView
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    // Create a dummy element to scroll to
    const div = document.createElement('div');
    div.id = 'test-hash';
    document.body.appendChild(div);

    renderAppWithRouter(['/#test-hash']);

    // Wait for the effect to run (it has a timeout)
    await new Promise(resolve => setTimeout(resolve, 200));

    expect(scrollIntoViewMock).toHaveBeenCalledWith({ behavior: 'smooth' });

    // Cleanup
    document.body.removeChild(div);
  });

  test('handles hash element that does not exist', async () => {
    // Mock scrollIntoView
    const scrollIntoViewMock = jest.fn();
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;

    renderAppWithRouter(['/#non-existent-hash']);

    // Wait for the effect to run (it has a timeout)
    await new Promise(resolve => setTimeout(resolve, 200));

    // scrollIntoView should NOT be called if element doesn't exist
    expect(scrollIntoViewMock).not.toHaveBeenCalled();
  });

  test('renders chatbot page at root path', () => {
    renderAppWithRouter(['/']);

    expect(screen.getByText(/Ask me about Cory's skills and experience/i)).toBeInTheDocument();
  });

  test('redirects /web path to root (chatbot page)', () => {
    renderAppWithRouter(['/web']);

    expect(screen.getByText(/Ask me about Cory's skills and experience/i)).toBeInTheDocument();
  });

  test('renders dev category page', () => {
    const { container } = renderAppWithRouter(['/dev']);

    // Dev page should have grid panels for portfolio items
    const gridPanels = container.querySelectorAll('.grid-panel');
    expect(gridPanels.length).toBeGreaterThan(0);
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

    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
  });

  test('renders 404 page for unknown routes', () => {
    renderAppWithRouter(['/unknown-route']);

    expect(screen.getByText('Cory Fitzpatrick | Software Tech Lead')).toBeInTheDocument();
    expect(screen.getByText('Email: coryartfitz@gmail.com')).toBeInTheDocument();
  });

  test('App component renders without crashing', () => {
    // Act & Assert - if component mounts without errors, test passes
    render(<App />);
    expect(screen.getByRole('banner')).toBeInTheDocument(); // Header is rendered
  });

  test('generates correct routes for all portfolio items', () => {
    // Arrange & Act
    const { container } = renderAppWithRouter(['/dev/jj']);

    // Assert
    expect(container.textContent).toContain('J&J');
  });
});