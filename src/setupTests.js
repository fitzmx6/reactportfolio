import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Polyfill TextEncoder/TextDecoder for Jest environment
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock the analytics module to avoid import.meta.env issues in tests
jest.mock('./utils/analytics', () => ({
	initGA: jest.fn(),
	trackPageView: jest.fn(),
	trackEvent: jest.fn()
}));

// Mock scrollIntoView for JSDOM
window.HTMLElement.prototype.scrollIntoView = jest.fn();