import userRouter from './routers/user.router';
import groupRouter from './routers/group.router';
import userGroupRouter from './routers/userGroup.router';
import * as express from 'express';

const app: express.Express  = express();
const PORT = 3000;

app.use(express.json());
app.use('/user', userRouter);
app.use('/group', groupRouter);
app.use('/user-group', userGroupRouter);

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
});
