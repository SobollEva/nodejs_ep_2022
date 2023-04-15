import UserGroupService from '../services/userGroup.sevice';
import * as express from 'express';
import { ValidationScheme } from '../types/common.type';
import { UserGroup } from '../types/userGroup.type';
import { validation } from '../utils/validation.utils';
import { logControllerError } from '../services/errorHandler.service';

const router = express.Router();
const userGroupService = new UserGroupService();

router.route('/')
    .post(validation(ValidationScheme.UserGroupScheme), async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const result: UserGroup[] = await userGroupService.addUsersToGroup(req.body.group_id, req.body.user_ids);
        
            result
                ? res.json(result)
                : res.status(404).json({message: `List of users ${req.body.user_ids} is not added to ${req.body.group_id}`});
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    })
    .get(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const userGroupList: UserGroup[] = await userGroupService.getUserGroupList();

            res.json(userGroupList);
        } catch (error){
            logControllerError(req.method, req.params, error.message);
            next(error);
        }
    });

    router.route('/:id')
        .delete(async function (req: express.Request, res: express.Response, next: express.NextFunction) {
            try {
                const deletedStatus = await userGroupService.deleteUserGroup(req.params.id);
                
                deletedStatus
                    ? res.status(204).json({message: `UserGroup with id ${req.params.id} is deleted`})
                    : res.status(404).json({message: `UserGroup with id ${req.params.id} is not found`});
            } catch (error){
                logControllerError(req.method, req.params, error.message);
                next(error);
            }
    })

export default router;
