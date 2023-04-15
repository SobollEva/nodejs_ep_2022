import { DataTypes } from 'sequelize';

export default (sequelize: any) => {
    return sequelize.define('group', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        permission: {
            type: DataTypes.ARRAY(DataTypes.TEXT),
            allowNull: false
        }
    }, {
        timestamps: false,
        tableName: 'group'
    });
};
