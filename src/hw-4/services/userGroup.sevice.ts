import UserGroupModel from '../models/userGroup.model';
import GroupModel from '../models/group.model';
import UserModel from '../models/user.model';
import dbConnection from './db.service';
import { UserGroup } from '../types/userGroup.type';

export default class UserGroupService {
    private userDbConnection = UserModel(dbConnection.userDb);
    private groupDbConnection = GroupModel(dbConnection.groupDb);
    private userGroupDbConnection = UserGroupModel(dbConnection.userGroupDb);
    
    async addUsersToGroup(groupId: string, userIdList: string[]): Promise<UserGroup[]> {
        return await dbConnection.userGroupDb.transaction( async (t) => {
            const promises = [];

            await this.groupDbConnection.findOne({where: { id: groupId }}, { transaction: t });
            
            userIdList.forEach(async (userId: string) => 
                await this.userDbConnection.findAll({
                    raw: true,
                    where: { id: userId},
            }, { transaction: t }))

            
            userIdList.forEach((userId: string) => {
                const newPromise = this.userGroupDbConnection.create ({
                        group_id: groupId,
                        user_id: userId},
                        { transaction: t }
                    );

                    promises.push(newPromise)
                })

            return Promise.all(promises);
        })
    }

    async getUserGroupList(): Promise<any[]> {
        return await this.userGroupDbConnection.findAll();
    }

    async deleteUserGroup(id: string) {
        return await this.userGroupDbConnection
            .destroy(
                { where: { group_id: id }}
            );
    }
}
