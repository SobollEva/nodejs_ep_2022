import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { logger } from '../utils/winston.utils';
import { jwtErrorMessages, jwtSecret } from './routers.consts';

export function logHttpData(req: express.Request, res: express.Response, next: express.NextFunction) {
    console.log(`Service method ${req.method}  has been invoked`);
    console.log(`Passed arguments: ${JSON.stringify(req.params)}`);

    next();
}

export function errorHandler(error: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    logger.log('error', 'errorHandler: ', new Error(error.message));

    res.status(500).send(error.message);
}


export function verifyToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    const token: string = req.headers['x-access-token'] as string;

    if (!token) {
        res.status(401).send({ success: false, message: jwtErrorMessages.noToken});
    }

    if (token) {
        jwt.verify(token, jwtSecret, (error, decoded) => {
            if (error) {
                res.status(403).send({success: false, message: jwtErrorMessages.failedToken});
            }

            next();
        })
    }
}
