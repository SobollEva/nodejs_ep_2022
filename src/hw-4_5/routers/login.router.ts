import * as core from 'express-serve-static-core';
import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { logControllerError } from '../services/errorHandler.service';
import { jwtSecret } from './routers.consts';

const router: core.Router = express.Router();

router.route('/')
    .post(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const { login, password }  = req.body;
            const payload = { sub: login, title: password };
            const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h'})

            return res.send({token});
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    })

export default router;
