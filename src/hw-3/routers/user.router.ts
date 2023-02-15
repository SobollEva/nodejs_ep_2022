import * as core from 'express-serve-static-core';

import UserService from '../services/user.sevice';
import { User } from '../types/user';
import * as express from 'express';
import { validation } from '../utils/validation.utils';

const userService = new UserService();
const router: core.Router = express.Router();
const ERROR_MESSAGE = 'Database is not available. Please, try again late.';

router.route('/user/:id')
    .get(async (req: express.Request, res: express.Response) => {
        try {
            const user: User = await userService.getUserById(req.params.id);
            
            Boolean(!user?.isDeleted)
                ? res.json(user)
                : res.status(404).json({message: `User with id ${req.params.id} is not found`});
        } catch (e){
            res.status(404).json({message: ERROR_MESSAGE});
        }

    })
    .delete(async (req: express.Request, res: express.Response) => {
        try{
            const user: User = await userService.getUserById(req.params.id);

            if (!user?.isDeleted) {
                await userService.deleteUserById(user.id);

                res.json({message: `User with id ${user.id} is marked as deleted`})
            } else {
                res.status(404).json({message: `User with id ${req.params.id} is not found`});
            }
        } catch (e){
            res.status(404).json({message: ERROR_MESSAGE});
        }
    })
    .patch(async (req: express.Request, res: express.Response) => {
        try{
            const user: User = await userService.getUserById(req.params.id);

            if (!user?.isDeleted) {
                await userService.updateUser(user, req.body);

                res.json({message: `User id ${user.id} is updated`});
            } else {
                res.status(404).json({message: `User with id ${req.params.id} is not found`});
            }
        } catch (e){
            res.status(404).json({message: ERROR_MESSAGE});
        }
    });

router.route('/user')
    .post(validation(), async (req: express.Request, res: express.Response) => {
        try{
            const newUser = await userService.createUser(req.body);

            res.json({ message: `User id ${newUser.id} is created` });
        } catch (e){
            res.status(404).json({message: ERROR_MESSAGE});
        }
    })
    .get(async (req: express.Request, res: express.Response) => {
        try {
          const userList = await userService.getUserList(req.query);

            res.json(userList);
        } catch (e){
            res.status(404).json({message: ERROR_MESSAGE});
        }

    });

export default router;


