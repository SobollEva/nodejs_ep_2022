import * as express from 'express';
import { logger } from '../utils/winston.utils';

export function logHttpData(req: express.Request, res: express.Response, next: express.NextFunction){
    console.log(`Service method ${req.method}  has been invoked`);
    console.log(`Passed arguments: ${JSON.stringify(req.params)}`);

    next();
}

export function errorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction){
    logger.log('error', 'errorHandler: ', new Error(error.message));

    res.status(500).send(error.message);
}
