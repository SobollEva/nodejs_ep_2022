import { DataTypes, Sequelize } from 'sequelize';
import dbConnection from '../services/db.service';

import GroupModel from './group.model';
import UserModel from './user.model';

const UserGroupModel = (sequelize: Sequelize) => {
    return sequelize.define('user_group', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        group_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: GroupModel(dbConnection.groupDb),
                key: 'group_id_fkey'
              }
        },
        user_id: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: UserModel(dbConnection.userDb),
                key : 'user_id_fkey'
              }
        },
    }, {
        timestamps: false,
        tableName: 'user_group'
    });
};

UserModel(dbConnection.userDb).belongsToMany(GroupModel(dbConnection.groupDb), { through: UserGroupModel(dbConnection.userGroupDb) });
GroupModel(dbConnection.groupDb).belongsToMany(UserModel(dbConnection.userDb), { through: UserGroupModel(dbConnection.userGroupDb) });

export default UserGroupModel;
