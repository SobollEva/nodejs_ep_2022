import * as core from 'express-serve-static-core';

import UserService from '../services/user.sevice';
import { User } from '../types/user.type';
import { ValidationScheme } from '../types/common.type';
import * as express from 'express';
import { validation } from '../utils/validation.utils';
import { dbErrorResponse } from '../utils/db.utils';

const userService = new UserService();
const router: core.Router = express.Router();

router.route('/:id')
    .get(async (req: express.Request, res: express.Response) => {
        
        try {
            const user: User = await userService.getUserById(req.params.id);
            
            Boolean(!user?.isDeleted)
                ? res.json(user)
                : res.status(404).json({message: `User with id ${req.params.id} is not found`});
        } catch (e){
            dbErrorResponse(res);
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
            dbErrorResponse(res);
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
            dbErrorResponse(res);
        }
    });

router.route('/')
    .post(validation(ValidationScheme.UserScheme), async (req: express.Request, res: express.Response) => {
        try{
            const newUser = await userService.createUser(req.body);

            res.json({ message: `User id ${newUser.id} is created` });
        } catch (e){
            dbErrorResponse(res);
        }
    })
    .get(async (req: express.Request, res: express.Response) => {
        try {
          const userList = await userService.getUserList(req.query);

            res.json(userList);
        } catch (e){
            dbErrorResponse(res);
        }
    });

export default router;


