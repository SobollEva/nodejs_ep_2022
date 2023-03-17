import * as express from 'express';
import { ERROR_MESSAGE_DB } from '../consts/db.consts';

export function dbErrorResponse(res: express.Response, errorMesage: string = ERROR_MESSAGE_DB) {
    res.status(404).json({message: errorMesage});
}
