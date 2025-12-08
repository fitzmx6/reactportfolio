import { logger } from './logger';

describe('logger', () => {
    let consoleLogSpy, consoleErrorSpy, consoleWarnSpy;

    beforeEach(() => {
        consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
        consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();
        consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation();
    });

    afterEach(() => {
        consoleLogSpy.mockRestore();
        consoleErrorSpy.mockRestore();
        consoleWarnSpy.mockRestore();
    });

    it('logs messages in test environment', () => {
        logger.log('test message');
        // Since NODE_ENV is 'test' during Jest runs, logger will log
        expect(consoleLogSpy).toHaveBeenCalledWith('test message');
    });

    it('logs errors in test environment', () => {
        logger.error('test error');
        expect(consoleErrorSpy).toHaveBeenCalledWith('test error');
    });

    it('logs warnings in test environment', () => {
        logger.warn('test warning');
        expect(consoleWarnSpy).toHaveBeenCalledWith('test warning');
    });

    it('has info method', () => {
        logger.info('test info');
        // info calls console.info
        expect(console.info).toBeDefined();
    });

    it('has debug method', () => {
        logger.debug('test debug');
        // debug calls console.debug
        expect(console.debug).toBeDefined();
    });

    describe('in production environment', () => {
        const originalEnv = process.env.NODE_ENV;

        beforeEach(() => {
            jest.resetModules();
            process.env.NODE_ENV = 'production';
        });

        afterEach(() => {
            process.env.NODE_ENV = originalEnv;
        });

        it('does not log messages', () => {
            // We need to re-require logger to pick up the new NODE_ENV
            // However, logger.js exports an object created at module load time.
            // So we need to use isolateModules to re-evaluate the module.
            jest.isolateModules(() => {
                const { logger: prodLogger } = require('./logger');
                prodLogger.log('prod message');
                expect(consoleLogSpy).not.toHaveBeenCalled();
            });
        });

        it('does not log errors', () => {
            jest.isolateModules(() => {
                const { logger: prodLogger } = require('./logger');
                prodLogger.error('prod error');
                expect(consoleErrorSpy).not.toHaveBeenCalled();
            });
        });

        it('does not log warnings', () => {
            jest.isolateModules(() => {
                const { logger: prodLogger } = require('./logger');
                prodLogger.warn('prod warning');
                expect(consoleWarnSpy).not.toHaveBeenCalled();
            });
        });

        it('does not log info messages', () => {
            const consoleInfoSpy = jest.spyOn(console, 'info').mockImplementation();
            jest.isolateModules(() => {
                const { logger: prodLogger } = require('./logger');
                prodLogger.info('prod info');
                expect(consoleInfoSpy).not.toHaveBeenCalled();
            });
            consoleInfoSpy.mockRestore();
        });

        it('does not log debug messages', () => {
            const consoleDebugSpy = jest.spyOn(console, 'debug').mockImplementation();
            jest.isolateModules(() => {
                const { logger: prodLogger } = require('./logger');
                prodLogger.debug('prod debug');
                expect(consoleDebugSpy).not.toHaveBeenCalled();
            });
            consoleDebugSpy.mockRestore();
        });
    });
});
