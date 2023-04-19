import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import userGroupRouter from './routers/userGroup.router';
import loginRouter from './routers/login.router';
import * as express from 'express';
import * as cors from 'cors';
import { errorHandler, logHttpData, verifyToken } from './routers/middleware';
import { logger } from './utils/winston.utils';

const app: express.Express  = express();
const PORT = 3000;

app.use(express.json());
app.use(logHttpData);

app.options('*', cors());

app.use('/login', loginRouter);

app.use(verifyToken);

app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/user-group', userGroupRouter);

app.use(errorHandler);

process
    .on('unhandledRejection', (reason) => {
        logger.log('error', 'unhandledRejection: ', new Error(reason.toString()));
    })
    .on('uncaughtException', (error: Error) => {
        logger.log('error', 'UncaughtException: ', new Error(error.message));
        process.exit(1)
})

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)
});
