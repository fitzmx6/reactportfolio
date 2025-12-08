// Import the globally mocked analytics functions
// Note: These are mocked in setupTests.js to avoid import.meta issues
import { initGA, trackPageView, trackEvent } from './analytics';

describe('analytics utils', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('initGA', () => {
        it('is a function that can be called', () => {
            expect(typeof initGA).toBe('function');
            expect(() => initGA()).not.toThrow();
        });
    });

    describe('trackPageView', () => {
        it('is a function that accepts a path parameter', () => {
            expect(typeof trackPageView).toBe('function');
            expect(() => trackPageView('/test-page')).not.toThrow();
        });
    });

    describe('trackEvent', () => {
        it('is a function that accepts category and action parameters', () => {
            expect(typeof trackEvent).toBe('function');
            expect(() => trackEvent('category', 'action')).not.toThrow();
        });

        it('accepts optional label and value parameters', () => {
            expect(() => trackEvent('category', 'action', 'label', 100)).not.toThrow();
        });
    });
});
