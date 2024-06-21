import { DataTypes, Model } from 'sequelize';
import db from '.';
import ITeams from '../../Interfaces/ITeam';

class TeamModel extends Model<ITeams> implements ITeams {
  public id!: number;
  public teamName!: string;
}

TeamModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize: db,
    tableName: 'teams',
    timestamps: false,
    // modelName: 'TeamModel',
    underscored: true,
  },
);

export default TeamModel;