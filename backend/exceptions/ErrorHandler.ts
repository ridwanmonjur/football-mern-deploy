import { StatusCodes } from "http-status-codes";
import { Response } from 'express';
import { APIError, BaseError } from './AppError';
import { exitHandler } from "./ExitHandler";
import { winstonLogger } from "../winston/logger";
import * as dotenv from "dotenv";
dotenv.config({ path: __dirname + "/config.env" });

class ErrorHandler {
  public handleError(error: Error | BaseError, response?: Response): void {
    if (this.isTrustedError(error) && response) {
      this.handleTrustedError(error as BaseError, response);
    } else {
      this.handleUntrustedError(error, response);
    }
  }

  public isTrustedError(error: Error): boolean {
    if (error instanceof BaseError) {
      return error.isOperational;
    }
  }

    private handleTrustedError(error: BaseError, response: Response): void {
    response.status(error.httpCode).json({ success: false, error, message: error.description });
  }

  private handleUntrustedError(error: Error, response?: Response): void {
    if (response) {
      response.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success: false, error, message: error.message || "Internal server error" });
    }
    winstonLogger.error('Application encountered an untrusted error.');
    winstonLogger.error(error);
    if (!process.env.DEVELOPMENT) exitHandler.handleExit(1);
  }
}

export const errorHandler = new ErrorHandler();
