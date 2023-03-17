import { Op } from 'sequelize';
import UserModel from '../models/user.model';
import UserGroupModel from '../models/userGroup.model';
import dbConnection from './db.service';
import { User, NewUser } from '../types/user.type';

export default class UserService {
    private userDbConnection = UserModel(dbConnection.userDb);
    private userGroupDbConnection = UserGroupModel(dbConnection.userGroupDb);

    async getUserList(query: any): Promise<User[]> {
        const limitUserList = isNaN(query?.limit) ? null : Number(query?.limit);
        const search = query?.search || '';

        return await this.userDbConnection.findAll({
            raw: true,
            where: { login: {[Op.iLike]: `%${search}%` }},
            order: [['login', 'ASC']],
            limit: limitUserList
        });
    }

    async getUserById(id: string): Promise<User> {
        return await this.userDbConnection.findOne({where: {id}});
    }

    async deleteUserById(id: string) {
        return await dbConnection.userGroupDb.transaction(async (t) => {
            const userStatus = await this.userDbConnection
                .update(
                    { isDeleted: true },
                    { where: { id }}, 
                    { transaction: t }
                );
            
            await this.userGroupDbConnection
                .destroy(
                    { where: { user_id: id }, transaction: t}
                );
                
            return userStatus;
    });
    }

    async createUser(newUser: NewUser): Promise<User> {
        const user: User = {...newUser, isDeleted: false};

        return await this.userDbConnection
            .create({
                ...user
            });
    }

    async updateUser(user: User, body: any): Promise<User> {
        const updatedUser: User = {
            id: user.id,
            isDeleted: false,
            login: body.login || user.login,
            password: body.password || user.password,
            age: body.age || user.age
        };

        return await this.userDbConnection
            .update({...updatedUser}, {
                where: {
                    id: user.id
                }
            })
    }
}
