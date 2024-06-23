import { DataTypes, Model } from 'sequelize';
import db from '.';
import IUsers from '../../Interfaces/IUsers';

// interface UserAttributes {
//   id: number;
//   username: string;
//   role: 'admin' | 'user';
//   email: string;
//   password: string;
// }

class UserModel extends Model<IUsers> implements IUsers {
  declare id: number;
  declare username: string;
  declare role: string;
  declare email: string;
  declare password: string;
}

UserModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'users',
    timestamps: false,
  },
);

export default UserModel;
