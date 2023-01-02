import {getAutoSuggestUsers, getUserIndex} from './utils';
import {User} from './types';
import {validation} from './validation';
import * as core from 'express-serve-static-core';

const express = require('express');
const app = express();
const router: core.Router = express.Router();

const PORT = 3000;
const {v1: uuidv4} = require('uuid');
const userStore: User[] = [];

app.use(express.json());

router.route('/user/:id')
    .get((req: any, res: any, next: any) => {
        const user: User = userStore.find((item: User) => item.id === req.params.id);

        Boolean(!user?.isDeleted)
            ? res.json(user)
            : res.status(404).json({message: `User with id ${req.params.id} is not found`});
    })
    .delete((req: any, res: any) => {
        const userIndex: number = getUserIndex(userStore, req.params.id);

        if (!userStore[userIndex]?.isDeleted) {
            userStore[userIndex] = {...userStore[userIndex], isDeleted: true};
            res.json({message: `User with id ${req.params.id} is marked as deleted`})
        } else {
            res.status(404).json({message: `User with id ${req.params.id} is not found`});
        }
    })
    .patch((req: any, res: any) => {
        const userIndex: number | null = getUserIndex(userStore, req.params.id);

        if (!userStore[userIndex]?.isDeleted) {
            userStore[userIndex] = {
                id: req.params.id,
                isDeleted: false,
                login: req.body.login || userStore[userIndex].login,
                password: req.body.password || userStore[userIndex].password,
                age: req.body.age || userStore[userIndex].age
            };
            res.json({message: `User id ${req.params.id} is updated`});
        } else {
            res.status(404).json({message: `User with id ${req.params.id} is not found`});
        }
    });

router.route('/user')
    .post(validation(), (req: any, res: any) => {
        const user: User = {...req.body, id: uuidv4(req.body), isDeleted: false};

        userStore.push(user);

        res.json({message: `User id ${user.id} is created`});
    })
    .get((req: any, res: any) => {
        const limit = isNaN(req.query?.limit) ? 0 :Number(req.query?.limit);
        const loginSubstr = req.query?.search || '';
        const userListBySearch = getAutoSuggestUsers(loginSubstr, limit, userStore);

        res.json(userListBySearch);
    });

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Server is started on port ${PORT}`)
});

