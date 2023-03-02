import { httpTerminator, server } from '../index';
import { winstonLogger } from '../winston/logger';

class ExitHandler {
    public async handleExit(code: number, timeout = 5000): Promise<void> {
        try {
            winstonLogger.error(`Attempting a graceful shutdown with code ${code}`);

            setTimeout(() => {
                winstonLogger.error(`Forcing a shutdown with code ${code}`);
                process.exit(code);
            }, timeout).unref();

            if (server.listening) {
                winstonLogger.error('Terminating HTTP connections');
                await httpTerminator.terminate();
            }

            winstonLogger.error(`Exiting gracefully with code ${code}`);
            process.exit(code);
        } catch (error) {
            winstonLogger.error('Error shutting down gracefully');
            winstonLogger.error(error);
            winstonLogger.error(`Forcing exit with code ${code}`);
            process.exit(code);
        }
    }
}

export const exitHandler = new ExitHandler();
