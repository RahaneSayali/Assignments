import sequelize from "../db/config";
import{DataTypes, Model} from "sequelize"


class Weather extends Model {
    public id!: number;
    public city!: string;
    public country!: string;
    public weather!: string;
    public time!: Date;
    public longitude!: number;
    public latitude!: number;
    public createdAt!: Date;
  public updatedAt!: Date;
}

Weather.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      weather: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
      }  },
      {
        sequelize,
        tableName:'weather',
        timestamps:true,
    }
);
export default Weather;