import { NewUser, User } from '../types/user';
import { Op } from 'sequelize';
import UserModel from '../models/user.model';
import dbConnection from './db.service';

export default class UserService {
    private userBbConnection = UserModel(dbConnection);

    public async getUserList(query: any): Promise<User[]> {
        const limitUserList = isNaN(query?.limit) ? null : Number(query?.limit);
        const search = query?.search || '';

        return await this.userBbConnection.findAll({
            raw: true,
            where: { login: {[Op.iLike]: `%${search}%` }},
            order: [['login', 'ASC']],
            limit: limitUserList
        });
    }

    public async getUserById(id: string): Promise<User> {
        return await this.userBbConnection.findOne({where: {id}});
    }

    public async deleteUserById(id: string) {
        return await this.userBbConnection
            .update(
                { isDeleted: true },
                {
                    where: {id}
                })
    }

    public async createUser(newUser: NewUser): Promise<User> {
        const user: User = {...newUser, isDeleted: false};

        return await this.userBbConnection
            .create({
                ...user
            });
    }

    public async updateUser(user: User, body: any): Promise<User> {
        const updatedUser: User = {
            id: user.id,
            isDeleted: false,
            login: body.login || user.login,
            password: body.password || user.password,
            age: body.age || user.age
        };

        return await this.userBbConnection
            .update({...updatedUser}, {
                where: {
                    id: user.id
                }
            })
    }
}
