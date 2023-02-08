import UserGroupService from '../services/userGroup.sevice';
import * as express from 'express';
import { ValidationScheme } from '../types/common.type';
import { UserGroup } from '../types/userGroup.type';
import { dbErrorResponse } from '../utils/db.utils';
import { validation } from '../utils/validation.utils';
import { ERROR_MESSAGE_DB } from '../consts/db.consts';

const router = express.Router();
const userGroupService = new UserGroupService();

router.route('/')
    .post(validation(ValidationScheme.UserGroupScheme), async function (req: any, res: any) {
        try {
            const result: UserGroup[] = await userGroupService.addUsersToGroup(req.body.group_id, req.body.user_ids);
        
            result
                ? res.json(result)
                : res.status(404).json({message: `List of users ${req.body.user_ids} is not added to ${req.body.group_id}`});
        } catch (e){
            const isDataIncorrect = e.name === 'SequelizeForeignKeyConstraintError';

            dbErrorResponse(res, isDataIncorrect ? e.original.detail : ERROR_MESSAGE_DB);
        }
    })
    .get(async function (req: express.Request, res: express.Response) {
        try {
            const userGroupList: UserGroup[] = await userGroupService.getUserGroupList();

            res.json(userGroupList);
        } catch (e){
            dbErrorResponse(res);
        }
    });

    router.route('/:id')
        .delete(async function (req: express.Request, res: express.Response) {
            
            try {
                const deletedStatus = await userGroupService.deleteUserGroup(req.params.id);
                
                deletedStatus
                    ? res.status(204).json({message: `UserGroup with id ${req.params.id} is deleted`})
                    : res.status(404).json({message: `UserGroup with id ${req.params.id} is not found`});
            } catch (e){
                dbErrorResponse(res);
            }
    })

export default router;
