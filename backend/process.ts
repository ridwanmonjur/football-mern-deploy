import { errorHandler } from './exceptions/ErrorHandler';
import { exitHandler } from './exceptions/ExitHandler';

process.on('unhandledRejection', (reason: Error | any) => {
  throw new Error(reason.message || reason);
});

process.on('uncaughtException', (error: Error) => {
  errorHandler.handleError(error);
});

process.on('SIGTERM', () => {
  console.log(`Process ${process.pid} received SIGTERM: Exiting with code 0`);
  exitHandler.handleExit(0);
});

process.on('SIGINT', () => {
  console.log(`Process ${process.pid} received SIGINT: Exiting with code 0`);
  exitHandler.handleExit(0);
});
