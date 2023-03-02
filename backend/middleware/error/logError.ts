import { NextFunction, Request, Response } from 'express';
import { winstonLogger } from '../../winston/logger';

const logError = (err: Error, _req: Request, _res: Response, next: NextFunction) => { // miss 4 parameters and you are done
    winstonLogger.error(err); 
    next(err);
};

export { logError }