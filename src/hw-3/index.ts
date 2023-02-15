import router from './routers/user.router';
import * as express from 'express';

const app: express.Express  = express();
const PORT = 3000;

app.use(express.json());
app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
});
