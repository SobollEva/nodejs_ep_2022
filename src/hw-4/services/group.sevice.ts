import GroupModel from '../models/group.model';
import UserGroupModel from '../models/userGroup.model';
import dbConnection from './db.service';
import { Group } from '../types/group.type';
import { OperationDbStatus } from '../types/common.type';

export default class GroupService {
    private groupDbConnection = GroupModel(dbConnection.groupDb);
    private userGroupDbConnection = UserGroupModel(dbConnection.userGroupDb);

    async getGroupList(): Promise<Group[]> {
        return await this.groupDbConnection.findAll();
    }

    async getGroupById(id: string): Promise<Group> {
        return await this.groupDbConnection.findOne({where: { id }});
    }

    async deleteUserById(id: string): Promise<OperationDbStatus> {

        return await dbConnection.userGroupDb.transaction(async (t) => {
            const groupStatus = await this.groupDbConnection.destroy({ where: { id }});
        
            await this.userGroupDbConnection
                        .destroy(
                            { where: { group_id: id }, transaction: t}
                        );
        
            return groupStatus;
        });
    }

    async createGroup(body: any): Promise<Group> {
        const newGroup = {
            name: body.name,
            permission: body.permission
        };

        return await this.groupDbConnection.create({ ...newGroup });
    }

    async updateGroup(id: string, body: any): Promise<OperationDbStatus> {
        const updatedGroup = {
            id,
            name: body.name,
            permission: body.permission
        };

        return await this.groupDbConnection.update({...updatedGroup}, {
            where: { id }
        })
    }
}
