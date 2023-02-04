export function UserModel(sequelize: any, DataTypes: any) {
    return sequelize.define('user', {
        id: {
            type: DataTypes.TEXT,
            primaryKey: true,
            allowNull: false
        },
        login: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        isDeleted: {
            type: DataTypes.BOOLEAN
        }
    }, {
        timestamps: false,
        tableName: 'users'
    });
};
