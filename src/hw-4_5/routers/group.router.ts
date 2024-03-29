import * as core from 'express-serve-static-core';

import GroupService from '../services/group.sevice';
import { Group } from '../types/group.type';
import { ValidationScheme } from '../types/common.type';
import * as express from 'express';
import { validation } from '../utils/validation.utils';
import { OperationDbStatus } from '../types/common.type';
import { logControllerError } from '../services/errorHandler.service';

const groupService = new GroupService();
const router: core.Router = express.Router();


router.route('/:id')
    .get(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const group: Group = await groupService.getGroupById(req.params.id);

            group
                ? res.json(group)
                : res.status(404).json({message: `Group with id ${req.params.id} is not found`});
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    })
    .delete(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const deletedStatus: OperationDbStatus = await groupService.deleteUserById(req.params.id);
            
            deletedStatus
                ? res.status(204).json({message: `Group with id ${req.params.id} is deleted`})
                : res.status(404).json({message: `Group with id ${req.params.id} is not found`});
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    })
    .put(validation(ValidationScheme.GroupScheme), async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const updatedStatus: OperationDbStatus = await groupService.updateGroup(req.params.id, req.body);

            updatedStatus
                ? res.status(204).json({message: `Group with id ${req.params.id} is updated`})
                : res.status(404).json({message: `Group with id ${req.params.id} is not found`})
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    })

router.route('/')
    .post(validation(ValidationScheme.GroupScheme), async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const newGroup = await groupService.createGroup(req.body);
            
            res.json({ message: `Group with id ${newGroup.id} is created` });
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    })
    .get(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const groupList: Group[] = await groupService.getGroupList();

            res.json(groupList);
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    });

export default router;
